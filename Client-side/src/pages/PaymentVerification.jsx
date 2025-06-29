import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { useTranslation } from '../context/TranslationContext';

const PaymentVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const reference = searchParams.get('trx_ref');
                const status = searchParams.get('status');

                if (!reference) {
                    setError(t('paymentReferenceNotFound'));
                    setLoading(false);
                    return;
                }

                if (status === 'success') {
                    // Verify payment with backend
                    const response = await paymentService.verifyPayment(reference);
                    
                    if (response.success && response.data.status === 'completed') {
                        setPaymentStatus('success');
                        // Clear cart after successful payment
                        await clearCart();
                    } else {
                        setPaymentStatus('failed');
                        setError(t('paymentVerificationFailed'));
                    }
                } else {
                    setPaymentStatus('failed');
                    setError(t('paymentWasNotSuccessful'));
                }
            } catch (err) {
                setPaymentStatus('failed');
                setError(err.message || t('paymentVerificationError'));
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [searchParams, clearCart, t]);

    const handleContinueShopping = () => {
        navigate('/products');
    };

    const handleViewOrders = () => {
        navigate('/order-history');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <LoadingSpinner />
                    <p className="mt-4 text-gray-600">{t('verifyingPayment')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                {error && <Toast message={error} type="error" />}
                
                {paymentStatus === 'success' ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-green-600 mb-2">{t('paymentSuccessful')}</h1>
                        <p className="text-gray-600 mb-6">{t('paymentSuccessfulMessage')}</p>
                        <div className="space-y-3">
                            <button
                                onClick={handleViewOrders}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                {t('viewOrders')}
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                {t('continueShopping')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-red-600 mb-2">{t('paymentFailed')}</h1>
                        <p className="text-gray-600 mb-6">{t('paymentFailedMessage')}</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                {t('tryAgain')}
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                {t('continueShopping')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentVerification; 