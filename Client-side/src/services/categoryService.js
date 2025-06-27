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
    },

    // Create category (admin only)
    createCategory: async (categoryData) => {
        try {
            const response = await api.post('/categories', categoryData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update category (admin only)
    updateCategory: async (id, categoryData) => {
        try {
            const response = await api.put(`/categories/${id}`, categoryData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete category (admin only)
    deleteCategory: async (id) => {
        try {
            const response = await api.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// Alias for backward compatibility
export const getCategories = categoryService.getAllCategories; 