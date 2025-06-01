import api from '../config/axios';

export const orderService = {
    // Create new order
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get user's orders
    getUserOrders: async () => {
        try {
            const response = await api.get('/orders/my-orders');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get order details
    getOrderDetails: async (orderId) => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Cancel order
    cancelOrder: async (orderId) => {
        try {
            const response = await api.patch(`/orders/${orderId}/cancel`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Admin: Update order status
    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await api.patch(`/orders/${orderId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 