import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const steps = [
  {
    num: '01', title: 'Paddy Procurement',
    desc: 'We source paddy directly from registered farmers across Telangana and Andhra Pradesh. Each lot is tested for moisture content and grain quality before acceptance.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    alt: 'Paddy fields ready for harvest',
  },
  {
    num: '02', title: 'Pre-Cleaning',
    desc: 'Raw paddy passes through pre-cleaners that remove straw, stones, dust, and other large impurities using vibrating screens and air aspiration.',
    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    alt: 'Rice cleaning machinery in operation',
  },
  {
    num: '03', title: 'Drying',
    desc: 'Paddy with high moisture (>18%) is passed through our continuous-flow dryer, reducing moisture to 13–14% uniformly without cracking the grain.',
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    alt: 'Industrial grain dryer',
  },
  {
    num: '04', title: 'Dehusking',
    desc: 'Rubber-roll shellers remove the outer husk from paddy, producing brown rice. Husk is collected separately for use as fuel or sold as a by-product.',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    alt: 'Dehusking process showing brown rice',
  },
  {
    num: '05', title: 'Whitening & Polishing',
    desc: 'Brown rice passes through abrasive whiteners and friction polishers to achieve the desired degree of milling. Water polishing gives a bright, uniform finish.',
    img: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80',
    alt: 'Polished white rice grains',
  },
  {
    num: '06', title: 'Color Sorting',
    desc: 'Our 4-chute optical color sorter scans every grain at high speed, ejecting discolored, damaged, or foreign grains with 99.9% accuracy.',
    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    alt: 'Color sorting machine for rice',
  },
  {
    num: '07', title: 'Grading',
    desc: 'Rice is graded by length using multi-deck sifters. Head rice, medium broken, and small broken are separated to meet specific customer requirements.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    alt: 'Rice grading and sorting',
  },
  {
    num: '08', title: 'Packaging & Dispatch',
    desc: 'Graded rice is packed in food-safe HDPE/PP bags from 1 kg to 50 kg. Each bag is weighed, sealed, and labeled before dispatch via our logistics network.',
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    alt: 'Rice packaging and dispatch',
  },
];

export default function Process() {
  return (
    <>
      <section className="pt-32 pb-16 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Farm to Pack</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Our Milling Process</h1>
          <p className="text-white/70 text-lg">8 precision steps that transform raw paddy into premium packaged rice.</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 space-y-16">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white font-bold font-serif text-lg shrink-0">
                    {step.num}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-green-deep">{step.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <img src={step.img} alt={step.alt} loading="lazy"
                  className="rounded-2xl w-full h-56 object-cover shadow-md" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-green-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-4">Innovation at Every Step</h2>
          <p className="text-white/70 mb-8">
            Our fully automated line runs 16 hours a day, processing up to 5,000 MT of paddy per month with minimal human contact — ensuring hygiene, consistency, and speed.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[['5,000 MT', 'Monthly Capacity'], ['99.9%', 'Color Sort Accuracy'], ['16 hrs', 'Daily Operation']].map(([v, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl font-bold text-gold">{v}</p>
                <p className="text-white/60 text-sm mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
