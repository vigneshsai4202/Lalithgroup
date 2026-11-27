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

const socials = [
  { Icon: FiFacebook, href: '#', label: 'Facebook' },
  { Icon: FiInstagram, href: '#', label: 'Instagram' },
  { Icon: FiYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d2b1e] text-white relative">
      {/* Gold top accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <Logo variant="light" size="sm" />
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Pure Grain. Smart Technology. Delivering premium Sortex-cleaned, stone-free rice from our mill near Srikalahasti to tables across South India.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-200 border border-white/10"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-semibold text-gold mb-5 text-sm tracking-wide uppercase">{title}</h4>
            <ul className="space-y-2.5">
              {items.map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-white/55 text-sm hover:text-gold transition-colors duration-200 link-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gold mb-5 text-sm tracking-wide uppercase">Contact</h4>
          <ul className="space-y-3.5 text-sm text-white/55">
            <li className="flex gap-3 items-start">
              <FiPhone className="mt-0.5 shrink-0 text-gold" size={14} />
              <a href="tel:+919848193511" className="hover:text-gold transition-colors">+91 98481 93511</a>
            </li>
            <li className="flex gap-3 items-start">
              <FiPhone className="mt-0.5 shrink-0 text-gold" size={14} />
              <a href="tel:+919553279111" className="hover:text-gold transition-colors">+91 95532 79111</a>
            </li>
            <li className="flex gap-3 items-start">
              <FiMail className="mt-0.5 shrink-0 text-gold" size={14} />
              <a href="mailto:lift.skht@gmail.com" className="hover:text-gold transition-colors">lift.skht@gmail.com</a>
            </li>
            <li className="flex gap-3 items-start">
              <FiMapPin className="mt-0.5 shrink-0 text-gold" size={14} />
              <span>SF No. 463/1A, 9A, Guntakindapalli, Srikalahasti, Chittoor, AP — 517644</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} LIFT Rice — Lalith Innovation Food Technology Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
