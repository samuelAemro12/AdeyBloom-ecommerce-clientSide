import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProductDetails from '../pages/ProductDetails';
import ProductListing from '../pages/ProductListing';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import UserProfile from '../pages/UserProfile';
import OrderHistory from '../pages/OrderHistory';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
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
        path: 'checkout',
        element: <Checkout />
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
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router; 