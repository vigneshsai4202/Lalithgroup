import express from 'express';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public
router.get('/', async (req, res) => {
  const { category, bulk, retail, featured, search } = req.query;
  const filter = { active: true };
  if (category) filter.category = category;
  if (bulk === 'true') filter.isBulk = true;
  if (retail === 'true') filter.isRetail = true;
  if (featured === 'true') filter.featured = true;
  if (search) filter.name = { $regex: search, $options: 'i' };
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, active: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Admin
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  const images = req.files?.map(f => `/uploads/${f.filename}`) || [];
  const product = await Product.create({ ...req.body, images });
  res.status(201).json(product);
});

router.put('/:id', protect, upload.array('images', 5), async (req, res) => {
  const updates = { ...req.body };
  if (req.files?.length) updates.images = req.files.map(f => `/uploads/${f.filename}`);
  const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(product);
});

router.delete('/:id', protect, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { active: false });
  res.json({ message: 'Deleted' });
});

export default router;
