import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('imovies_user');
      return stored ? JSON.parse(stored) : {
        id: "usr-1",
        name: "Alex Johnson",
        email: "alex.demo@imovies.com",
        role: "user",
        phone: "+91 98765 43210"
      };
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('imovies_token') || null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('imovies_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('imovies_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('imovies_token', token);
    } else {
      localStorage.removeItem('imovies_token');
    }
  }, [token]);

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    setUser(res.user);
    setToken(res.token);
    setIsAuthModalOpen(false);
    return res;
  };

  const register = async (userData) => {
    const res = await registerApi(userData);
    setUser(res.user);
    setToken(res.token);
    setIsAuthModalOpen(false);
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('imovies_user');
    localStorage.removeItem('imovies_token');
  };

  const setDemoUser = (role = 'user') => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin',
        name: 'Cinema Administrator',
        email: 'admin@imovies.com',
        role: 'admin',
        phone: '+91 98989 89898'
      });
    } else {
      setUser({
        id: 'usr-demo',
        name: 'Alex Johnson',
        email: 'alex.demo@imovies.com',
        role: 'user',
        phone: '+91 98765 43210'
      });
    }
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      setDemoUser,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
