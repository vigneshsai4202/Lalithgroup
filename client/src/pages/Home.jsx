import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: 'AP · TS · TN', label: 'States Distributed' },
  { value: '500+', label: 'Retail Partners' },
  { value: 'ISO & FSSAI', label: 'Certified & Compliant' },
];

const whyUs = [
  { title: 'Sortex Cleaned', desc: 'Every grain passes through optical color sorters — zero discolored or damaged grains in your bag.' },
  { title: '100% Stone-Free', desc: 'Multi-stage destoning ensures completely stone-free rice, safe for every household and hotel kitchen.' },
  { title: 'ISO & FSSAI Certified', desc: 'Fully certified facility with regular audits, food-safe packaging, and documented quality records.' },
  { title: 'Hygienic Processing', desc: 'Minimal human contact, enclosed processing lines, and clean-room packaging standards.' },
  { title: 'Wide Distribution', desc: 'Available across Andhra Pradesh, Telangana, and Tamil Nadu through our established dealer network.' },
  { title: 'Nutrition-Focused Lines', desc: 'Specialized rice varieties designed for health-conscious consumers and institutional nutrition programs.' },
];

const processSteps = [
  { step: '01', title: 'Paddy Procurement', desc: 'Sourced directly from farmers across Andhra Pradesh & Telangana.' },
  { step: '02', title: 'Cleaning & Drying', desc: 'Multi-stage cleaning and destoning; dryers achieve optimal moisture.' },
  { step: '03', title: 'Dehusking', desc: 'Rubber-roll shellers gently remove husk, preserving grain integrity.' },
  { step: '04', title: 'Sortex Color Sorting', desc: 'Optical color sorters remove every discolored or damaged grain.' },
  { step: '05', title: 'Grading & Packaging', desc: 'Graded by size and packed in food-safe bags from 1 kg to 50 kg.' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    api.get('/products?featured=true').then(r => setProducts(r.data)).catch(() => {});
    api.get('/testimonials').then(r => setTestimonials(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const t = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=1600&q=80"
          alt="Golden rice paddy fields at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <motion.div initial="hidden" animate="show" variants={stagger}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.p variants={fadeUp} className="text-gold font-semibold tracking-widest text-sm uppercase mb-4">
            Lalith Innovation Food Technology
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
            Pure Grain.<br />Smart Technology.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            From paddy fields to your plate — Lalith Group delivers premium quality rice with modern milling technology and uncompromising food safety standards.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-gold text-white font-semibold px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors text-base">
              Request a Quote
            </Link>
            <Link to="/products" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-green-deep transition-colors text-base">
              View Products
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-green-deep py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-serif text-3xl font-bold text-gold">{s.value}</p>
              <p className="text-white/70 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Our Story</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep mb-5">Rooted in Agriculture,<br />Driven by Innovation</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded at Guntakindapalli, Srikalahasti, Chittoor District, Lalith Group (Lalith Innovation Food Technology Pvt. Ltd.) produces Lift Rice and Leaf Rice — Sortex-cleaned, stone-free rice distributed across Andhra Pradesh, Telangana, and Tamil Nadu.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 italic border-l-4 border-gold pl-4">
              Lalith Group is proudly born from the house of MKK Rice — a name that has stood for quality, trust, and purity in rice milling for generations. Building on MKK's legacy of farm-fresh grain and honest trade, Lalith Group carries forward that same commitment with modern Sortex technology, ISO & FSSAI certified processes, and a passion for delivering the finest Lift Rice and Leaf Rice to households and businesses across Andhra Pradesh, Telangana, and Tamil Nadu.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe great rice starts with great farming and ends with great technology. Our Sortex-cleaned, stone-free rice is ISO and FSSAI certified — consistent, hygienic, and nutritious in every bag.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-green-deep font-semibold hover:text-gold transition-colors">
              Learn More About Us <FiArrowRight />
            </Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative">
            <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80"
              alt="Modern rice mill interior with processing machinery"
              className="rounded-2xl w-full h-80 object-cover shadow-xl" />
            <div className="absolute -bottom-5 -left-5 bg-gold text-white p-5 rounded-2xl shadow-lg">
              <p className="font-serif text-3xl font-bold">14+</p>
              <p className="text-sm text-white/80">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Our Range</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep">Featured Products</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Lift Rice, Leaf Rice, Life Rice, and HMT Rice — Sortex-cleaned and stone-free for every need.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(products.length ? products : Array(4).fill(null)).map((p, i) => (
              p ? <motion.div key={p._id} variants={fadeUp}><ProductCard product={p} /></motion.div>
                : <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold px-8 py-3 rounded-full hover:bg-green-mid transition-colors">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose LIFT */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Why Lalith Group</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep">The Lalith Group Difference</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(item => (
              <motion.div key={item.title} variants={fadeUp} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <FiCheckCircle className="text-gold mb-3" size={24} />
                <h3 className="font-serif font-semibold text-lg text-green-deep mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20 bg-green-deep text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Farm to Pack</p>
            <h2 className="font-serif text-4xl font-bold">Our Milling Process</h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-white/20 mx-16" />
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 relative">
              {processSteps.map(s => (
                <motion.div key={s.step} variants={fadeUp} className="text-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg font-serif">
                    {s.step}
                  </div>
                  <h4 className="font-semibold mb-2">{s.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="text-center mt-10">
            <Link to="/process" className="inline-flex items-center gap-2 border-2 border-gold text-gold font-semibold px-8 py-3 rounded-full hover:bg-gold hover:text-white transition-colors">
              See Full Process <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="py-20 bg-gold-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-green-deep mb-4">Ready to Source Premium Rice?</h2>
            <p className="text-gray-600 mb-8">Whether you need bulk supply or retail packs, Lalith Group has the right variety and the right price for you. Serving AP, Telangana & Tamil Nadu.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-green-deep text-white font-semibold px-8 py-4 rounded-full hover:bg-green-mid transition-colors">
              Get a Free Quote
            </Link>
            <Link to="/bulk-orders" className="border-2 border-green-deep text-green-deep font-semibold px-8 py-4 rounded-full hover:bg-green-deep hover:text-white transition-colors">
              Bulk Order Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
