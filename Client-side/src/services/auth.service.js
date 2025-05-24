import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auth service
const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred during registration' };
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred during login' };
        }
    },

    // Logout user
    logout: async () => {
        try {
            const response = await api.post('/auth/logout');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred during logout' };
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred while fetching user data' };
        }
    }
};

export default authService; 