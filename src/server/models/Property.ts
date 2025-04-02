
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  address: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  energyClass: String,
  certifications: [String],
  images: [String],
  isNew: Boolean,
  visaEligible: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export const Property = mongoose.model('Property', propertySchema);
