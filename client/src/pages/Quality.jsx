import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const certs = [
  { name: 'FSSAI', number: 'License No. to be added', desc: 'Food Safety and Standards Authority of India — mandatory license for food processing and distribution.' },
  { name: 'ISO', number: 'ISO Cert. No. to be added', desc: 'International Organization for Standardization — certified food safety and quality management system.' },
  { name: 'Sortex', number: 'Optical Color Sorted', desc: 'Every batch passes through optical color sorters ensuring zero discolored or damaged grains.' },
  { name: 'Stone-Free', number: 'Multi-Stage Destoned', desc: 'Multi-stage destoning process guarantees 100% stone-free rice in every bag.' },
];

const tests = [
  'Moisture content (Karl Fischer / Oven method)',
  'Broken grain percentage (sieve analysis)',
  'Grain length and width (digital caliper)',
  'Whiteness index (Kett whiteness meter)',
  'Milling degree (bran content)',
  'Foreign matter and impurities',
  'Pesticide residue (third-party lab)',
  'Heavy metals (third-party lab)',
];

export default function Quality() {
  return (
    <>
      <section className="pt-32 pb-16 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Standards & Compliance</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Quality & Certifications</h1>
          <p className="text-white/70 text-lg">Every grain we sell meets rigorous quality standards — backed by certifications and in-house testing.</p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-green-deep">Our Certifications</h2>
            <p className="text-gray-500 mt-3">Lalith Group is ISO & FSSAI certified — Sortex-cleaned and stone-free in every batch.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map(c => (
              <motion.div key={c.name} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif font-bold text-green-deep text-lg">{c.name}</span>
                </div>
                <h3 className="font-semibold text-green-deep mb-1">{c.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{c.number}</p>
                <p className="text-sm text-gray-500 mb-4">{c.desc}</p>
                <button className="inline-flex items-center gap-1 text-xs text-gold font-semibold hover:underline">
                  <FiDownload size={12} /> Download Certificate
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">In-House Lab</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep mb-5">Quality Testing at Every Stage</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our in-house quality lab tests every incoming paddy lot and every outgoing rice batch from our facility near Srikalahasti, Tirupati. We maintain detailed records for full traceability from farm to customer across AP, Telangana, and Tamil Nadu.
            </p>
            <ul className="space-y-3">
              {tests.map(t => (
                <li key={t} className="flex items-start gap-3 text-sm text-gray-600">
                  <FiCheckCircle className="text-gold mt-0.5 shrink-0" size={16} />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=700&q=80"
              alt="Quality testing laboratory for food products"
              className="rounded-2xl w-full h-96 object-cover shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-gold-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-green-deep mb-4">Our Quality Promise</h2>
          <p className="text-gray-600 leading-relaxed">
            If any batch does not meet the agreed specifications, we replace it — no questions asked. Our quality guarantee is backed by documented test reports that accompany every shipment.
          </p>
        </div>
      </section>
    </>
  );
}
