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
    // Allow a short-lived fallback when the user just logged in and AuthProvider hasn't
    // finished syncing the user from the /me endpoint. We set TEMP_AUTH_ROLE in sessionStorage
    // on successful login and consume it here to avoid a redirect race.
    try {
      const tempRole = sessionStorage.getItem('TEMP_AUTH_ROLE');
      if (tempRole === 'admin') {
        // clear the flag and allow access once
        sessionStorage.removeItem('TEMP_AUTH_ROLE');
        return <Outlet />;
      }
    } catch (e) {
      console.debug('ProtectedAdminRoute session check failed', e);
    }

    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute; 