
import express from 'express';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.post('/property-inquiry', auth, async (req: AuthRequest, res) => {
  try {
    const { propertyId, message, preferredDate } = req.body;
    // Here you would typically save to database and/or send email
    return res.json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Failed to send inquiry' });
  }
});

export default router;
