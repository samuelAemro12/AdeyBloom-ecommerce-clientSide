import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // While checking auth, show a loading spinner or a blank page
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (!user) {
    // If not logged in, redirect to signin, saving the current location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If logged in, render the child component
  return children;
};

export default ProtectedRoute;