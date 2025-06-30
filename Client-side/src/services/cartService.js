import api from '../config/axios';

export const cartService = {
    // Get user's cart
    getCart: async () => {
        try {
            const response = await api.get('/cart');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Add item to cart
    addToCart: async (productId, quantity = 1) => {
        try {
            const response = await api.post('/cart/add', { productId, quantity });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update cart item quantity
    updateCartItem: async (productId, quantity) => {
        try {
            const response = await api.patch(`/cart/update/${productId}`, { quantity });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Remove item from cart
    removeFromCart: async (productId) => {
        try {
            const response = await api.delete(`/cart/remove/${productId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Clear cart
    clearCart: async () => {
        try {
            const response = await api.delete('/cart/clear');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // clearAllFromCart
     clearAllFromCart: async () => {
        try {
            const response = await api.delete('/cart/clearAllFromCart');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 