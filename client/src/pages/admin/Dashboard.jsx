import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiMail, FiStar, FiImage } from 'react-icons/fi';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, testimonials: 0, gallery: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/products'),
      api.get('/inquiries?limit=5'),
      api.get('/testimonials'),
      api.get('/gallery'),
    ]).then(([p, i, t, g]) => {
      setStats({ products: p.data.length, inquiries: i.data.total, testimonials: t.data.length, gallery: g.data.length });
      setRecent(i.data.inquiries || []);
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Products', value: stats.products, icon: FiPackage, to: '/admin/products', color: 'bg-green-light text-green-deep' },
    { label: 'Inquiries', value: stats.inquiries, icon: FiMail, to: '/admin/inquiries', color: 'bg-gold-light text-yellow-700' },
    { label: 'Testimonials', value: stats.testimonials, icon: FiStar, to: '/admin/testimonials', color: 'bg-blue-50 text-blue-700' },
    { label: 'Gallery Items', value: stats.gallery, icon: FiImage, to: '/admin/gallery', color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-green-deep mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(c => (
          <Link key={c.label} to={c.to} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-charcoal">{c.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-bold text-green-deep">Recent Inquiries</h2>
          <Link to="/admin/inquiries" className="text-sm text-gold font-semibold hover:underline">View All</Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm">No inquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-400 text-xs uppercase">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Product</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map(inq => (
                  <tr key={inq._id}>
                    <td className="py-3 pr-4 font-medium">{inq.name}</td>
                    <td className="py-3 pr-4 text-gray-500">{inq.email}</td>
                    <td className="py-3 pr-4 text-gray-500">{inq.product || '—'}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        inq.status === 'new' ? 'bg-red-50 text-red-600' :
                        inq.status === 'read' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                      }`}>{inq.status}</span>
                    </td>
                    <td className="py-3 text-gray-400">{new Date(inq.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
