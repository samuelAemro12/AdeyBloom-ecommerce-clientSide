import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { FiCheckCircle } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Currency formatting function
    const formatCurrency = (amount, currency = 'ETB') => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        });
        return formatter.format(amount);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderService.getOrder(orderId);
                setOrder(data);
            } catch (err) {
                setError(err.response?.data?.message || t('fetchOrderDetailsFailed'));
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, t]);

    if (loading) return <LoadingSpinner />;
    if (error) return <Toast message={error} type="error" />;
    if (!order) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">{t('orderConfirmed')}</h1>
                    <p className="text-gray-600">
                        {t('thankYouMessage')}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">{t('orderDetails')}</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600">{t('orderNumber')}</p>
                            <p className="font-medium">{order._id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('orderDate')}</p>
                            <p className="font-medium">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('status')}</p>
                            <p className="font-medium capitalize">{order.status}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('paymentMethod')}</p>
                            <p className="font-medium capitalize">{order.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">{t('shippingAddress')}</h2>
                    <div className="space-y-2">
                        <p>{order.shippingAddress.street}</p>
                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">{t('orderSummary')}</h2>
                    <div className="space-y-4">
                        {order.orderItems && order.orderItems.map((item) => (
                            <div key={item._id} className="flex justify-between">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>{formatCurrency(item.priceAtPurchase * item.quantity, 'ETB')}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                                <span>{t('subtotal')}</span>
                                <span>{formatCurrency(order.subtotal || 0, 'ETB')}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>{t('shipping')}</span>
                                <span>{formatCurrency(order.shippingCost || 150, 'ETB')}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>{t('tax')}</span>
                                <span>{formatCurrency(order.tax || 0, 'ETB')}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                <span>{t('total')}</span>
                                <span>{formatCurrency(order.totalAmount, 'ETB')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        {t('continueShopping')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 