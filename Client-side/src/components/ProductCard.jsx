import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div 
        className="relative cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.discount && (
          <span className="absolute top-2 right-2 bg-[#C585D7] text-white px-3 py-1 rounded-full text-sm">
            {product.discount}% OFF
          </span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#C585D7] text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-1 rounded-full hover:bg-[#FAF3EC] transition-colors"
            >
              <FiMinus className="w-4 h-4 text-[#6A6A6A]" />
            </button>
            <span className="px-3 py-1 border-2 border-[#C585D7] rounded-full text-[#2F2F2F] font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-1 rounded-full hover:bg-[#FAF3EC] transition-colors"
            >
              <FiPlus className="w-4 h-4 text-[#6A6A6A]" />
            </button>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full transition-colors ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-[#C585D7] text-white hover:bg-[#008080]'
          }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>{isAdding ? 'Added to Cart!' : 'Add to Cart'}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard; 