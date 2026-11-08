import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const categories = [
  { value: '', label: 'All' },
  { value: 'sona-masoori', label: 'Sona Masoori' },
  { value: 'basmati', label: 'Basmati' },
  { value: 'boiled', label: 'Parboiled' },
  { value: 'hmt', label: 'HMT' },
  { value: 'raw', label: 'Raw Rice' },
  { value: 'broken', label: 'Broken Rice' },
  { value: 'bran', label: 'Rice Bran' },
  { value: 'husk', label: 'Husk' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('all'); // all | bulk | retail

  const category = searchParams.get('category') || '';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (mode === 'bulk') params.set('bulk', 'true');
    if (mode === 'retail') params.set('retail', 'true');
    api.get(`/products?${params}`).then(r => setProducts(r.data)).finally(() => setLoading(false));
  }, [category, search, mode]);

  return (
    <>
      <section className="pt-32 pb-12 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Our Range</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Rice Products</h1>
          <p className="text-white/70 text-lg">Premium quality rice for bulk buyers, retailers, and households.</p>
        </div>
      </section>

      <section className="py-10 bg-cream sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-green-deep" />
          </div>

          {/* Bulk/Retail toggle */}
          <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden text-sm">
            {['all', 'bulk', 'retail'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-4 py-2 capitalize transition-colors ${mode === m ? 'bg-green-deep text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                {m === 'all' ? 'All' : m === 'bulk' ? 'Bulk / B2B' : 'Retail'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🌾</p>
              <p className="text-lg">No products found. Try a different filter.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
