import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#FFF9F6]">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Other routes will be added here */}
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
