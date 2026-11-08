import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: String,
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  category: { type: String, enum: ['mill', 'products', 'team', 'process'], default: 'mill' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
