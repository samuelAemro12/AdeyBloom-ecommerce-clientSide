import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
    const { cartItems, getCartTotal } = useCart();
    const navigate = useNavigate();

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
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartSummary; 