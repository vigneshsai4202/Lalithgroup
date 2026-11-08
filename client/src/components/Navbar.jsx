import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
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
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-gold ${
      isActive ? 'text-gold' : scrolled ? 'text-charcoal' : 'text-white'
    }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo variant={scrolled ? 'dark' : 'light'} size="sm" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>)}
          <Link to="/contact" className="bg-gold text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors">
            Get Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={`lg:hidden p-2 ${scrolled ? 'text-charcoal' : 'text-white'}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-lg px-4 py-4 flex flex-col gap-3">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) => `text-sm font-medium py-1 ${isActive ? 'text-gold' : 'text-charcoal'}`}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="bg-gold text-white text-sm font-semibold px-4 py-2 rounded-full text-center mt-2">
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
