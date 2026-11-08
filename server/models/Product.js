import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['raw', 'boiled', 'basmati', 'sona-masoori', 'hmt', 'broken', 'bran', 'husk'], required: true },
  description: String,
  grainLength: String,
  moisture: String,
  brokenPercent: String,
  origin: String,
  shelfLife: String,
  packagingSizes: [String],
  images: [String],
  isBulk: { type: Boolean, default: true },
  isRetail: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
