import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, loading, error } = useCart();
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Toast message={error} type="error" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link 
                    to="/products" 
                    className="inline-flex items-center text-primary-accent hover:text-brand-highlight transition-colors mb-4"
                >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    {t('continueShopping')}
                </Link>
                <h1 className="text-3xl font-bold text-primary-text">{t('shoppingCart')}</h1>
            </div>

            {cartItems.length === 0 ? (
                <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <FiShoppingBag className="w-16 h-16 text-cloud-gray mx-auto mb-6" />
                    <h2 className="text-2xl font-semibold text-primary-text mb-4">{t('yourCartIsEmpty')}</h2>
                    <p className="text-secondary-text mb-8 max-w-md mx-auto">
                        {t('cartEmptyMessage')}
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-8 py-3 bg-primary-accent text-white rounded-full hover:bg-brand-highlight transition-colors font-semibold"
                    >
                        {t('startShopping')}
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-primary-text mb-6">
                                {t('cartItems')} ({cartItems.length})
                            </h2>
                            <div className="space-y-6">
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.product._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <CartItem item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <CartSummary />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart; 