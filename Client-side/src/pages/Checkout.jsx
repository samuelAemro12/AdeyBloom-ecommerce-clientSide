import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { orderService } from '../services/orderService';
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
    const [success, setSuccess] = useState(false);
    // Get Chapa public key from environment variables
    const chapaPublicKey = import.meta.env.VITE_CHAPA_PUBLIC_KEY;

    // Validate that the API key is loaded
    if (!chapaPublicKey) {
        console.error('Chapa public key not found in environment variables');
    }


        const [txRef, setTxRef] = useState('');
        const generateTxRef = () => {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
            return `negade-yutx-${timestamp}-${randomString}`;
          };
        
          useEffect(() => {
            setTxRef(generateTxRef());
          }, []);

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
        setSuccess(false);

        try {
            // Create the order
            const orderData = {
                shippingAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                paymentMethod: 'none' // No payment
            };

            const orderResponse = await orderService.createOrder(orderData);
            setSuccess(true);
            clearCart();
            setTimeout(() => {
                navigate(`/order-confirmation/${orderResponse.order._id}`);
            }, 1500);
        } catch (err) {
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
    // setEmail(user.email);
    // setAmount(total);

    
   

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">{t('checkout')}</h1>
            {error && <Toast message={error} type="error" />}
            {success && <Toast message={t('orderConfirmed')} type="success" />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">{t('orderSummary')}</h2>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product._id} className="flex justify-between">
                                <span>{item.product.name} x {item.quantity}</span>
                                <span>{formatCurrency(item.product.price * item.quantity, item.product.currency || 'ETB')}</span>
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
                    </div>
                </div>
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
                        </div>
                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 mt-6"
                        >
                            {loading ? <LoadingSpinner /> :
                            //  t('placeOrder')}
                            <>
                            {/* <Pay  email={email} amount={amount}/> */}


<form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
    <input type="hidden" name="public_key" value={chapaPublicKey} />
    <input type="hidden" name="tx_ref" value={txRef} />
    <input type="hidden" name="amount" value={total} />
    <input type="hidden" name="currency" value="ETB" />
    <input type="hidden" name="email" value={user.email} />
    <input type="hidden" name="first_name" value={user.name} />
    <input type="hidden" name="last_name" value={user.name} />
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    {/* <input type="hidden" name="callback_url" value="https://example.com/callbackurl" /> */}
    <input type="hidden" name="callback_url" value=" http://localhost:5173/CallbackPage" />
    {/* <input type="hidden" name="return_url" value="https://example.com/returnurl" /> */}
    <input type="hidden" name="return_url" value="http://localhost:5173/SuccessPage" />

    
    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit" >  {t('Pay Now')}</button>
</form>

                            </>}
                        </button>
                    </form>
                </div>

              
            </div>
        </div>
    );
};

export default Checkout; 