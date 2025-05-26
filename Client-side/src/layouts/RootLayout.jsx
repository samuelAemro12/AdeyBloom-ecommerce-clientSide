import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
import { WishlistProvider } from '../context/WishlistContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-[#FFF9F6] flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Outlet />
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default RootLayout; 