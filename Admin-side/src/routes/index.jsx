import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductsPanel from '../pages/admin/ProductsPanel';
import OrdersPanel from '../pages/admin/OrdersPanel';
import UsersPanel from '../pages/admin/UsersPanel';
import ContactManagement from '../pages/admin/ContactManagement';
import Settings from '../pages/admin/Settings';
import AppProviders from '../components/AppProviders';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppProviders />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: 'login',
        element: <AdminLogin />
      },
      {
        path: 'admin',
        element: <ProtectedAdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: 'dashboard', element: <AdminDashboard /> },
              { path: 'products', element: <ProductsPanel /> },
              { path: 'orders', element: <OrdersPanel /> },
              { path: 'users', element: <UsersPanel /> },
              { path: 'contacts', element: <ContactManagement /> },
              { path: 'settings', element: <Settings /> }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to="/admin" replace />
      }
    ]
  }
]);

export default router;
