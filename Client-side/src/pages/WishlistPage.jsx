import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const WishlistPage = () => {
    const { 
        wishlistItems, 
        loading, 
        error, 
        removeFromWishlist, 
        moveToCart,
        updateNotificationPreferences,
        refreshWishlist
    } = useWishlist();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [processingItems, setProcessingItems] = useState(new Set());
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // Redirect if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/signin', { state: { from: '/wishlist' } });
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const handleMoveToCart = async (productId) => {
        if (processingItems.has(productId)) return;
        
        setProcessingItems(prev => new Set(prev).add(productId));
        try {
            const success = await moveToCart(productId, 1);
            if (success) {
                setToast({ 
                    show: true, 
                    message: t('productMovedToCart'), 
                    type: 'success' 
                });
                // Refresh wishlist to update the UI
                await refreshWishlist();
            } else {
                setToast({ 
                    show: true, 
                    message: t('failedToMoveToCart'), 
                    type: 'error' 
                });
            }
        } catch (error) {
            console.error('Error moving to cart:', error);
            setToast({ 
                show: true, 
                message: t('failedToMoveToCart'), 
                type: 'error' 
            });
        } finally {
            setProcessingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    const handleRemove = async (productId) => {
        if (processingItems.has(productId)) return;
        
        setProcessingItems(prev => new Set(prev).add(productId));
        try {
            const success = await removeFromWishlist(productId);
            if (success) {
                setToast({ 
                    show: true, 
                    message: t('productRemovedFromWishlist'), 
                    type: 'success' 
                });
                // Refresh wishlist to update the UI
                await refreshWishlist();
            } else {
                setToast({ 
                    show: true, 
                    message: t('failedToRemoveFromWishlist'), 
                    type: 'error' 
                });
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            setToast({ 
                show: true, 
                message: t('failedToRemoveFromWishlist'), 
                type: 'error' 
            });
        } finally {
            setProcessingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    const handleNotificationChange = async (productId, type, value) => {
        try {
            const success = await updateNotificationPreferences(productId, {
                [type]: value
            });
            if (success) {
                setToast({ 
                    show: true, 
                    message: t('notificationPreferencesUpdated'), 
                    type: 'success' 
                });
            }
        } catch (error) {
            console.error('Error updating notification preferences:', error);
            setToast({ 
                show: true, 
                message: t('failedToUpdatePreferences'), 
                type: 'error' 
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-[#C585D7] text-white px-6 py-2 rounded-full hover:bg-[#008080] transition-colors"
                >
                    {t('tryAgain')}
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Toast 
                show={toast.show} 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ ...toast, show: false })} 
            />
            
            <h1 className="text-3xl font-bold mb-8">{t('myWishlist')}</h1>
            
            {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">{t('wishlistEmpty')}</p>
                    <Link 
                        to="/products" 
                        className="inline-block bg-[#C585D7] text-white px-6 py-2 rounded-md hover:bg-[#008080] transition-colors"
                    >
                        {t('browseProducts')}
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => {
                        const isProcessing = processingItems.has(item.product._id);
                        return (
                            <div key={item.product._id} className="border rounded-lg p-4 shadow-sm">
                                <img 
                                    src={item.product.images && item.product.images[0] ? item.product.images[0] : '/placeholder-image.jpg'} 
                                    alt={item.product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
                                <p className="text-gray-600 mb-2">ETB {item.product.price}</p>
                                
                                <div className="space-y-2 mb-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={item.notifyOnSale || false}
                                            onChange={(e) => handleNotificationChange(
                                                item.product._id,
                                                'notifyOnSale',
                                                e.target.checked
                                            )}
                                            className="form-checkbox text-pink-500"
                                            disabled={isProcessing}
                                        />
                                        <span className="text-sm">{t('notifyOnSale')}</span>
                                    </label>
                                    
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={item.notifyOnStock || false}
                                            onChange={(e) => handleNotificationChange(
                                                item.product._id,
                                                'notifyOnStock',
                                                e.target.checked
                                            )}
                                            className="form-checkbox text-pink-500"
                                            disabled={isProcessing}
                                        />
                                        <span className="text-sm">{t('notifyInStock')}</span>
                                    </label>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleMoveToCart(item.product._id)}
                                        disabled={isProcessing || item.product.stock === 0}
                                        className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                                            isProcessing 
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : item.product.stock === 0
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-[#C585D7] text-white hover:bg-[#008080]'
                                        }`}
                                    >
                                        {isProcessing ? t('moving') : item.product.stock === 0 ? t('outOfStock') : t('moveToCart')}
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item.product._id)}
                                        disabled={isProcessing}
                                        className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                                            isProcessing 
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {isProcessing ? t('removing') : t('remove')}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WishlistPage; 