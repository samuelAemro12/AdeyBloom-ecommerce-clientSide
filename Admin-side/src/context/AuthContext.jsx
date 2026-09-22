import React, { createContext, useState, useEffect, useRef } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Only check the user if we have a stored token (header-based auth)
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    if (fetchedRef.current) return; // prevent double-call in React StrictMode dev
    fetchedRef.current = true;
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (e) {
      void e;
      setUser(null);
      // If token existed but verification failed, clear it
      try { localStorage.removeItem('token'); } catch (err) { void err; }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.user);
        try { await checkUser(); } catch (err) { void err; }
        return { success: true, user: response.user };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        setUser(response.user);
        try { await checkUser(); } catch (err) { void err; }
        return { success: true, user: response.user };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      try { localStorage.removeItem('token'); } catch (err) { void err; }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      setUser({ ...user, ...userData });
      return { success: true };
    } catch (err) {
      void err;
      return { success: false, error: 'An error occurred while updating profile' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
