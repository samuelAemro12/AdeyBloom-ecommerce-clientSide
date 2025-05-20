import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Ensure cart is an array
  const safeCart = Array.isArray(cart) ? cart : [];

  const calculateSubtotal = () => {
    return safeCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (safeCart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <FiShoppingBag className="w-16 h-16 text-[#C585D7] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4">Your Cart is Empty</h2>
          <p className="text-[#6A6A6A] mb-8">Add some beautiful products to your cart!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#C585D7] text-white px-8 py-3 rounded-full hover:bg-[#008080] transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
      <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {safeCart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-6 bg-white p-6 rounded-2xl shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">{item.name}</h3>
                  <p className="text-[#C585D7] text-xl font-bold mb-4">${item.price}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-2 rounded-full hover:bg-[#FAF3EC] transition-colors"
                    >
                      <FiMinus className="w-5 h-5 text-[#6A6A6A]" />
                    </button>
                    <span className="px-6 py-2 border-2 border-[#C585D7] rounded-full text-[#2F2F2F] font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-2 rounded-full hover:bg-[#FAF3EC] transition-colors"
                    >
                      <FiPlus className="w-5 h-5 text-[#6A6A6A]" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 rounded-full hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 className="w-6 h-6 text-red-500" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg sticky top-8"
          >
            <h2 className="text-2xl font-semibold text-[#2F2F2F] mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-[#6A6A6A]">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6A6A6A]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-semibold text-[#2F2F2F]">
                  <span>Total</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#C585D7] text-white py-4 px-6 rounded-full hover:bg-[#008080] transition-colors mt-8"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border-2 border-[#C585D7] text-[#C585D7] py-4 px-6 rounded-full hover:bg-[#C585D7] hover:text-white transition-colors mt-4"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 