import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiDroplet, FiMapPin, FiClock, FiArrowLeft } from 'react-icons/fi';
import api from '../utils/api';
import InquiryForm from '../components/InquiryForm';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${slug}`).then(r => setProduct(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><div className="animate-spin w-8 h-8 border-4 border-green-deep border-t-transparent rounded-full" /></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center pt-20 text-gray-400">Product not found.</div>;

  const images = product.images?.length ? product.images : ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80'];

  const specs = [
    { icon: FiPackage, label: 'Grain Length', value: product.grainLength },
    { icon: FiDroplet, label: 'Moisture', value: product.moisture },
    { icon: FiPackage, label: 'Broken %', value: product.brokenPercent },
    { icon: FiMapPin, label: 'Origin', value: product.origin },
    { icon: FiClock, label: 'Shelf Life', value: product.shelfLife },
  ];

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/products" className="inline-flex items-center gap-2 text-green-deep text-sm font-medium mb-8 hover:text-gold transition-colors">
          <FiArrowLeft /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3 h-80">
              <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-gold' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="bg-green-light text-green-deep text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {product.category.replace('-', ' ')}
            </span>
            <h1 className="font-serif text-4xl font-bold text-green-deep mt-3 mb-4">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {specs.filter(s => s.value).map(s => (
                <div key={s.label} className="bg-white rounded-xl p-3 flex items-start gap-3">
                  <s.icon className="text-gold mt-0.5 shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-gray-400">{s.label}</p>
                    <p className="text-sm font-semibold text-charcoal">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Packaging */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Available Pack Sizes</p>
              <div className="flex flex-wrap gap-2">
                {product.packagingSizes?.map(size => (
                  <span key={size} className="bg-gold-light text-gold border border-gold text-sm font-semibold px-3 py-1 rounded-full">{size}</span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex gap-3 mb-8">
              {product.isBulk && <span className="bg-green-light text-green-deep text-xs font-semibold px-3 py-1 rounded-full">✓ Bulk / B2B</span>}
              {product.isRetail && <span className="bg-green-light text-green-deep text-xs font-semibold px-3 py-1 rounded-full">✓ Retail</span>}
            </div>

            <a href="#enquire" className="inline-block bg-green-deep text-white font-semibold px-8 py-4 rounded-full hover:bg-green-mid transition-colors">
              Enquire Now
            </a>
          </motion.div>
        </div>

        {/* Inquiry Form */}
        <div id="enquire" className="bg-white rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-green-deep mb-2">Enquire About This Product</h2>
          <p className="text-gray-500 mb-6">Fill in your details and we'll get back to you within 24 hours.</p>
          <InquiryForm type="quote" productName={product.name} />
        </div>
      </div>
    </div>
  );
}
