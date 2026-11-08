import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import api from '../utils/api';

const categories = ['all', 'mill', 'products', 'team', 'process'];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const params = cat !== 'all' ? `?category=${cat}` : '';
    api.get(`/gallery${params}`).then(r => setItems(r.data)).catch(() => {
      // Fallback placeholder images
      setItems([
        { _id: '1', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80', title: 'Mill Interior', category: 'mill', type: 'image' },
        { _id: '2', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', title: 'Premium Rice', category: 'products', type: 'image' },
        { _id: '3', url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80', title: 'Paddy Fields', category: 'mill', type: 'image' },
        { _id: '4', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', title: 'Farm Procurement', category: 'process', type: 'image' },
        { _id: '5', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', title: 'Quality Check', category: 'process', type: 'image' },
        { _id: '6', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', title: 'Our Team', category: 'team', type: 'image' },
      ]);
    });
  }, [cat]);

  return (
    <>
      <section className="pt-32 pb-16 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Visual Tour</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-white/70 text-lg">A look inside our mill, our products, and our team.</p>
        </div>
      </section>

      <section className="py-10 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  cat === c ? 'bg-green-deep text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-light'
                }`}>
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <motion.div key={item._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-100 aspect-square"
                onClick={() => setLightbox(item)}>
                <img src={item.url} alt={item.title || 'Gallery image'} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.title && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 text-white hover:text-gold" onClick={() => setLightbox(null)}>
              <FiX size={32} />
            </button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox.url} alt={lightbox.title}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={e => e.stopPropagation()} />
            {lightbox.title && <p className="absolute bottom-6 text-white/70 text-sm">{lightbox.title}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
