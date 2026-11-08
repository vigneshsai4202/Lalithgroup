import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const categories = ['mill', 'products', 'team', 'process'];
const empty = { title: '', url: '', category: 'mill', type: 'image' };

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/gallery').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('file', file);
      await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Added to gallery');
      setModal(false);
      setForm(empty);
      setFile(null);
      load();
    } catch { toast.error('Error'); }
    finally { setLoading(false); }
  };

  const del = async id => {
    if (!confirm('Delete?')) return;
    await api.delete(`/gallery/${id}`);
    toast.success('Deleted');
    load();
  };

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-deep';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-green-deep">Gallery</h1>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 bg-green-deep text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-mid transition-colors">
          <FiPlus size={16} /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item._id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
            <img src={item.url} alt={item.title || 'Gallery'} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <button onClick={() => del(item._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded-full">
                <FiTrash2 size={16} />
              </button>
            </div>
            {item.title && <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">{item.title}</p>}
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-bold text-green-deep">Add Gallery Item</h2>
              <button onClick={() => setModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={submit} className="space-y-3">
              <input name="title" value={form.title} onChange={handle} placeholder="Title (optional)" className={inp} />
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Upload File</label>
                <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} className="text-sm" />
              </div>
              <p className="text-xs text-gray-400 text-center">— or paste URL —</p>
              <input name="url" value={form.url} onChange={handle} placeholder="Image URL" className={inp} />
              <select name="category" value={form.category} onChange={handle} className={inp}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="type" value={form.type} onChange={handle} className={inp}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="px-5 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={loading} className="px-5 py-2 bg-green-deep text-white rounded-lg text-sm font-semibold disabled:opacity-60">
                  {loading ? 'Uploading...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
