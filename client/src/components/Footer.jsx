import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import Logo from './Logo';

const footerLinks = {
  Company: [
    { to: '/about', label: 'About Us' },
    { to: '/process', label: 'Our Process' },
    { to: '/quality', label: 'Quality & Certs' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
  ],
  Products: [
    { to: '/products?category=sona-masoori', label: 'BPT Sona Masoori' },
    { to: '/products?category=boiled', label: 'Steam Rice' },
    { to: '/products?category=raw', label: 'Raw Rice' },
    { to: '/products?category=broken', label: 'Broken Rice' },
    { to: '/products?category=bran', label: 'Rice Bran' },
  ],
  Business: [
    { to: '/bulk-orders', label: 'Bulk Orders' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/contact', label: 'Request Quote' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-green-deep text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <Logo variant="light" size="sm" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Pure Grain. Smart Technology. Delivering premium Sortex-cleaned, stone-free rice from our mill near Srikalahasti to tables across South India.
          </p>
          <div className="flex gap-3">
            {[FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors" aria-label="Social link">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-semibold text-gold mb-4">{title}</h4>
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-white/70 text-sm hover:text-gold transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><FiPhone className="mt-0.5 shrink-0 text-gold" /><a href="tel:+919848193511" className="hover:text-gold">+91 98481 93511</a></li>
            <li className="flex gap-2"><FiPhone className="mt-0.5 shrink-0 text-gold" /><a href="tel:+919553279111" className="hover:text-gold">+91 95532 79111</a></li>
            <li className="flex gap-2"><FiMail className="mt-0.5 shrink-0 text-gold" /><a href="mailto:lift.skht@gmail.com" className="hover:text-gold">lift.skht@gmail.com</a></li>
            <li className="flex gap-2"><FiMapPin className="mt-0.5 shrink-0 text-gold" /><span>SF No. 463/1A, 9A, Guntakindapalli, Srikalahasti, Chittoor, AP — 517644</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} LIFT Rice — Lalith Innovation Food Technology Pvt. Ltd. SF No. 463/1A, 9A, Guntakindapalli, Srikalahasti, Chittoor, AP — 517644.
      </div>
    </footer>
  );
}
