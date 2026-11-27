import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const categoryLabels = {
  'sona-masoori': 'Sona Masoori',
  basmati: 'Basmati',
  boiled: 'Parboiled',
  hmt: 'HMT',
  raw: 'Raw Rice',
  broken: 'Broken',
  bran: 'Rice Bran',
  husk: 'Husk',
};

const categoryColors = {
  'sona-masoori': 'bg-amber-100 text-amber-800',
  basmati: 'bg-yellow-100 text-yellow-800',
  boiled: 'bg-orange-100 text-orange-800',
  hmt: 'bg-emerald-100 text-emerald-800',
  raw: 'bg-lime-100 text-lime-800',
  broken: 'bg-gray-100 text-gray-600',
  bran: 'bg-stone-100 text-stone-600',
  husk: 'bg-stone-50 text-stone-500',
};

export default function ProductCard({ product }) {
  const img = product.images?.[0] || `https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80`;
  const catLabel = categoryLabels[product.category] || product.category;
  const catColor = categoryColors[product.category] || 'bg-gray-100 text-gray-600';

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-cream">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          style={{ '--tw-scale-x': 'var(--scale)', '--tw-scale-y': 'var(--scale)' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category badge */}
        {catLabel && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
            {catLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-lg text-green-deep mb-1.5 group-hover:text-gold transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-1">{product.description}</p>

        {product.packagingSizes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.packagingSizes.slice(0, 4).map(s => (
              <span key={s} className="text-xs bg-green-light text-green-deep px-2 py-0.5 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-medium">View Details</span>
          <span className="w-8 h-8 bg-green-light rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
            <FiArrowRight size={14} className="text-green-deep group-hover:text-white transition-colors duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
}
