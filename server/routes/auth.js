import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// One-time setup route — disable after first use in production
router.post('/setup', async (req, res) => {
  const exists = await Admin.countDocuments();
  if (exists) return res.status(403).json({ message: 'Admin already exists' });
  await Admin.create(req.body);
  res.status(201).json({ message: 'Admin created' });
});

router.get('/me', protect, async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password');
  res.json(admin);
});

export default router;
