import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const values = [
  { icon: FiTarget, title: 'Quality First', desc: 'We never compromise on grain quality. Every batch is tested before it leaves our facility.' },
  { icon: FiEye, title: 'Transparency', desc: 'Open pricing, honest specs, and clear communication with every client.' },
  { icon: FiHeart, title: 'Farmer Welfare', desc: 'We pay fair prices to farmers and build long-term procurement relationships.' },
];

const machinery = [
  { name: 'Color Sorter', spec: 'Optical 4-chute, 5 TPH capacity', desc: 'Removes discolored, damaged, and foreign grains with 99.9% accuracy.' },
  { name: 'Rubber Roll Sheller', spec: '3 TPH, adjustable gap', desc: 'Gentle dehusking that preserves bran layer and minimizes breakage.' },
  { name: 'Whitener / Polisher', spec: 'Abrasive + friction, 4 TPH', desc: 'Produces uniform white rice with controlled degree of milling.' },
  { name: 'Paddy Dryer', spec: 'Continuous flow, 50 MT/day', desc: 'Reduces moisture from 22% to 14% uniformly without cracking.' },
  { name: 'Gravity Separator', spec: '2 TPH', desc: 'Separates paddy from brown rice by density difference.' },
  { name: 'Grader / Sifter', spec: 'Multi-deck, 4 TPH', desc: 'Grades rice by length and removes broken grains to spec.' },
];

const timeline = [
  { year: '2010', event: 'Lalith Innovation Food Technology Pvt. Ltd. established at Guntakindapalli, Srikalahasti, Chittoor District, AP.' },
  { year: '2013', event: 'Obtained FSSAI license. Began supplying to local retailers and hotels across Chittoor District.' },
  { year: '2016', event: 'Installed Sortex color sorter and automated packaging line. Launched Lift Rice and Leaf Rice brands.' },
  { year: '2019', event: 'Achieved ISO certification. Expanded distribution to Telangana and Tamil Nadu.' },
  { year: '2022', event: 'Launched Life Rice and HMT Rice brands. Mill upgraded to 24/7 operations.' },
  { year: '2024', event: 'Lift Rice and Leaf Rice distributed across AP, Telangana & Tamil Nadu with 500+ retail partners.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-green-deep text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80"
          alt="Paddy fields near Srikalahasti, Andhra Pradesh" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial="hidden" animate="show" variants={fadeUp} className="text-gold tracking-widest text-xs uppercase font-semibold mb-3">About Lalith Group</motion.p>
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Lalith Innovation<br />Food Technology
          </motion.h1>
          <motion.p initial="hidden" animate="show" variants={fadeUp} className="text-white/70 text-lg max-w-2xl mx-auto">
            A name that carries a promise — to innovate, to nourish, and to uplift every stakeholder in the rice value chain. Located at Guntakindapalli, Srikalahasti, Chittoor District, Andhra Pradesh.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">The Name Behind Lalith Group</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep mb-5">What Does Lalith Group Stand For?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>L</strong>alith — the Lalith Group, a family-rooted business near Srikalahasti, Tirupati, committed to quality in every grain they process.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 italic border-l-4 border-gold pl-4">
              Lalith Group is proudly born from the house of MKK Rice — a name that has stood for quality, trust, and purity in rice milling for generations. Building on MKK’s legacy of farm-fresh grain and honest trade, Lalith Group carries forward that same commitment with modern Sortex technology, ISO & FSSAI certified processes, and a passion for delivering the finest Lift Rice and Leaf Rice to households and businesses across Andhra Pradesh, Telangana, and Tamil Nadu.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>I</strong>nnovation — Sortex color sorting, automated polishing, and modern food-tech practices that set Lalith Group apart from conventional mills.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>F</strong>ood — our core purpose. We produce Lift Rice and Leaf Rice — Sortex-cleaned, stone-free rice varieties that feed families across South India.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>T</strong>echnology — ISO & FSSAI certified processes, optical color sorters, and hygienic enclosed processing lines that guarantee stone-free, clean rice every time.
            </p>
            <Link to="/process" className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold px-6 py-3 rounded-full hover:bg-green-mid transition-colors">
              See Our Technology
            </Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&q=80"
              alt="Rice mill founder inspecting grain quality" className="rounded-2xl w-full h-96 object-cover shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'Our Vision', text: 'To be the most trusted rice brand across Andhra Pradesh, Telangana, and Tamil Nadu — known for purity, consistency, and care.' },
              { title: 'Our Mission', text: 'To deliver ISO & FSSAI certified, Sortex-cleaned, stone-free rice through innovative milling technology while supporting farmers and creating value for our distribution partners.' },
              { title: 'Our Promise', text: 'Every bag of Lift Rice or Leaf Rice that leaves our mill meets the same high standard — no exceptions, no shortcuts.' },
            ].map(item => (
              <motion.div key={item.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-cream rounded-2xl p-8 border-l-4 border-gold">
                <h3 className="font-serif text-2xl font-bold text-green-deep mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map(v => (
              <motion.div key={v.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="text-center p-6">
                <div className="w-14 h-14 bg-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-green-deep" size={24} />
                </div>
                <h4 className="font-serif font-semibold text-lg text-green-deep mb-2">{v.title}</h4>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Leadership</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep">The People Behind Lalith Group</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
              alt="Founder of Lalith Group" className="w-36 h-36 rounded-full object-cover shadow-md shrink-0" />
            <div>
              <h3 className="font-serif text-2xl font-bold text-green-deep mb-1">Lalith (Founder, Lalith Group)</h3>
              <p className="text-gold font-semibold text-sm mb-3">Founder & Managing Director, Lalith Group</p>
              <p className="text-gray-600 leading-relaxed">
              The Lalith Group was founded with a vision to bring modern food technology to traditional rice milling in Andhra Pradesh. Operating from SF No. 463/1A, 9A, Guntakindapalli, Srikalahasti, Chittoor District (near Vishnu Chemicals), the company produces Lift Rice and Leaf Rice — Sortex-cleaned, stone-free, and ISO & FSSAI certified. The mill runs 24 hours a day, 7 days a week, and distributes across AP, Telangana, and Tamil Nadu.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Machinery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Infrastructure</p>
            <h2 className="font-serif text-4xl font-bold text-green-deep">Our Machinery & Capacity</h2>
            <p className="text-gray-500 mt-3">State-of-the-art equipment for consistent, high-quality output at scale.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map(m => (
              <motion.div key={m.name} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <h4 className="font-serif font-semibold text-lg text-green-deep mb-1">{m.name}</h4>
                <p className="text-gold text-xs font-semibold mb-2">{m.spec}</p>
                <p className="text-gray-500 text-sm">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-green-deep text-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Our Journey</p>
            <h2 className="font-serif text-4xl font-bold">14 Years of Growth</h2>
          </motion.div>
          <div className="relative border-l-2 border-gold/30 pl-8 space-y-8">
            {timeline.map(t => (
              <motion.div key={t.year} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="relative">
                <div className="absolute -left-10 w-4 h-4 bg-gold rounded-full border-2 border-green-deep" />
                <p className="text-gold font-bold text-lg mb-1">{t.year}</p>
                <p className="text-white/70">{t.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
