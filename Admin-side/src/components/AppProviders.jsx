import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';

const AppProviders = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProviders;