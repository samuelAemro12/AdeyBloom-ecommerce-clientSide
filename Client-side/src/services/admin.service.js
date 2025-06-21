import axios from '../config/axios';

export const getUsers = async () => {
    try {
        const response = await axios.get('/api/admin/users');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/api/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserStatus = async (userId, isActive) => {
    try {
        const response = await axios.patch(`/api/admin/users/${userId}/status`, { isActive });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        const response = await axios.patch(`/api/admin/users/${userId}/role`, { role });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}; 