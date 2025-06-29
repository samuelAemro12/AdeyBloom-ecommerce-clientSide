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
import PaymentVerification from '../pages/PaymentVerification';
import UserProfile from '../pages/UserProfile';
import OrderHistory from '../pages/OrderHistory';
import WishlistPage from '../pages/WishlistPage';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import FAQ from '../pages/FAQ';
import Shipping from '../pages/Shipping';
import Returns from '../pages/Returns';
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
        path: 'payment-verification',
        element: <PaymentVerification />
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
        path: 'returns',
        element: <Returns />
      },
      {
        path: 'shop',
        element: <ProductListing />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router; 