import api from '../config/axios';

export const contactService = {
    // Submit contact form
    submitContact: async (contactData) => {
        const response = await api.post('/api/contacts/submit', contactData);
        return response.data;
    },

    // Get all contacts (admin only)
    getAllContacts: async () => {
        const response = await api.get('/api/contacts');
        return response.data;
    },

    // Get single contact (admin only)
    getContact: async (contactId) => {
        const response = await api.get(`/api/contacts/${contactId}`);
        return response.data;
    },

    // Update contact status (admin only)
    updateContactStatus: async (contactId, status) => {
        const response = await api.patch(`/api/contacts/${contactId}/status`, { status });
        return response.data;
    },

    // Delete contact (admin only)
    deleteContact: async (contactId) => {
        const response = await api.delete(`/api/contacts/${contactId}`);
        return response.data;
    }
}; 