import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../utils/api';

const placeholders = {
  'raw-vs-parboiled-rice': {
    title: "Raw vs Parboiled Rice: What's the Difference?",
    coverImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=80',
    createdAt: '2024-01-15',
    tags: ['nutrition', 'guide'],
    content: `
      <h2>What is Raw Rice?</h2>
      <p>Raw rice (also called white rice) is paddy that has been dehusked, milled, and polished without any pre-treatment. It cooks faster, has a softer texture, and is the most commonly consumed form of rice in South India.</p>
      <h2>What is Parboiled Rice?</h2>
      <p>Parboiled rice is paddy that has been soaked, steamed, and dried before milling. This process drives nutrients from the bran into the grain, making parboiled rice more nutritious than raw rice.</p>
      <h2>Key Differences</h2>
      <ul>
        <li><strong>Nutrition:</strong> Parboiled rice retains more B vitamins and minerals.</li>
        <li><strong>Texture:</strong> Parboiled rice is firmer and less sticky when cooked.</li>
        <li><strong>Cooking time:</strong> Raw rice cooks faster (15–20 min vs 25–30 min).</li>
        <li><strong>Shelf life:</strong> Parboiled rice has a longer shelf life due to lower moisture.</li>
      </ul>
      <h2>Which Should You Choose?</h2>
      <p>For everyday home cooking, raw Sona Masoori is ideal. For hotels, canteens, and institutional use, parboiled rice is preferred for its firmness and nutritional value.</p>
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/blog/${slug}`).then(r => setPost(r.data)).catch(() => setPost(placeholders[slug] || null));
  }, [slug]);

  if (!post) return <div className="min-h-screen flex items-center justify-center pt-20 text-gray-400">Post not found.</div>;

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-green-deep text-sm font-medium mb-8 hover:text-gold transition-colors">
          <FiArrowLeft /> Back to Blog
        </Link>
        <div className="flex gap-2 mb-4">
          {post.tags?.map(t => <span key={t} className="bg-green-light text-green-deep text-xs font-semibold px-2 py-0.5 rounded-full capitalize">{t}</span>)}
        </div>
        <h1 className="font-serif text-4xl font-bold text-green-deep mb-4">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-8">{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="rounded-2xl w-full h-72 object-cover mb-10 shadow-md" />}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
