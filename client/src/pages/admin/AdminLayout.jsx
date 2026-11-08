import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiPackage, FiMail, FiStar, FiImage, FiLogOut } from 'react-icons/fi';

const navItems = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/products', icon: FiPackage, label: 'Products' },
  { to: '/admin/inquiries', icon: FiMail, label: 'Inquiries' },
  { to: '/admin/testimonials', icon: FiStar, label: 'Testimonials' },
  { to: '/admin/gallery', icon: FiImage, label: 'Gallery' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-green-deep text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <p className="font-serif font-bold text-xl text-gold">Lalith Group</p>
          <p className="text-white/50 text-xs mt-0.5">Management Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-gold text-white' : 'text-white/70 hover:bg-white/10'
                }`}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-4 text-white/60 hover:text-white text-sm border-t border-white/10 transition-colors">
          <FiLogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
