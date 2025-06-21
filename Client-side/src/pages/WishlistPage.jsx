import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const WishlistPage = () => {
    const { 
        wishlistItems, 
        loading, 
        error, 
        removeFromWishlist, 
        moveToCart,
        updateNotificationPreferences 
    } = useWishlist();
    const [notificationStates, setNotificationStates] = useState({});
    const { t } = useTranslation();

    const handleMoveToCart = async (productId) => {
        const success = await moveToCart(productId);
        if (success) {
            // Show success message or notification
        }
    };

    const handleRemove = async (productId) => {
        const success = await removeFromWishlist(productId);
        if (success) {
            // Show success message or notification
        }
    };

    const handleNotificationChange = async (productId, type, value) => {
        const success = await updateNotificationPreferences(productId, {
            [type]: value
        });
        if (success) {
            setNotificationStates(prev => ({
                ...prev,
                [productId]: {
                    ...prev[productId],
                    [type]: value
                }
            }));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('myWishlist')}</h1>
            
            {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">{t('wishlistEmpty')}</p>
                    <Link 
                        to="/products" 
                        className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
                    >
                        {t('browseProducts')}
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.product._id} className="border rounded-lg p-4 shadow-sm">
                            <img 
                                src={item.product.images[0]} 
                                alt={item.product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
                            <p className="text-gray-600 mb-2">${item.product.price}</p>
                            
                            <div className="space-y-2 mb-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={item.notifyOnSale}
                                        onChange={(e) => handleNotificationChange(
                                            item.product._id,
                                            'notifyOnSale',
                                            e.target.checked
                                        )}
                                        className="form-checkbox text-pink-500"
                                    />
                                    <span className="text-sm">{t('notifyOnSale')}</span>
                                </label>
                                
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={item.notifyOnStock}
                                        onChange={(e) => handleNotificationChange(
                                            item.product._id,
                                            'notifyOnStock',
                                            e.target.checked
                                        )}
                                        className="form-checkbox text-pink-500"
                                    />
                                    <span className="text-sm">{t('notifyInStock')}</span>
                                </label>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleMoveToCart(item.product._id)}
                                    className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
                                >
                                    {t('moveToCart')}
                                </button>
                                <button
                                    onClick={() => handleRemove(item.product._id)}
                                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    {t('remove')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage; 