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

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? 5.99 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const formatPrice = (price, currencyCode = 'ETB') => {
        if (!price || isNaN(price)) return `${currencyCode} 0.00`;
        
        const currencyConfig = {
            'ETB': { symbol: 'ETB', locale: 'en-ET' },
            'USD': { symbol: '$', locale: 'en-US' },
            'EUR': { symbol: '€', locale: 'de-DE' },
            'GBP': { symbol: '£', locale: 'en-GB' }
        };
        
        const config = currencyConfig[currencyCode] || currencyConfig['ETB'];
        
        try {
            return new Intl.NumberFormat(config.locale, {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: 2
            }).format(price);
        } catch (error) {
            return `${config.symbol}${price.toFixed(2)}`;
        }
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
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-secondary-text">
                    <span className="flex items-center">
                        <FiTruck className="w-4 h-4 mr-1" />
                        {t('shipping')}
                    </span>
                    <span className="font-medium">
                        {shipping > 0 ? formatPrice(shipping) : t('free')}
                    </span>
                </div>
                
                <div className="flex justify-between text-secondary-text">
                    <span>{t('tax')}</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-primary-text">{t('total')}</span>
                        <span className="text-2xl font-bold text-primary-accent">{formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            <motion.button
                onClick={handleCheckout}
                className="w-full bg-primary-accent text-white py-4 px-6 rounded-full font-semibold hover:bg-brand-highlight transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <FiCreditCard className="w-5 h-5" />
                <span>{t('proceedToCheckout')}</span>
            </motion.button>

            <div className="mt-4 text-center">
                <p className="text-sm text-secondary-text">
                    {t('secureCheckout')}
                </p>
            </div>
        </motion.div>
    );
};

export default CartSummary; 