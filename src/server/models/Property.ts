
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
  sustainabilityFeatures: [String], // Added sustainability features
  images: [String],
  virtualTourUrl: String, // Added virtual tour URL
  isNew: Boolean,
  visaEligible: Boolean,
  isFeatured: Boolean, // Added featured listing flag
  metaTitle: String, // Added SEO meta title
  metaDescription: String, // Added SEO meta description
  metaKeywords: String, // Added SEO meta keywords
  status: { type: String, default: 'active' }, // Added property status
  createdAt: { type: Date, default: Date.now }
});

export const Property = mongoose.model('Property', propertySchema);
