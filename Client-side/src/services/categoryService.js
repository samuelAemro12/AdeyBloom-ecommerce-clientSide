import api from '../config/axios';

export const categoryService = {
    // Get all categories
    getAllCategories: async () => {
        try {
            const response = await api.get('/categories');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get single category
    getCategory: async (id) => {
        try {
            const response = await api.get(`/categories/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// Alias for backward compatibility
export const getCategories = categoryService.getAllCategories; 