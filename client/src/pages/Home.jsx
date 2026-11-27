import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const stats = [
  { value: '14+', label: 'Years of Excellence' },
  { value: 'AP · TS · TN', label: 'States Distributed' },
  { value: '500+', label: 'Retail Partners' },
  { value: 'ISO & FSSAI', label: 'Certified & Compliant' },
];

const whyUs = [
  { icon: '🌾', title: 'Sortex Cleaned', desc: 'Every grain passes through optical color sorters — zero discolored or damaged grains in your bag.' },
  { icon: '🪨', title: '100% Stone-Free', desc: 'Multi-stage destoning ensures completely stone-free rice, safe for every household and hotel kitchen.' },
  { icon: '📋', title: 'ISO & FSSAI Certified', desc: 'Fully certified facility with regular audits, food-safe packaging, and documented quality records.' },
  { icon: '✨', title: 'Hygienic Processing', desc: 'Minimal human contact, enclosed processing lines, and clean-room packaging standards.' },
  { icon: '🚚', title: 'Wide Distribution', desc: 'Available across Andhra Pradesh, Telangana, and Tamil Nadu through our established dealer network.' },
  { icon: '💚', title: 'Nutrition-Focused', desc: 'Specialized rice varieties designed for health-conscious consumers and institutional nutrition programs.' },
];

