import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTruck, FiCreditCard } from 'react-icons/fi';

const CartSummary = () => {
    const { cartItems, getCartTotal } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Currency formatting function
    const formatCurrency = (amount, currency = 'ETB') => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        });
        return formatter.format(amount);
    };

    const subtotal = getCartTotal();
    const shipping = 150; // ETB shipping cost (matches checkout)
    const tax = subtotal * 0.15; // 15% tax (matches checkout)
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <FiShoppingBag className="w-5 h-5 mr-2" />
                {t('orderSummary')}
            </h2>
            
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-secondary-text">
                    <span>{t('subtotal')} ({cartItems.length} {t('items')})</span>
                    <span className="font-medium">{formatCurrency(subtotal, 'ETB')}</span>
                </div>
                
                <div className="flex justify-between text-secondary-text">
                    <span className="flex items-center">
                        <FiTruck className="w-4 h-4 mr-1" />
                        {t('shipping')}
                    </span>
                    <span className="font-medium">{formatCurrency(shipping, 'ETB')}</span>
                </div>
                
                <div className="flex justify-between text-secondary-text">
                    <span>{t('tax')}</span>
                    <span className="font-medium">{formatCurrency(tax, 'ETB')}</span>
                </div>
                
                <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-primary-text">{t('total')}</span>
                        <span className="text-2xl font-bold text-primary-accent">{formatCurrency(total, 'ETB')}</span>
                    </div>
                </div>
            </div>

            {/* Proceed to Checkout Button */}
            <motion.button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <FiCreditCard className="w-5 h-5" />
                <span>{t('proceedToCheckout')}</span>
            </motion.button>

            <div className="text-center">
                <p className="text-sm text-secondary-text">
                    {t('secureCheckout')}
                </p>
            </div>
        </motion.div>
    );
};

export default CartSummary; 