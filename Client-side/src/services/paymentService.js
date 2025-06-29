import axios from '../config/axios';

class PaymentService {
    // Initialize payment with Chapa
    async initializePayment(paymentData) {
        try {
            const response = await axios.post('/api/payments/initialize', paymentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    // Verify payment
    async verifyPayment(reference) {
        try {
            const response = await axios.get(`/api/payments/verify/${reference}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    // Get payment status
    async getPaymentStatus(paymentId) {
        try {
            const response = await axios.get(`/api/payments/status/${paymentId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    // Redirect to Chapa checkout
    redirectToCheckout(checkoutUrl) {
        window.location.href = checkoutUrl;
    }
}

export const paymentService = new PaymentService(); 