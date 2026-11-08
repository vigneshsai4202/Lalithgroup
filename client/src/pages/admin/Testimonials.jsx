import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const empty = { name: '', company: '', location: '', message: '', rating: 5 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/testimonials').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/testimonials', form);
      toast.success('Testimonial added');
      setModal(false);
      setForm(empty);
      load();
    } catch { toast.error('Error'); }
    finally { setLoading(false); }
  };

  const del = async id => {
    if (!confirm('Delete?')) return;
    await api.delete(`/testimonials/${id}`);
    toast.success('Deleted');
    load();
  };

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-deep';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-green-deep">Testimonials</h1>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 bg-green-deep text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-mid transition-colors">
          <FiPlus size={16} /> Add
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(t => (
          <div key={t._id} className="bg-white rounded-2xl p-5 shadow-sm relative">
            <button onClick={() => del(t._id)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors">
              <FiTrash2 size={15} />
            </button>
            <div className="flex gap-1 mb-3">
              {Array(t.rating).fill(0).map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}
            </div>
            <p className="text-gray-600 text-sm italic mb-4">"{t.message}"</p>
            <p className="font-semibold text-green-deep text-sm">{t.name}</p>
            <p className="text-xs text-gray-400">{t.company} · {t.location}</p>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-bold text-green-deep">Add Testimonial</h2>
              <button onClick={() => setModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={submit} className="space-y-3">
              <input name="name" value={form.name} onChange={handle} required placeholder="Client Name" className={inp} />
              <input name="company" value={form.company} onChange={handle} placeholder="Company" className={inp} />
              <input name="location" value={form.location} onChange={handle} placeholder="Location" className={inp} />
              <textarea name="message" value={form.message} onChange={handle} required placeholder="Testimonial message" rows={4} className={inp} />
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Rating</label>
                <select name="rating" value={form.rating} onChange={handle} className={inp}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="px-5 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={loading} className="px-5 py-2 bg-green-deep text-white rounded-lg text-sm font-semibold disabled:opacity-60">
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
