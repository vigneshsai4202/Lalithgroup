import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: String,
  coverImage: String,
  tags: [String],
  published: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
