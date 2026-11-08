import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const statusColors = { new: 'bg-red-50 text-red-600', read: 'bg-yellow-50 text-yellow-600', replied: 'bg-green-50 text-green-600' };

export default function AdminInquiries() {
  const [data, setData] = useState({ inquiries: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);

  const load = () => {
    const params = new URLSearchParams({ page, limit: 15 });
    if (status) params.set('status', status);
    api.get(`/inquiries?${params}`).then(r => setData(r.data)).catch(() => {});
  };

  useEffect(() => { load(); }, [page, status]);

  const updateStatus = async (id, s) => {
    await api.patch(`/inquiries/${id}/status`, { status: s });
    toast.success('Status updated');
    load();
    if (selected?._id === id) setSelected(prev => ({ ...prev, status: s }));
  };

  const exportCsv = () => {
    window.open('/api/inquiries/export/csv', '_blank');
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-green-deep">Inquiries ({data.total})</h1>
        <button onClick={exportCsv} className="flex items-center gap-2 border border-green-deep text-green-deep px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-light transition-colors">
          <FiDownload size={15} /> Export CSV
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {['', 'new', 'read', 'replied'].map(s => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              status === s ? 'bg-green-deep text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-xs text-gray-400 uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.inquiries.map(inq => (
                <tr key={inq._id} onClick={() => setSelected(inq)}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === inq._id ? 'bg-green-light/30' : ''}`}>
                  <td className="px-4 py-3 font-medium">{inq.name}</td>
                  <td className="px-4 py-3 text-gray-500">{inq.product || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[inq.status]}`}>{inq.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(inq.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {data.pages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-full text-sm ${page === p ? 'bg-green-deep text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          {selected ? (
            <>
              <h3 className="font-serif font-bold text-lg text-green-deep mb-4">{selected.name}</h3>
              <div className="space-y-2 text-sm mb-5">
                {[['Email', selected.email], ['Phone', selected.phone], ['Company', selected.company],
                  ['Product', selected.product], ['Quantity', selected.quantity],
                  ['Delivery', selected.deliveryLocation], ['Type', selected.type]].map(([l, v]) => v ? (
                  <div key={l} className="flex gap-2">
                    <span className="text-gray-400 w-20 shrink-0">{l}:</span>
                    <span className="text-charcoal font-medium">{v}</span>
                  </div>
                ) : null)}
                {selected.message && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-gray-600 text-xs leading-relaxed">{selected.message}</div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {['new', 'read', 'replied'].map(s => (
                  <button key={s} onClick={() => updateStatus(selected._id, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                      selected.status === s ? 'bg-green-deep text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>{s}</button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm text-center mt-10">Select an inquiry to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
