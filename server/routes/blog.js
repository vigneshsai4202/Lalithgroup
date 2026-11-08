import express from 'express';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Blog.find({ published: true }).sort({ createdAt: -1 }).select('-content');
  res.json(posts);
});

router.get('/:slug', async (req, res) => {
  const post = await Blog.findOne({ slug: req.params.slug, published: true });
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

router.post('/', protect, async (req, res) => {
  const post = await Blog.create(req.body);
  res.status(201).json(post);
});

router.put('/:id', protect, async (req, res) => {
  const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

router.delete('/:id', protect, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
