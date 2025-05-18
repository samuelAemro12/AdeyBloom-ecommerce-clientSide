import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data for testing
const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  zipCode: "10001",
};

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser); // Initialize with mock user
  const [loading, setLoading] = useState(false); // Set to false since we're using mock data

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // For testing, we'll just use the mock user
        setUser(mockUser);
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // For testing, we'll just set the mock user
      setUser(mockUser);
      localStorage.setItem('token', 'mock-token');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const signup = async (userData) => {
    try {
      // For testing, we'll just set the mock user
      setUser({ ...mockUser, ...userData });
      localStorage.setItem('token', 'mock-token');
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
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
    login,
    signup,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 