import axios from 'axios';

const API_URL = 'http://localhost:5000/api/wishlist';

// Get user's wishlist
export const getWishlist = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

// Add product to wishlist
export const addToWishlist = async (productId, notificationPreferences = {}) => {
    const response = await axios.post(
        `${API_URL}/add/${productId}`,
        notificationPreferences,
        { withCredentials: true }
    );
    return response.data;
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
    const response = await axios.delete(
        `${API_URL}/remove/${productId}`,
        { withCredentials: true }
    );
    return response.data;
};

// Move product from wishlist to cart
export const moveToCart = async (productId, quantity = 1) => {
    const response = await axios.post(
        `${API_URL}/move-to-cart/${productId}`,
        { quantity },
        { withCredentials: true }
    );
    return response.data;
};

// Update notification preferences
export const updateNotificationPreferences = async (productId, preferences) => {
    const response = await axios.patch(
        `${API_URL}/notifications/${productId}`,
        preferences,
        { withCredentials: true }
    );
    return response.data;
}; 