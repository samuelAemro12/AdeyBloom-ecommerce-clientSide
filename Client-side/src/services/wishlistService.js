import api from '../config/axios';

// Get user's wishlist
export const getWishlist = async () => {
    const response = await api.get('/wishlist');
    return response.data;
};

// Add product to wishlist
export const addToWishlist = async (productId, notificationPreferences = {}) => {
    const response = await api.post(
        `/wishlist/add/${productId}`,
        notificationPreferences
    );
    return response.data;
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
    const response = await api.delete(`/wishlist/remove/${productId}`);
    return response.data;
};

// Move product from wishlist to cart
export const moveToCart = async (productId, quantity = 1) => {
    const response = await api.post(
        `/wishlist/move-to-cart/${productId}`,
        { quantity }
    );
    return response.data;
};

// Update notification preferences
export const updateNotificationPreferences = async (productId, preferences) => {
    const response = await api.patch(
        `/wishlist/notifications/${productId}`,
        preferences
    );
    return response.data;
}; 