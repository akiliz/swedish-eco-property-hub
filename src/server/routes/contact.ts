
import express from 'express';
import { auth, AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const router = express.Router();

// Define a validation schema for property inquiries
const propertyInquirySchema = z.object({
  propertyId: z.string(),
  message: z.string().min(1),
  preferredDate: z.string().optional()
});

router.post('/property-inquiry', auth, validate(propertyInquirySchema), async (req: AuthRequest, res) => {
  try {
    const { propertyId, message, preferredDate } = req.body;
    // Here you would typically save to database and/or send email
    
    // Send successful response
    return res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    // If we get here, it's a server error
    return res.status(500).json({ error: 'Failed to send inquiry' });
  }
});

export default router;
