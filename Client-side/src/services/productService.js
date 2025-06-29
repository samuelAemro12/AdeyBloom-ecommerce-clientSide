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

    // Get all products (alias for getAllProducts - used by admin panel)
    getProducts: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            // The API returns { products: [...], totalPages, currentPage, totalProducts }
            return response.data.products || response.data;
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
    },

    // Create product (admin only)
    createProduct: async (productData) => {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update product (admin only)
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete product (admin only)
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 