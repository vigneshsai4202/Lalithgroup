import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  product: String,
  quantity: String,
  deliveryLocation: String,
  message: String,
  type: { type: String, enum: ['general', 'bulk', 'quote'], default: 'general' },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
