import api from '../config/axios';

 export const productService = {
    // Get all products with pagination support
    getAllProducts: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all products without pagination (for featured products)
    getFeaturedProducts: async (limit = 8) => {
        try {
            const response = await api.get('/products', { 
                params: { 
                    limit: limit,
                    page: 1 
                } 
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get single product
    getProduct: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 