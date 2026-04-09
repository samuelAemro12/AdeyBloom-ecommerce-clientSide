import { Outlet } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * RootLayout — wraps all public-facing pages with Navbar + Footer.
 * Auth, Toast and Wishlist providers are hoisted in AppProviders (parent).
 * CartProvider is here since it depends on AuthContext from AppProviders.
 */
const RootLayout = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default RootLayout;
