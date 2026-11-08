import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const defaultFields = { name: '', email: '', phone: '', company: '', product: '', quantity: '', deliveryLocation: '', message: '', type: 'general' };

export default function InquiryForm({ type = 'general', productName = '' }) {
  const [form, setForm] = useState({ ...defaultFields, type, product: productName });
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', form);
      toast.success('Inquiry sent! We will contact you within 24 hours.');
      setForm({ ...defaultFields, type, product: productName });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-deep transition-colors';

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company / Business</label>
          <input name="company" value={form.company} onChange={handle} placeholder="Your company name" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product of Interest</label>
          <input name="product" value={form.product} onChange={handle} placeholder="e.g. Sona Masoori" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity Required</label>
          <input name="quantity" value={form.quantity} onChange={handle} placeholder="e.g. 10 MT / 500 bags" className={inputClass} />
        </div>
        {(type === 'bulk' || type === 'quote') && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Delivery Location</label>
            <input name="deliveryLocation" value={form.deliveryLocation} onChange={handle} placeholder="City, State" className={inputClass} />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell us more about your requirements..." className={inputClass} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-green-deep text-white font-semibold py-3 rounded-lg hover:bg-green-mid transition-colors disabled:opacity-60">
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
