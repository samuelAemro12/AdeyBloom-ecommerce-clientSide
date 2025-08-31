import api from '../config/axios';

export const reviewService = {
    // Get product reviews
    getProductReviews: async (productId) => {
        try {
            const response = await api.get(`/reviews/product/${productId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get recent site-wide reviews
    getRecentReviews: async (limit = 3) => {
        try {
            const response = await api.get(`/reviews/recent?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Add review
    addReview: async (productId, reviewData) => {
        try {
            const response = await api.post(`/reviews/product/${productId}`, reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update review
    updateReview: async (reviewId, reviewData) => {
        try {
            const response = await api.patch(`/reviews/${reviewId}`, reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete review
    deleteReview: async (reviewId) => {
        try {
            const response = await api.delete(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 