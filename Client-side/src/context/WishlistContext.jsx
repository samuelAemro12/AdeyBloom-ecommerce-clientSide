import { createContext, useContext, useState, useEffect } from 'react';
import { 
    getWishlist, 
    addToWishlist as addToWishlistAPI,
    removeFromWishlist as removeFromWishlistAPI,
    moveToCart as moveToCartAPI,
    updateNotificationPreferences as updateNotificationPreferencesAPI
} from '../services/wishlistService';
import { useAuth } from './useAuth';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    // Fetch wishlist on mount and when user changes
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
            setLoading(false);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const data = await getWishlist();
            setWishlistItems(data.products || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch wishlist');
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId, notificationPreferences) => {
        try {
            const data = await addToWishlistAPI(productId, notificationPreferences);
            setWishlistItems(data.products);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add to wishlist');
            return false;
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const data = await removeFromWishlistAPI(productId);
            setWishlistItems(data.products);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove from wishlist');
            return false;
        }
    };

    const moveToCart = async (productId, quantity) => {
        try {
            await moveToCartAPI(productId, quantity);
            await fetchWishlist(); // Refresh wishlist after moving to cart
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to move to cart');
            return false;
        }
    };

    const updateNotificationPreferences = async (productId, preferences) => {
        try {
            const data = await updateNotificationPreferencesAPI(productId, preferences);
            setWishlistItems(data.products);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update preferences');
            return false;
        }
    };

    const value = {
        wishlistItems,
        wishlistCount: wishlistItems.length,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        updateNotificationPreferences,
        refreshWishlist: fetchWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}; 