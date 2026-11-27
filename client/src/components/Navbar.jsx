import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/process', label: 'Process' },
  { to: '/quality', label: 'Quality' },
  { to: '/bulk-orders', label: 'Bulk Orders' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled ? 'glass-white shadow-sm py-2' : 'bg-transparent py-4'
  }`;

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-all duration-200 link-underline ${
      isActive ? 'text-gold' : scrolled ? 'text-charcoal hover:text-gold' : 'text-white/90 hover:text-white'
    }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo variant={scrolled ? 'dark' : 'light'} size="sm" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:brightness-110 transition-all shadow-md shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-charcoal hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                      isActive ? 'text-gold bg-gold-light' : 'text-charcoal hover:bg-gray-50 hover:text-gold'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="bg-gold text-white text-sm font-semibold px-4 py-3 rounded-full text-center mt-3 hover:brightness-110 transition-all"
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
