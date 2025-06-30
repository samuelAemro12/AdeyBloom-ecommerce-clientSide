import api from '../config/axios';

export const adminService = {
  // Products
  getProducts: () => api.get('/admin/products').then(res => res.data),
  createProduct: (data) => api.post('/admin/products', data).then(res => res.data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data).then(res => res.data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`).then(res => res.data),

  // Orders
  getOrders: () => api.get('/admin/orders').then(res => res.data),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }).then(res => res.data),

  // Users
  getUsers: () => api.get('/admin/users').then(res => res.data),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }).then(res => res.data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`).then(res => res.data),
  updateUserStatus: (id, isActive) => api.put(`/admin/users/${id}/status`, { isActive }).then(res => res.data),

  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats').then(res => res.data),
}; 