const processSteps = [
  { step: '01', title: 'Paddy Procurement', desc: 'Sourced directly from farmers across Andhra Pradesh & Telangana.' },
  { step: '02', title: 'Cleaning & Drying', desc: 'Multi-stage cleaning and destoning; dryers achieve optimal moisture.' },
  { step: '03', title: 'Dehusking', desc: 'Rubber-roll shellers gently remove husk, preserving grain integrity.' },
  { step: '04', title: 'Sortex Sorting', desc: 'Optical color sorters remove every discolored or damaged grain.' },
  { step: '05', title: 'Grade & Pack', desc: 'Graded by size and packed in food-safe bags from 1 kg to 50 kg.' },
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

  const prevT = () => setTIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const nextT = () => setTIdx(i => (i + 1) % testimonials.length);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-deep grain">
        <img
          src="/image.png"
          alt="Lalith Group Logo"
          className="absolute inset-0 w-full h-full object-contain opacity-[0.07] scale-110"
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b1e] via-green-deep/80 to-[#1a3a28]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,146,42,0.08),transparent)]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <motion.span variants={fadeUp} className="section-label section-label-light">
            ✦ Lalith Innovation Food Technology
          </motion.span>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] mb-6 mt-2">
            Pure Grain.<br />
            <span className="text-gradient-gold">Smart Technology.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From paddy fields to your plate — Lalith Group delivers premium quality rice with modern milling technology and uncompromising food safety standards.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gold text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5 text-base"
            >
              Request a Quote
            </Link>
            <Link
              to="/products"
              className="glass text-white font-semibold px-8 py-4 rounded-full hover:bg-white/15 transition-all text-base"
            >
              View Products
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-gradient-to-r from-[#0d2b1e] via-green-deep to-[#1a3a28] py-12 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <p className="font-serif text-3xl font-bold text-gradient-gold mb-1">{s.value}</p>
              <p className="text-white/60 text-xs font-medium tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About Snapshot ── */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label">Our Story</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-deep mb-6 leading-tight">
              Rooted in Agriculture,<br />Driven by Innovation
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded at Guntakindapalli, Srikalahasti, Chittoor District, Lalith Group produces Lift Rice and Leaf Rice — Sortex-cleaned, stone-free rice distributed across Andhra Pradesh, Telangana, and Tamil Nadu.
            </p>
            <blockquote className="text-gray-600 leading-relaxed mb-6 italic border-l-4 border-gold pl-5 bg-gold-light/40 py-3 pr-4 rounded-r-xl">
              Proudly born from the house of MKK Rice — a name that has stood for quality, trust, and purity in rice milling for generations.
            </blockquote>
            <Link to="/about" className="inline-flex items-center gap-2 text-green-deep font-semibold hover:text-gold transition-colors group">
              Learn More About Us
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80"
                alt="Modern rice mill interior"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -bottom-6 -left-6 bg-gold text-white p-5 rounded-2xl shadow-xl shadow-gold/30"
            >
              <p className="font-serif text-3xl font-bold">14+</p>
              <p className="text-sm text-white/85 font-medium">Years of Excellence</p>
            </motion.div>
            {/* Cert badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, type: 'spring' }}
              className="absolute -top-4 -right-4 bg-white text-green-deep p-4 rounded-2xl shadow-xl border border-gray-100"
            >
              <p className="font-bold text-sm">ISO & FSSAI</p>
              <p className="text-xs text-gray-500">Certified</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="section-label">Our Range</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-deep">Featured Products</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Lift Rice, Leaf Rice, Life Rice, and HMT Rice — Sortex-cleaned and stone-free for every need.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {(products.length ? products : Array(4).fill(null)).map((p, i) =>
              p ? (
                <motion.div key={p._id} variants={fadeUp}>
                  <ProductCard product={p} />
                </motion.div>
              ) : (
                <div key={i} className="bg-gray-100 rounded-2xl h-72 shimmer" />
              )
            )}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold px-8 py-3.5 rounded-full hover:brightness-110 transition-all shadow-lg shadow-green-deep/20 hover:-translate-y-0.5 group"
            >
              View All Products
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose LIFT ── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="section-label">Why Lalith Group</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-deep">The Lalith Group Difference</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 card-lift border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-green-light rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-green-deep mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process Preview ── */}
      <section className="py-24 bg-green-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,146,42,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="section-label section-label-light">Farm to Pack</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Our Milling Process</h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 relative"
            >
              {processSteps.map((s, i) => (
                <motion.div key={s.step} variants={fadeUp} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold text-lg font-serif shadow-lg shadow-gold/30 group-hover:scale-110 transition-transform">
                    {s.step}
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">{s.title}</h4>
                  <p className="text-white/55 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/process"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold font-semibold px-8 py-3.5 rounded-full hover:bg-gold hover:text-white transition-all group"
            >
              See Full Process
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
              <span className="section-label">What Clients Say</span>
              <h2 className="font-serif text-4xl font-bold text-green-deep">Trusted by Businesses Across South India</h2>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tIdx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-cream rounded-3xl p-10 text-center border border-gold/20 shadow-sm"
                >
                  <div className="flex justify-center gap-1 mb-5">
                    {Array(5).fill(0).map((_, i) => (
                      <FiStar key={i} className="text-gold fill-current" size={18} style={{ fill: 'currentColor' }} />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-6 max-w-2xl mx-auto">
                    "{testimonials[tIdx].message}"
                  </p>
                  <div>
                    <p className="font-serif font-bold text-green-deep">{testimonials[tIdx].name}</p>
                    {testimonials[tIdx].role && (
                      <p className="text-gray-500 text-sm mt-1">{testimonials[tIdx].role}</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prevT} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                  <FiChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTIdx(i)}
                      className={`rounded-full transition-all duration-300 ${i === tIdx ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
                <button onClick={nextT} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-light via-cream to-green-light" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(201,146,42,0.1),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-label">Get Started</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-deep mb-5">
              Ready to Source Premium Rice?
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Whether you need bulk supply or retail packs, Lalith Group has the right variety and the right price for you. Serving AP, Telangana & Tamil Nadu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-green-deep text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-lg shadow-green-deep/20 hover:-translate-y-0.5"
              >
                Get a Free Quote
              </Link>
              <Link
                to="/bulk-orders"
                className="border-2 border-green-deep text-green-deep font-semibold px-8 py-4 rounded-full hover:bg-green-deep hover:text-white transition-all"
              >
                Bulk Order Info
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
