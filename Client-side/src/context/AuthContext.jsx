import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
    } catch (error) {
      console.log('User not authenticated:', error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
  setUser(response.user);
  // Return user to allow caller to perform navigation (avoids race conditions)
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
  // Return user to allow caller to perform navigation (avoids race conditions)
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
      navigate('/signin');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      // For testing, we'll just update the user state
      setUser({ ...user, ...userData });
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'An error occurred while updating profile' };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
