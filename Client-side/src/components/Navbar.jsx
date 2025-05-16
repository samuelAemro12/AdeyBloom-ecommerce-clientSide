import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { IoLanguageOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'EN' ? 'AM' : 'EN');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-[#C585D7] hover:text-[#008080] transition-colors duration-300">
              AdeyBloom
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-[#2F2F2F] hover:text-[#C585D7] transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-[#2F2F2F] hover:text-[#C585D7]"
            >
              <IoLanguageOutline className="h-5 w-5" />
              <span>{currentLanguage}</span>
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-[#2F2F2F] hover:text-[#C585D7]"
                >
                  <FiUser className="h-5 w-5" />
                  <span className="ml-2">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-[#2F2F2F] hover:text-[#C585D7]"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center text-[#2F2F2F] hover:text-[#C585D7]"
              >
                <FiUser className="h-5 w-5" />
                <span className="ml-2">Sign In</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center text-[#2F2F2F] hover:text-[#C585D7] relative"
            >
              <FiShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C585D7] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#2F2F2F] hover:text-[#C585D7]"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-[#2F2F2F] hover:text-[#C585D7]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between px-3 py-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 text-[#2F2F2F] hover:text-[#C585D7]"
                >
                  <IoLanguageOutline className="h-5 w-5" />
                  <span>{currentLanguage}</span>
                </button>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-[#2F2F2F] hover:text-[#C585D7]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-[#2F2F2F] hover:text-[#C585D7]"
                    >
                      <FiLogOut className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    className="text-[#2F2F2F] hover:text-[#C585D7]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="h-5 w-5" />
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="text-[#2F2F2F] hover:text-[#C585D7] relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#C585D7] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;