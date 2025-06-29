import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = () => {
  const { user, loading } = useAuth();
  console.log('user', user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute; 