import React from 'react';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/TranslationContext';

const CheckoutTest = () => {
    const { cartItems, getCartTotal } = useCart();
    const { t } = useTranslation();

    const formatCurrency = (amount, currency = 'ETB') => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        });
        return formatter.format(amount);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Checkout Test</h3>
            <div className="space-y-2">
                <p><strong>Cart Items:</strong> {cartItems.length}</p>
                <p><strong>Total:</strong> {formatCurrency(getCartTotal(), 'ETB')}</p>
                <div className="mt-4">
                    <h4 className="font-medium mb-2">Items in Cart:</h4>
                    {cartItems.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                            {item.product?.name} x {item.quantity} - {formatCurrency(item.product?.price * item.quantity, 'ETB')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckoutTest; 