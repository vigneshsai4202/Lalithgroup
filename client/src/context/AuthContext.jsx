import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('lift_token');
    if (token) {
      api.get('/auth/me').then(r => setAdmin(r.data)).catch(() => localStorage.removeItem('lift_token')).finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('lift_token', data.token);
    const me = await api.get('/auth/me');
    setAdmin(me.data);
  };

  const logout = () => { localStorage.removeItem('lift_token'); setAdmin(null); };

  return <AuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
