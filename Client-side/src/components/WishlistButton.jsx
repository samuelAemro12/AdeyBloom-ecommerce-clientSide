import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useUser();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWishlistToggle}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
        isInWishlist 
          ? 'bg-[#C585D7] text-white' 
          : 'bg-white/80 hover:bg-white text-gray-400'
      }`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <FiHeart
        className={`w-6 h-6 transition-colors ${
          isInWishlist ? 'fill-current' : ''
        }`}
      />
    </motion.button>
  );
};

export default WishlistButton; 