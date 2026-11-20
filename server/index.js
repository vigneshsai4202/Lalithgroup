import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import inquiryRoutes from './routes/inquiries.js';
import authRoutes from './routes/auth.js';
import testimonialRoutes from './routes/testimonials.js';
import galleryRoutes from './routes/gallery.js';
import blogRoutes from './routes/blog.js';
import Product from './models/Product.js';
import Testimonial from './models/Testimonial.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blog', blogRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.get('/api/seed', async (_, res) => {
  try {
    await Product.deleteMany();
    await Testimonial.deleteMany();
    await Product.insertMany([
      { name: 'Lift Rice', slug: 'lift-rice', category: 'raw', description: 'Premium BPT Sona Masoori raw rice. Sortex-cleaned, 100% stone-free, ISO & FSSAI certified.', grainLength: '5.0–5.5 mm', moisture: '≤ 14%', brokenPercent: '≤ 2%', origin: 'Andhra Pradesh', shelfLife: '18 months', packagingSizes: ['26kg'], images: ['/lift.png'], featured: true, isBulk: true, isRetail: true },
      { name: 'Leaf Rice', slug: 'leaf-rice', category: 'boiled', description: 'Steam-processed BPT rice with higher nutritional retention. Firm, non-sticky texture.', grainLength: '5.0–5.5 mm', moisture: '≤ 13%', brokenPercent: '≤ 3%', origin: 'Andhra Pradesh', shelfLife: '24 months', packagingSizes: ['26kg'], images: ['/leaf.png'], featured: true, isBulk: true, isRetail: true },
      { name: 'Life Rice', slug: 'life-rice', category: 'raw', description: 'Nutrition-focused BPT rice for health-conscious consumers and institutional programs.', grainLength: '5.0–5.5 mm', moisture: '≤ 14%', brokenPercent: '≤ 2%', origin: 'Andhra Pradesh', shelfLife: '18 months', packagingSizes: ['26kg'], images: ['/life.png'], featured: true, isBulk: true, isRetail: true },
      { name: 'HMT Rice', slug: 'hmt-rice', category: 'hmt', description: 'Long-grain, non-sticky rice with distinct aroma. Ideal for biryani and fried rice.', grainLength: '6.0–6.5 mm', moisture: '≤ 14%', brokenPercent: '≤ 3%', origin: 'Andhra Pradesh', shelfLife: '18 months', packagingSizes: ['26kg'], images: ['/hmt.png'], featured: true, isBulk: true, isRetail: true },
    ]);
    const adminExists = await Admin.countDocuments();
    if (!adminExists) await Admin.create({ email: 'admin@liftgroup.in', password: 'Admin@123' });
    res.json({ success: true, message: 'Seed complete' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => { console.error(err); process.exit(1); });
