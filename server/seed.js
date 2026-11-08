import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Testimonial from './models/Testimonial.js';
import Admin from './models/Admin.js';

dotenv.config();

const products = [
  {
    name: 'Lift Rice',
    slug: 'lift-rice',
    category: 'raw',
    description: 'Lalith Group\'s flagship Lift Rice — premium BPT Sona Masoori raw rice. Sortex-cleaned, 100% stone-free, and ISO & FSSAI certified. Lightweight, aromatic, and low in starch. Ideal for everyday cooking, biryani, and pulao.',
    grainLength: '5.0–5.5 mm',
    moisture: '≤ 14%',
    brokenPercent: '≤ 2%',
    origin: 'Andhra Pradesh',
    shelfLife: '18 months',
    packagingSizes: ['26kg'],
    images: ['/lift.png'],
    featured: true,
    isBulk: true,
    isRetail: true,
  },
  {
    name: 'Leaf Rice',
    slug: 'leaf-rice',
    category: 'boiled',
    description: 'Lalith Group\'s Leaf Rice — steam-processed BPT rice with higher nutritional retention. Firm, non-sticky texture preferred by hotels, canteens, and health-conscious households. Sortex-cleaned, stone-free.',
    grainLength: '5.0–5.5 mm',
    moisture: '≤ 13%',
    brokenPercent: '≤ 3%',
    origin: 'Andhra Pradesh',
    shelfLife: '24 months',
    packagingSizes: ['26kg'],
    images: ['/leaf.png'],
    featured: true,
    isBulk: true,
    isRetail: true,
  },
  {
    name: 'Life Rice',
    slug: 'life-rice',
    category: 'raw',
    description: 'Lalith Group\'s Life Rice — nutrition-focused BPT rice specially crafted for health-conscious consumers, children, and institutional nutrition programs. Fortified, Sortex-cleaned, and stone-free.',
    grainLength: '5.0–5.5 mm',
    moisture: '≤ 14%',
    brokenPercent: '≤ 2%',
    origin: 'Andhra Pradesh',
    shelfLife: '18 months',
    packagingSizes: ['26kg'],
    images: ['/life.png'],
    featured: true,
    isBulk: true,
    isRetail: true,
  },
  {
    name: 'HMT Rice',
    slug: 'hmt-rice',
    category: 'hmt',
    description: 'Lalith Group\'s HMT Rice — long-grain, non-sticky rice with a distinct aroma. Popular across Andhra Pradesh and Karnataka. Sortex-cleaned, stone-free, and ideal for biryani and fried rice.',
    grainLength: '6.0–6.5 mm',
    moisture: '≤ 14%',
    brokenPercent: '≤ 3%',
    origin: 'Andhra Pradesh',
    shelfLife: '18 months',
    packagingSizes: ['26kg'],
    images: ['/hmt.png'],
    featured: true,
    isBulk: true,
    isRetail: true,
  },
];

const testimonials = [
  {
    name: 'Ravi Kumar',
    company: 'Sri Lakshmi Traders',
    location: 'Tirupati, Andhra Pradesh',
    message: 'Lift Rice has been our trusted supplier for 3 years. The BPT Sona Masoori is consistently clean, stone-free, and our customers love it. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Anitha Reddy',
    company: 'Anitha Supermarket',
    location: 'Vijayawada, AP',
    message: 'The Sortex-cleaned quality of Lift Rice is unmatched in this price range. Our customers keep asking for it by name. Great packaging and timely delivery.',
    rating: 5,
  },
  {
    name: 'Mohammed Farooq',
    company: 'Al-Noor Wholesale',
    location: 'Chennai, Tamil Nadu',
    message: 'We source Leaf Rice for our hotel chain. Uniform grain, no breakage, and the ISO & FSSAI certification gives us confidence in every batch.',
    rating: 5,
  },
  {
    name: 'Suresh Babu',
    company: 'Hotel Grand Tirupati',
    location: 'Tirupati, Andhra Pradesh',
    message: 'We switched to Leaf Rice for our kitchen and the difference is clear — firm texture, no stickiness, and zero stones. Our kitchen staff loves it.',
    rating: 5,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Testimonial.deleteMany();
  await Product.insertMany(products);
  await Testimonial.insertMany(testimonials);

  const adminExists = await Admin.countDocuments();
  if (!adminExists) {
    await Admin.create({ email: 'admin@liftgroup.in', password: 'Admin@123' });
    console.log('Admin created: admin@liftgroup.in / Admin@123');
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
