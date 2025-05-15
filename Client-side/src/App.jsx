import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#FFF9F6]">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Other routes will be added here */}
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
