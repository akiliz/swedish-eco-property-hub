
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import { User } from '../models/User';
import { auth, refreshAuth, revokeRefreshTokens, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema, refreshTokenSchema, enableMfaSchema, verifyMfaSchema } from '../validations/auth';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password, totpCode } = req.body;
    const user = await User.findOne({ email });
    
    // User not found
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Check if account is locked
    if (user.lockUntil && user.lockUntil > new Date()) {
      res.status(403).json({ 
        error: 'Account locked', 
        lockRemaining: Math.ceil((user.lockUntil.getTime() - Date.now()) / 1000) 
      });
      return;
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Increment failed login attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      
      // Lock the account if too many failed attempts
      if (user.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
      }
      
      await user.save();
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Check MFA if enabled
    if (user.mfaEnabled) {
      if (!totpCode) {
        res.status(400).json({ error: 'MFA code required', requiresMfa: true });
        return;
      }
      
      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: totpCode,
        window: 1
      });
      
      if (!verified) {
        res.status(401).json({ error: 'Invalid MFA code' });
        return;
      }
    }
    
    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    
    // Generate tokens
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    
    // Save refresh token
    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push(refreshToken);
    
    // Limit to 5 refresh tokens per user (5 active sessions)
    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens.slice(-5);
    }
    
    await user.save();
    
    res.json({ 
      accessToken, 
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        mfaEnabled: user.mfaEnabled
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Use the refreshAuth middleware function directly
router.post('/refresh-token', validate(refreshTokenSchema), (req, res) => {
  refreshAuth(req, res);
});

router.post('/logout', auth, async (req: AuthRequest, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken || !req.user?.userId) {
      res.status(400).json({ error: 'Refresh token required' });
      return;
    }
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    // Remove the specific refresh token
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

router.post('/logout-all', auth, (req: AuthRequest, res) => {
  revokeRefreshTokens(req, res);
});

router.post('/enable-mfa', auth, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    // Generate new MFA secret
    const secret = speakeasy.generateSecret({ length: 20 });
    
    // Save the secret in the database temporarily (user must verify it first)
    user.mfaSecret = secret.base32;
    await user.save();
    
    // Return the secret and otpauth URL for QR code generation
    res.json({
      secret: secret.base32,
      otpauth_url: secret.otpauth_url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enable MFA' });
  }
});

router.post('/verify-mfa', auth, validate(verifyMfaSchema), async (req: AuthRequest, res) => {
  try {
    const { totpCode } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user || !user.mfaSecret) {
      res.status(400).json({ error: 'MFA not initialized' });
      return;
    }
    
    // Verify the code
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: totpCode,
      window: 1
    });
    
    if (!verified) {
      res.status(401).json({ error: 'Invalid verification code' });
      return;
    }
    
    // Activate MFA
    user.mfaEnabled = true;
    await user.save();
    
    res.json({ message: 'MFA enabled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify MFA' });
  }
});

router.post('/disable-mfa', auth, validate(verifyMfaSchema), async (req: AuthRequest, res) => {
  try {
    const { totpCode } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      res.status(400).json({ error: 'MFA not enabled' });
      return;
    }
    
    // Verify the code one last time
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: totpCode,
      window: 1
    });
    
    if (!verified) {
      res.status(401).json({ error: 'Invalid verification code' });
      return;
    }
    
    // Disable MFA
    user.mfaEnabled = false;
    user.mfaSecret = undefined;
    await user.save();
    
    res.json({ message: 'MFA disabled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disable MFA' });
  }
});

export default router;
