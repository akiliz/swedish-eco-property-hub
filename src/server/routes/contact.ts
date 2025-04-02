
import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/property-inquiry', auth, async (req, res) => {
  try {
    const { propertyId, message, preferredDate } = req.body;
    // Here you would typically save to database and/or send email
    res.json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to send inquiry' });
  }
});

export default router;
