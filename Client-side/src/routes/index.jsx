import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProductDetails from '../pages/ProductDetails';
import ProductListing from '../pages/ProductListing';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import UserProfile from '../pages/UserProfile';
import OrderHistory from '../pages/OrderHistory';
import WishlistPage from '../pages/WishlistPage';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import FAQ from '../pages/FAQ';
import Shipping from '../pages/Shipping';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

// Admin imports
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductsPanel from '../pages/admin/ProductsPanel';
import OrdersPanel from '../pages/admin/OrdersPanel';
import UsersPanel from '../pages/admin/UsersPanel';
import ContactManagement from '../pages/admin/ContactManagement';
import Settings from '../pages/admin/Settings';
import AppProviders from '../components/AppProviders';
import SuccessPage from '../payment/SuccessPage';
import CallbackPage from '../payment/CallbackPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppProviders />,
    children: [
      {
        path: '',
        element: <RootLayout />,
        children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'signin',
        element: <SignIn />
      },

{
        path: 'SuccessPage',
        element: <SuccessPage />
      },{
        path: 'CallbackPage',
        element: <CallbackPage />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'products',
        element: <ProductListing />
      },
      {
        path: 'product/:productId',
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'order-confirmation/:orderId',
        element: <OrderConfirmation />
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        )
      },
      {
        path: 'about',
        element: <AboutUs />
      },
      {
        path: 'contact',
        element: <ContactUs />
      },
      {
        path: 'faq',
        element: <FAQ />
      },
      {
        path: 'shipping',
        element: <Shipping />
      },
      {
          path: 'shop',
          element: <ProductListing />
        }
        ]
      },
      // Admin Routes - separate from main layout
      {
        path: 'admin',
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: '',
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboard />
              },
              {
                path: 'dashboard',
                element: <AdminDashboard />
              },
              {
                path: 'products',
                element: <ProductsPanel />
              },
              {
                path: 'orders',
                element: <OrdersPanel />
              },
              {
                path: 'users',
                element: <UsersPanel />
              },
              {
                path: 'contacts',
                element: <ContactManagement />
              },
              {
                path: 'settings',
                element: <Settings />
              }
            ]
          }
        ]
      },
      // Catch-all route for 404
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router; 