import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const AuthContext = createContext();

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
        // Ensure auth state is synchronized with the server (cookie -> /me)
        // This avoids a race where protected routes render before the provider
        // has the latest user data.
        try {
          await checkUser();
        } catch (e) {
          console.debug('Post-register checkUser failed', e);
        }
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
        // Sync provider state with server to ensure protected routes see the
        // authenticated user immediately after login.
        try {
          await checkUser();
        } catch (e) {
          console.debug('Post-login checkUser failed', e);
        }
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

// Export the context so a separate hook file can import it without exporting
// non-component helpers from this module (avoids Fast Refresh warnings).
export { AuthContext };

export default AuthProvider;
