import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';
import WishlistPage from './pages/WishlistPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsPanel from './pages/admin/ProductsPanel';
import OrdersPanel from './pages/admin/OrdersPanel';
import UsersPanel from './pages/admin/UsersPanel';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import OrderConfirmation from './pages/OrderConfirmation';
import CallbackPage from './payment/CallbackPage';
import SuccessPage from './payment/SuccessPage';
// Remove: import AdminRegister from './pages/AdminRegister';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <WishlistProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <HomePage />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path='/CallbackPage' element={<CallbackPage/>}/>
            <Route path='/SuccessPage' element={<SuccessPage/>}/>


            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<ProductsPanel />} />
                <Route path="orders" element={<OrdersPanel />} />
                <Route path="users" element={<UsersPanel />} />
                <Route path="contacts" element={<ContactManagement />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* 404 route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WishlistProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
