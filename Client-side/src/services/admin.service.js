import api from '../config/axios';

export const adminService = {
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats').then(res => res.data),

  // Products
  getProducts: () => api.get('/products').then(res => res.data),
  createProduct: (data) => api.post('/products', data).then(res => res.data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data).then(res => res.data),
  deleteProduct: (id) => api.delete(`/products/${id}`).then(res => res.data),

  // Orders
  getOrders: () => api.get('/admin/orders').then(res => res.data),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }).then(res => res.data),

  // Users
  getUsers: () => api.get('/admin/users').then(res => res.data),

  // Admin registration
  registerAdmin: async (adminData) => {
    try {
      const response = await api.post('/auth/register-admin', adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Admin registration failed' };
    }
  }
};

export default adminService;
