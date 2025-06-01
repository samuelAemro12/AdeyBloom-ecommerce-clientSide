import api from '../config/axios';

export const profileService = {
    // Get user profile
    getProfile: async () => {
        try {
            const response = await api.get('/profile');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.patch('/profile', profileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Change password
    changePassword: async (passwordData) => {
        try {
            const response = await api.patch('/profile/password', passwordData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get shipping addresses
    getShippingAddresses: async () => {
        try {
            const response = await api.get('/profile/shipping-addresses');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Add shipping address
    addShippingAddress: async (addressData) => {
        try {
            const response = await api.post('/profile/shipping-addresses', addressData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update shipping address
    updateShippingAddress: async (addressId, addressData) => {
        try {
            const response = await api.patch(`/profile/shipping-addresses/${addressId}`, addressData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete shipping address
    deleteShippingAddress: async (addressId) => {
        try {
            const response = await api.delete(`/profile/shipping-addresses/${addressId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 