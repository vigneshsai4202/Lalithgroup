import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const empty = { name: '', slug: '', category: 'sona-masoori', description: '', grainLength: '', moisture: '', brokenPercent: '', origin: '', shelfLife: '', packagingSizes: '', isBulk: true, isRetail: true, featured: false };

const categories = ['raw','boiled','basmati','sona-masoori','hmt','broken','bran','husk'];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/products').then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setModal(true); };
  const openEdit = p => {
    setForm({ ...p, packagingSizes: p.packagingSizes?.join(', ') || '' });
    setEditing(p._id);
    setModal(true);
  };

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = { ...form, packagingSizes: form.packagingSizes.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) await api.put(`/products/${editing}`, data);
      else await api.post('/products', data);
      toast.success(editing ? 'Product updated' : 'Product added');
      setModal(false);
      load();
    } catch { toast.error('Error saving product'); }
    finally { setLoading(false); }
  };

  const del = async id => {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    toast.success('Deleted');
    load();
  };

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-deep';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-green-deep">Products</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-deep text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-mid transition-colors">
          <FiPlus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-xs text-gray-400 uppercase">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3">Bulk</th>
              <th className="px-5 py-3">Retail</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p => (
              <tr key={p._id}>
                <td className="px-5 py-3 font-medium text-green-deep">{p.name}</td>
                <td className="px-5 py-3 capitalize text-gray-500">{p.category}</td>
                <td className="px-5 py-3">{p.featured ? '✓' : '—'}</td>
                <td className="px-5 py-3">{p.isBulk ? '✓' : '—'}</td>
                <td className="px-5 py-3">{p.isRetail ? '✓' : '—'}</td>
                <td className="px-5 py-3 flex gap-2">
                  <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-green-deep transition-colors"><FiEdit2 size={15} /></button>
                  <button onClick={() => del(p._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><FiTrash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-bold text-green-deep">{editing ? 'Edit' : 'Add'} Product</h2>
              <button onClick={() => setModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={submit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="text-xs font-semibold text-gray-500 mb-1 block">Name *</label><input name="name" value={form.name} onChange={handle} required className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Slug *</label><input name="slug" value={form.slug} onChange={handle} required className={inp} /></div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Category *</label>
                <select name="category" value={form.category} onChange={handle} className={inp}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-2"><label className="text-xs font-semibold text-gray-500 mb-1 block">Description</label><textarea name="description" value={form.description} onChange={handle} rows={3} className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Grain Length</label><input name="grainLength" value={form.grainLength} onChange={handle} className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Moisture %</label><input name="moisture" value={form.moisture} onChange={handle} className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Broken %</label><input name="brokenPercent" value={form.brokenPercent} onChange={handle} className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Origin</label><input name="origin" value={form.origin} onChange={handle} className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Shelf Life</label><input name="shelfLife" value={form.shelfLife} onChange={handle} className={inp} /></div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Pack Sizes (comma separated)</label><input name="packagingSizes" value={form.packagingSizes} onChange={handle} placeholder="1kg, 5kg, 25kg" className={inp} /></div>
              <div className="col-span-2 flex gap-6">
                {[['featured','Featured'],['isBulk','Bulk/B2B'],['isRetail','Retail']].map(([k,l]) => (
                  <label key={k} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" name={k} checked={!!form[k]} onChange={handle} className="accent-green-deep" /> {l}
                  </label>
                ))}
              </div>
              <div className="col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="px-5 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="px-5 py-2 bg-green-deep text-white rounded-lg text-sm font-semibold hover:bg-green-mid disabled:opacity-60">
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
