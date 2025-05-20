import React from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useUser();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <FiHeart className="w-16 h-16 text-[#C585D7] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4">Your Wishlist is Empty</h2>
          <p className="text-[#6A6A6A] mb-8">
            Save your favorite products here to keep track of what you love!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#C585D7] text-white px-8 py-3 rounded-full hover:bg-[#008080] transition-colors"
          >
            Start Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
      <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 