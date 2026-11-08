import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';

const placeholderPosts = [
  { _id: '1', slug: 'raw-vs-parboiled-rice', title: 'Raw vs Parboiled Rice: What\'s the Difference?', excerpt: 'Understanding the key differences between raw and parboiled rice — nutrition, cooking, and best uses.', tags: ['nutrition', 'guide'], createdAt: '2024-01-15', coverImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80' },
  { _id: '2', slug: 'how-to-store-rice', title: 'How to Store Rice Properly at Home', excerpt: 'Simple tips to keep your rice fresh, pest-free, and nutritious for months.', tags: ['storage', 'tips'], createdAt: '2024-02-10', coverImage: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80' },
  { _id: '3', slug: 'rice-varieties-guide', title: 'A Complete Guide to Indian Rice Varieties', excerpt: 'From Sona Masoori to Basmati — explore the rich diversity of rice grown across India.', tags: ['varieties', 'guide'], createdAt: '2024-03-05', coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
];

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/blog').then(r => setPosts(r.data.length ? r.data : placeholderPosts)).catch(() => setPosts(placeholderPosts));
  }, []);

  return (
    <>
      <section className="pt-32 pb-16 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Knowledge Hub</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-white/70 text-lg">Insights on rice varieties, storage, nutrition, and the milling industry.</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div key={post._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={post.coverImage || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80'}
                alt={post.title} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {post.tags?.slice(0, 2).map(t => (
                    <span key={t} className="bg-green-light text-green-deep text-xs font-semibold px-2 py-0.5 rounded-full capitalize">{t}</span>
                  ))}
                </div>
                <h2 className="font-serif text-xl font-bold text-green-deep mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <Link to={`/blog/${post.slug}`} className="text-green-deep text-sm font-semibold hover:text-gold transition-colors">Read More →</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
