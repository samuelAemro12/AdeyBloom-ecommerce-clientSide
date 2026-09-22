import api from '../config/axios';

const unwrap = (response) => response?.data ?? response;

export const adminService = {
  getDashboardStats: () => api.get('/admin/dashboard/stats').then(unwrap),

  getProducts: (params = {}) => api.get('/admin/products', { params }).then(unwrap),
  createProduct: (data) => api.post('/products', data).then(unwrap),
  updateProduct: (id, data) => api.put(`/products/${id}`, data).then(unwrap),
  deleteProduct: (id) => api.delete(`/products/${id}`).then(unwrap),

  getOrders: () => api.get('/admin/orders').then(unwrap),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }).then(unwrap),

  getUsers: () => api.get('/admin/users').then(unwrap),
  createUser: (data) => api.post('/admin/users', data).then(unwrap),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data).then(unwrap),
  deleteUser: (id) => api.delete(`/admin/users/${id}`).then(unwrap),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }).then(unwrap),
  toggleUserActive: (id, isActive) => api.put(`/admin/users/${id}/active`, { isActive }).then(unwrap),

  getSettings: () => api.get('/admin/settings').then(unwrap),
  updateSettings: (data) => api.put('/admin/settings', data).then(unwrap),

  registerAdmin: async (adminData) => {
    try {
      const response = await api.post('/auth/register-admin', adminData);
      return unwrap(response);
    } catch (error) {
      throw error.response?.data || { message: 'Admin registration failed' };
    }
  }
};

export default adminService;
