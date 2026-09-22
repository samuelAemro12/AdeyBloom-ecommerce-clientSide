import api from '../config/axios';

export const contactService = {
    // Submit contact form
    submitContact: async (contactData) => {
        const response = await api.post('/api/contacts/submit', contactData);
        return response.data;
    }
}; 