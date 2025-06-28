import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../context/TranslationContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Wishlist = () => {
  const { wishlistItems, loading, error } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Redirect if not authenticated
  if (!user) {
    navigate('/signin', { state: { from: '/wishlist' } });
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#C585D7] text-white px-6 py-2 rounded-full hover:bg-[#008080] transition-colors"
          >
            {t('tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <FiHeart className="w-16 h-16 text-[#C585D7] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4">{t('wishlistEmpty')}</h2>
          <p className="text-[#6A6A6A] mb-8">
            {t('cartEmptyMessage')}
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#C585D7] text-white px-8 py-3 rounded-full hover:bg-[#008080] transition-colors"
          >
            {t('startShopping')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
      <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">{t('myWishlist')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((item) => (
          <ProductCard key={item.product._id} product={item.product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 