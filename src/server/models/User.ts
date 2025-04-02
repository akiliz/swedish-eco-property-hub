
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  savedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  createdAt: { type: Date, default: Date.now },
  // New fields for enhanced security
  refreshTokens: [{ type: String }],
  mfaEnabled: { type: Boolean, default: false },
  mfaSecret: { type: String },
  lastLogin: { type: Date },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date }
});

export const User = mongoose.model('User', userSchema);
