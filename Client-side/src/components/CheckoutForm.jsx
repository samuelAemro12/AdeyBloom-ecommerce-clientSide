import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FiCreditCard, FiLock, FiTruck, FiCheck } from 'react-icons/fi';

const CheckoutForm = ({ onSuccess }) => {
  const { cart, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-[#2F2F2F] mb-6">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#C585D7] text-white py-3 rounded-lg hover:bg-[#008080] transition-colors"
            >
              Continue to Payment
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-[#2F2F2F] mb-6">Payment Information</h2>
            <div className="bg-white p-6 rounded-lg border-2 border-[#C585D7]">
              <div className="flex items-center space-x-2 mb-4">
                <FiCreditCard className="w-6 h-6 text-[#C585D7]" />
                <span className="text-[#2F2F2F] font-semibold">Card Details</span>
              </div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080] mb-4"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-[#C585D7] hover:text-[#008080] transition-colors"
              >
                ← Back to Shipping
              </button>
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`flex items-center space-x-2 bg-[#C585D7] text-white py-3 px-6 rounded-lg hover:bg-[#008080] transition-colors ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <FiLock className="w-5 h-5" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="w-5 h-5" />
                    <span>Complete Purchase</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-[#C585D7] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <span className={step >= 1 ? 'text-[#C585D7]' : 'text-gray-500'}>Shipping</span>
        </div>
        <div className="flex-1 h-1 bg-gray-200">
          <div className={`h-full bg-[#C585D7] transition-all duration-300 ${
            step >= 2 ? 'w-full' : 'w-0'
          }`} />
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-[#C585D7] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <span className={step >= 2 ? 'text-[#C585D7]' : 'text-gray-500'}>Payment</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}
      </form>

      <div className="mt-8 p-6 bg-[#FAF3EC] rounded-lg">
        <h3 className="text-lg font-semibold text-[#2F2F2F] mb-4">Order Summary</h3>
        <div className="space-y-2">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span className="text-[#6A6A6A]">{item.name} x {item.quantity}</span>
              <span className="text-[#2F2F2F] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-[#2F2F2F] font-semibold">Total</span>
              <span className="text-[#C585D7] text-xl font-bold">${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 