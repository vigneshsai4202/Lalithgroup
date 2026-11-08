import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

const categoryColors = {
  'sona-masoori': 'bg-amber-50 text-amber-700',
  basmati: 'bg-yellow-50 text-yellow-700',
  boiled: 'bg-orange-50 text-orange-700',
  hmt: 'bg-green-50 text-green-700',
  raw: 'bg-lime-50 text-lime-700',
  broken: 'bg-gray-50 text-gray-600',
  bran: 'bg-brown-50 text-stone-600',
  husk: 'bg-stone-50 text-stone-500',
};

export default function ProductCard({ product }) {
  const img = product.images?.[0] || `https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80`;
  return (
    <Link to={`/products/${product.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative h-48 overflow-hidden bg-cream">
        <img src={img} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg text-green-deep mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><FiPackage size={12} /> {product.packagingSizes?.join(', ')}</span>
          <span className="text-green-deep font-semibold text-sm">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
