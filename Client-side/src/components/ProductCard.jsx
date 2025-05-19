import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiHeart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden relative"
    >
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleLike}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-300"
          aria-label={isLiked ? 'Unlike product' : 'Like product'}
        >
          <FiHeart
            className={`w-6 h-6 transition-colors duration-300 ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-[#6A6A6A]">({product.rating})</span>
        </div>
        <p className="text-2xl font-bold text-[#C585D7] mb-4">${product.price}</p>
        <Link
          to={`/product/${product.id}`}
          className="block w-full text-center py-2 bg-[#C585D7] hover:bg-[#008080] text-white rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard; 