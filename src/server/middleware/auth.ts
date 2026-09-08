
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    // Check if token is about to expire (within 5 minutes)
    const payload: any = decoded;
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp - now < 300) {
      // Generate a new token if less than 5 minutes left
      const user = await User.findById(payload.userId);
      if (user) {
        const newToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('X-New-Token', newToken);
      }
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const refreshAuth = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  
  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required' });
    return;
  }
  
  try {
    const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }
    
    // Create new tokens
    const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const newRefreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    
    // Remove the old refresh token and add the new one
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    user.refreshTokens.push(newRefreshToken);
    await user.save();
    
    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const revokeRefreshTokens = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    user.refreshTokens = [];
    await user.save();
    
    res.json({ message: 'All sessions revoked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to revoke sessions' });
  }
};
