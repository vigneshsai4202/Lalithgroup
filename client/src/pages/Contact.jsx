import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import InquiryForm from '../components/InquiryForm';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const contactInfo = [
  { icon: FiPhone, label: 'Phone 1', value: '+91 98481 93511', href: 'tel:+919848193511' },
  { icon: FiPhone, label: 'Phone 2', value: '+91 95532 79111', href: 'tel:+919553279111' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 98481 93511', href: 'https://wa.me/919848193511' },
  { icon: FiMail, label: 'Email', value: 'lift.skht@gmail.com', href: 'mailto:lift.skht@gmail.com' },
  { icon: FiMapPin, label: 'Address', value: 'SF No. 463/1A, 9A, Guntakindapalli, Srikalahasti, Chittoor, Andhra Pradesh — 517644 (Near Vishnu Chemicals)', href: '#map' },
  { icon: FiClock, label: 'Working Hours', value: 'Open 24 Hours — Monday to Sunday', href: null },
];

export default function Contact() {
  return (
    <>
      <section className="pt-32 pb-16 bg-green-deep text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-3">Get in Touch</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">We'd love to hear from you. Reach out for quotes, partnerships, or any queries.</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif text-3xl font-bold text-green-deep mb-8">Reach Us Directly</h2>
            <div className="space-y-5 mb-10">
              {contactInfo.map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-light rounded-full flex items-center justify-center shrink-0">
                    <c.icon className="text-green-deep" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-charcoal font-medium hover:text-gold transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-charcoal font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/919848193511?text=Hello%20LIFT%20Rice%2C%20I%20am%20interested%20in%20your%20rice%20products."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors">
                <FaWhatsapp size={20} /> WhatsApp Us
              </a>
              <a href="tel:+919553279111"
                className="inline-flex items-center gap-2 border-2 border-green-deep text-green-deep font-semibold px-6 py-3 rounded-full hover:bg-green-deep hover:text-white transition-colors">
                <FiPhone size={16} /> +91 95532 79111
              </a>
            </div>

            {/* Map */}
            <div id="map" className="mt-10 rounded-2xl overflow-hidden shadow-md h-64 bg-gray-200">
              {/* REPLACE: embed actual Google Maps iframe */}
              <iframe
                title="Lalith Innovation Food Technology — SF No. 463/1A, Guntakindapalli, Srikalahasti"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.3!2d79.6950!3d13.4400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b1f2e3c4d5e%3A0x6f7a8b9c0d1e2f3a!2sGuntakindapalli%2C%20Srikalahasti%2C%20Andhra%20Pradesh%20517644!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-serif text-3xl font-bold text-green-deep mb-2">Send an Inquiry</h2>
              <p className="text-gray-500 mb-6">We respond within 24 hours on business days.</p>
              <InquiryForm type="general" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
