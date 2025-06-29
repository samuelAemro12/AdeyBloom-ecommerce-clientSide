import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { useTranslation } from '../context/TranslationContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Ethiopia'
    });

    // Currency formatting function
    const formatCurrency = (amount, currency = 'ETB') => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        });
        return formatter.format(amount);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Starting order creation process...');
            console.log('Form data:', formData);
            console.log('User:', user);
            console.log('Cart items:', cartItems);

            // First create the order
            const orderData = {
                shippingAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                paymentMethod: 'chapa' // Always Chapa
            };

            console.log('Order data being sent:', orderData);

            const orderResponse = await orderService.createOrder(orderData);
            console.log('Order created successfully:', orderResponse);
            
            const order = orderResponse.order;

            // Initialize Chapa payment
            const paymentData = {
                orderId: order._id,
                amount: order.totalAmount,
                currency: order.currency || 'ETB',
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone || ''
            };

            console.log('Payment data:', paymentData);

            const paymentResponse = await paymentService.initializePayment(paymentData);
            console.log('Payment initialized:', paymentResponse);
            
            // Redirect to Chapa checkout
            paymentService.redirectToCheckout(paymentResponse.data.checkoutUrl);
        } catch (err) {
            console.error('Error in handleSubmit:', err);
            console.error('Error response:', err.response);
            console.error('Error message:', err.message);
            setError(err.response?.data?.message || t('orderCreationFailed'));
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{t('yourCartIsEmpty')}</h1>
                    <button
                        onClick={() => navigate('/products')}
                        className="text-indigo-600 hover:text-indigo-800"
                    >
                        {t('continueShopping')} →
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const shipping = 150; // ETB shipping cost
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">{t('checkout')}</h1>
            {error && <Toast message={error} type="error" />}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">{t('shippingInformation')}</h2>
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('streetAddress')}</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('state')}</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('zipCode')}</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('paymentMethod')}</label>
                                <div className="mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">C</span>
                                        </div>
                                        <span className="font-medium text-gray-900">{t('chapa')}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Secure payment powered by Chapa</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">{t('orderSummary')}</h2>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product._id} className="flex justify-between">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>{formatCurrency(item.price * item.quantity, item.product.currency || 'ETB')}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                                <span>{t('subtotal')}</span>
                                <span>{formatCurrency(subtotal, 'ETB')}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>{t('shipping')}</span>
                                <span>{formatCurrency(shipping, 'ETB')}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>{t('tax')}</span>
                                <span>{formatCurrency(tax, 'ETB')}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                <span>{t('total')}</span>
                                <span>{formatCurrency(total, 'ETB')}</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                        >
                            {loading ? <LoadingSpinner /> : t('placeOrder')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 