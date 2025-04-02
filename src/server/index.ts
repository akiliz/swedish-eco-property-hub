
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import compression from 'compression';
import { Property } from './models/Property';
import { User } from './models/User';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Security middleware
// Rate limiting: 15 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 15, // 15 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

// Apply rate limiting to all requests
app.use(limiter);

// Set security headers with helmet (including CSP)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      connectSrc: ["'self'", "https://*"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Standard middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Cache control
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes cache
  }
  next();
});

// Routes
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swedish-eco-property')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Properties routes
// Cache middleware
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const cacheMiddleware = (duration: number) => (req: any, res: any, next: any) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse && Date.now() - cachedResponse.timestamp < duration) {
    return res.json(cachedResponse.data);
  }
  next();
};

app.get('/api/properties', cacheMiddleware(CACHE_DURATION), async (req, res) => {
  try {
    const properties = await Property.find();
    cache.set(req.originalUrl, {
      data: properties,
      timestamp: Date.now()
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching properties' });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: 'Error creating property' });
  }
});

// Users routes
app.post('/api/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
