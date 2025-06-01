import api from '../config/axios';

export const orderService = {
    // Create new order
    createOrder: async (orderData) => {
        const response = await api.post('/api/orders', orderData);
        return response.data;
    },

    // Get user's orders
    getUserOrders: async () => {
        const response = await api.get('/api/orders/my-orders');
        return response.data;
    },

    // Get order details
    getOrder: async (orderId) => {
        const response = await api.get(`/api/orders/${orderId}`);
        return response.data;
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
    updateOrderStatus: async (orderId, status, trackingNumber) => {
        const response = await api.patch(`/api/orders/${orderId}/status`, { status, trackingNumber });
        return response.data;
    }
}; 