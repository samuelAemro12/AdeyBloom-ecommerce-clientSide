import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#FFF9F6]">
            <Navbar />
            {/* Routes will be added here */}
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
