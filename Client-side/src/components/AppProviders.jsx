import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { WishlistProvider } from '../context/WishlistContext';

const AppProviders = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <WishlistProvider>
          <Outlet />
        </WishlistProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProviders;
