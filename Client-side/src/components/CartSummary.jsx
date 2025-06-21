import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/TranslationContext';

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

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{t('checkout.orderSummary')}</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.subtotal')}</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.shipping')}</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.tax')}</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                        <span className="font-semibold">{t('checkout.total')}</span>
                        <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
                {t('checkout.proceedToCheckout')}
            </button>
        </div>
    );
};

export default CartSummary; 