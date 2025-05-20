import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleCheckoutSuccess = () => {
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <FiCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#2F2F2F] mb-4">Order Successful!</h1>
          <p className="text-[#6A6A6A] mb-8">
            Thank you for your purchase. We'll send you an email with your order details.
          </p>
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
      <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">Checkout</h1>
      <CheckoutForm onSuccess={handleCheckoutSuccess} />
    </div>
  );
};

export default Checkout; 