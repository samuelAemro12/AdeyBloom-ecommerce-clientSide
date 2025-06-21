import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { useTranslation } from '../context/TranslationContext';

const Cart = () => {
    const { cartItems, loading, error } = useCart();
    const { t } = useTranslation();

    if (loading) return <LoadingSpinner />;
    if (error) return <Toast message={error} type="error" />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">{t('shoppingCart')}</h1>
            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">{t('yourCartIsEmpty')}</p>
                    <a
                        href="/products"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        {t('continueShopping')} →
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {cartItems.map((item) => (
                                <CartItem key={item.product._id} item={item} />
                            ))}
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