import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiHeart, FiUserPlus, FiSettings, FiChevronDown } from 'react-icons/fi';
import { IoLanguageOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';
import { useTranslation } from '../context/TranslationContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { language, setLanguage, t } = useTranslation();

  const menuItems = [
    { name: t('home'), path: '/' },
    { name: t('products'), path: '/products' },
    { name: 'About', path: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-cloud-gray/40 shadow-sm'
          : 'bg-white border-b border-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-2xl font-serif font-bold text-primary-accent tracking-tight hover:text-brand-highlight transition-colors duration-300">
              AdeyBloom
            </span>
          </Link>

          {/* Search Bar – Desktop */}
          <div className="hidden md:block flex-1 max-w-sm">
            <SearchBar />
          </div>

          {/* Nav Links – Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-accent'
                    : 'text-primary-text hover:text-primary-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions – Desktop */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-sm text-secondary-text">
              <IoLanguageOutline className="w-4 h-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-primary-text focus:outline-none cursor-pointer"
              >
                <option value="en">Eng</option>
                <option value="am">አማ</option>
              </select>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-primary-text hover:text-primary-accent transition-colors duration-200" aria-label="Wishlist">
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-primary-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-primary-text hover:text-primary-accent transition-colors duration-200" aria-label="Cart">
              <FiShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute -top-1.5 -right-1.5 bg-coral-rose text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </Link>

            {/* Auth / Profile */}
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen((p) => !p)}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary-text hover:text-primary-accent transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-primary-accent/20 flex items-center justify-center text-primary-accent font-semibold text-xs">
                    {(user.name || user.firstName || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name ? user.name.split(' ')[0] : (user.firstName || '')}</span>
                  <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-cloud-gray/60 z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-text hover:bg-background transition-colors"
                        >
                          <FiUser className="w-4 h-4 text-secondary-text" />
                          {t('profile')}
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-text hover:bg-background transition-colors"
                        >
                          <FiShoppingCart className="w-4 h-4 text-secondary-text" />
                          My Orders
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-text hover:bg-background transition-colors"
                          >
                            <FiSettings className="w-4 h-4 text-secondary-text" />
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-1 border-cloud-gray/50" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-coral-rose hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          {t('logout')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : location.pathname === '/signin' ? (
              <Link to="/signup" className="btn-primary text-sm py-2 px-5">
                {t('signUpHeader')}
              </Link>
            ) : (
              <Link to="/signin" className="btn-primary text-sm py-2 px-5">
                {t('signInHeader')}
              </Link>
            )}
          </div>

          {/* Mobile – Cart + Menu toggle */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative text-primary-text" aria-label="Cart">
              <FiShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-coral-rose text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-primary-text hover:text-primary-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-cloud-gray/40 overflow-hidden"
            >
              <div className="py-4 px-2 space-y-1">
                {/* Search */}
                <div className="px-2 pb-3">
                  <SearchBar />
                </div>

                {/* Nav Links */}
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-secondary-accent text-primary-accent'
                        : 'text-primary-text hover:bg-background'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <hr className="my-2 border-cloud-gray/40" />

                {/* Mobile Actions */}
                <div className="flex items-center gap-4 px-4 py-2">
                  <Link to="/wishlist" className="relative text-primary-text hover:text-primary-accent">
                    <FiHeart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-primary-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <div className="flex items-center gap-1 text-sm text-secondary-text ml-auto">
                    <IoLanguageOutline className="w-4 h-4" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-transparent text-sm font-medium text-primary-text focus:outline-none cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="en">English</option>
                      <option value="am">አማርኛ</option>
                    </select>
                  </div>
                </div>

                {/* Auth */}
                {user ? (
                  <div className="px-2 pt-1">
                    <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-text hover:bg-background rounded-lg transition-colors">
                      <FiUser className="w-4 h-4" />
                      {t('profile')}
                    </Link>
                    <Link to="/orders" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-text hover:bg-background rounded-lg transition-colors">
                      <FiShoppingCart className="w-4 h-4" />
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-text hover:bg-background rounded-lg transition-colors">
                        <FiSettings className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-coral-rose hover:bg-red-50 rounded-lg transition-colors mt-1"
                    >
                      <FiLogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                ) : (
                  <div className="px-4 pt-2 flex flex-col gap-2">
                    <Link to="/signin" className="btn-primary w-full text-center">
                      {t('signInHeader')}
                    </Link>
                    <Link to="/signup" className="btn-secondary w-full text-center">
                      {t('signUpHeader')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
