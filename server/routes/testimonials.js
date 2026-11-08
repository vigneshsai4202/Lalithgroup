import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
  res.json(testimonials);
});

router.post('/', protect, async (req, res) => {
  const t = await Testimonial.create(req.body);
  res.status(201).json(t);
});

router.put('/:id', protect, async (req, res) => {
  const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});

router.delete('/:id', protect, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
