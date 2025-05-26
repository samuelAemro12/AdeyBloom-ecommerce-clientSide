import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import WishlistButton from './WishlistButton';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return null;
  }

  const {
    _id,
    name = 'Product Name',
    price = 0,
    originalPrice,
    discount,
    images = [],
    stock = 0
  } = product;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= Math.min(10, stock)) {
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
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img
          src={images[0] || '/placeholder-image.jpg'}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <WishlistButton productId={_id} className="absolute top-4 right-4" />
        {discount && (
          <span className="absolute top-2 left-2 bg-[#C585D7] text-white px-3 py-1 rounded-full text-sm">
            {discount}% OFF
          </span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">{name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#C585D7] text-xl font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-1 rounded-full hover:bg-[#FAF3EC] transition-colors"
              disabled={quantity <= 1}
            >
              <FiMinus className="w-4 h-4 text-[#6A6A6A]" />
            </button>
            <span className="px-3 py-1 border-2 border-[#C585D7] rounded-full text-[#2F2F2F] font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-1 rounded-full hover:bg-[#FAF3EC] transition-colors"
              disabled={quantity >= Math.min(10, stock)}
            >
              <FiPlus className="w-4 h-4 text-[#6A6A6A]" />
            </button>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full transition-colors ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#C585D7] text-white hover:bg-[#008080]'
          }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>
            {isAdding 
              ? 'Added to Cart!' 
              : stock === 0 
                ? 'Out of Stock' 
                : 'Add to Cart'
            }
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard; 