import { motion } from 'framer-motion';
import { FiTruck, FiPackage, FiDollarSign, FiFileText } from 'react-icons/fi';
import InquiryForm from '../components/InquiryForm';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const moqs = [
  { product: 'Lift Rice', moq: '5 MT (100 bags × 26 kg)', note: 'AP, Telangana & Tamil Nadu delivery' },
  { product: 'Leaf Rice', moq: '5 MT (100 bags × 26 kg)', note: 'Hotel, canteen & institutional supply' },
  { product: 'Life Rice', moq: '5 MT (100 bags × 26 kg)', note: 'Health-focused & institutional lines' },
  { product: 'HMT Rice', moq: '5 MT (100 bags × 26 kg)', note: 'Premium variety for retail & export' },
];

const benefits = [
  { icon: FiTruck, title: 'AP, TS & TN Distribution', desc: 'Established distribution network across Andhra Pradesh, Telangana, and Tamil Nadu. Local delivery via Easy Tirupati.' },
  { icon: FiPackage, title: 'Custom Packaging', desc: 'Private label and branded packaging in 26 kg bags for distributors and retailers.' },
  { icon: FiDollarSign, title: 'Flexible Payment', desc: 'Advance, and credit terms available for established buyers. Competitive mill-direct pricing from Srikalahasti.' },
  { icon: FiFileText, title: 'Full Documentation', desc: 'FSSAI & ISO certificates, test reports, invoices, and delivery challans provided with every shipment.' },
];

export default function BulkOrders() {
  return (
    <>
      <section className="pt-32 pb-16 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">B2B Supply</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Bulk Orders & B2B</h1>
          <p className="text-white/70 text-lg">Reliable supply for distributors, retailers, hotels, canteens, and exporters.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map(b => (
              <motion.div key={b.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-light rounded-full flex items-center justify-center mb-4">
                  <b.icon className="text-green-deep" size={20} />
                </div>
                <h3 className="font-serif font-semibold text-lg text-green-deep mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* MOQ Table */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif text-3xl font-bold text-green-deep mb-6">Minimum Order Quantities</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-green-deep text-white">
                  <tr>
                    <th className="text-left px-6 py-4">Product</th>
                    <th className="text-left px-6 py-4">Min. Order Qty</th>
                    <th className="text-left px-6 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {moqs.map((m, i) => (
                    <tr key={m.product} className={i % 2 === 0 ? 'bg-white' : 'bg-cream'}>
                      <td className="px-6 py-4 font-semibold text-green-deep">{m.product}</td>
                      <td className="px-6 py-4 text-gray-600">{m.moq}</td>
                      <td className="px-6 py-4 text-gray-400">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bulk Inquiry Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="font-serif text-4xl font-bold text-green-deep mb-3">Submit a Bulk Inquiry</h2>
            <p className="text-gray-500">Our sales team will respond within 4 business hours with pricing and availability.</p>
          </motion.div>
          <div className="bg-cream rounded-2xl p-8">
            <InquiryForm type="bulk" />
          </div>
        </div>
      </section>
    </>
  );
}
