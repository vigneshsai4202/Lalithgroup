import express from 'express';
import { body, validationResult } from 'express-validator';
import Inquiry from '../models/Inquiry.js';
import { protect } from '../middleware/auth.js';
import { sendInquiryEmails } from '../middleware/mailer.js';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const validate = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
];

router.post('/', validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const inquiry = await Inquiry.create(req.body);
  try { await sendInquiryEmails(inquiry); } catch (e) { console.error('Mail error:', e.message); }
  res.status(201).json({ message: 'Inquiry submitted successfully' });
});

// Admin routes
router.get('/', protect, async (req, res) => {
  const { status, type, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (type) filter.type = type;
  const [inquiries, total] = await Promise.all([
    Inquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
    Inquiry.countDocuments(filter),
  ]);
  res.json({ inquiries, total, pages: Math.ceil(total / limit) });
});

router.patch('/:id/status', protect, async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(inquiry);
});

router.get('/export/csv', protect, async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
  const filePath = path.join('uploads', 'inquiries.csv');
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: ['name','email','phone','company','product','quantity','deliveryLocation','message','type','status','createdAt']
      .map(id => ({ id, title: id.toUpperCase() })),
  });
  await csvWriter.writeRecords(inquiries);
  res.download(filePath, 'inquiries.csv', () => fs.unlinkSync(filePath));
});

export default router;
