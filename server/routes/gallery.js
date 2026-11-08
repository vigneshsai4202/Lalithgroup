import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = { active: true };
  if (category) filter.category = category;
  const items = await Gallery.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', protect, upload.single('file'), async (req, res) => {
  const url = req.file ? `/uploads/${req.file.filename}` : req.body.url;
  const item = await Gallery.create({ ...req.body, url });
  res.status(201).json(item);
});

router.delete('/:id', protect, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
