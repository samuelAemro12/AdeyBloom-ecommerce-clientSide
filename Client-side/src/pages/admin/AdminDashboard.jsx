import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiUsers, FiDollarSign, FiPackage } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useTranslation } from '../../context/TranslationContext';
import adminService from '../../services/admin.service';
import SalesChart from '../../components/admin/SalesChart';
import TopProducts from '../../components/admin/TopProducts';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex items-center justify-between space-x-4 hover:shadow-lg transition-shadow">
    <div className="flex items-center space-x-4">
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color} shrink-0`} aria-hidden>
        {Icon ? <Icon className="w-6 h-6 text-white" /> : null}
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
        <p className="text-lg sm:text-2xl font-semibold mt-1 truncate">{value}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
  // Fetch dashboard stats and product list in parallel so we can compute low-stock items
  const [dashboardResp, productsResp] = await Promise.all([
    adminService.getDashboardStats(),
    adminService.getProducts()
  ]);

  // dashboardResp is expected to be { success: true, stats: { ... } }
  const rawStats = dashboardResp.stats || dashboardResp;

  // Normalize recentOrders -> recentActivity for the UI
  const recentActivity = (rawStats.recentOrders || []).map((order) => ({
    description: `${order.user?.name || 'User'} placed order #${order._id} — ${order.status}`,
    time: order.createdAt ? new Date(order.createdAt).toLocaleString() : '',
    color: order.status === 'delivered' ? 'bg-green-400' : order.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
  }));

  // Compute low stock items from products list (threshold can be adjusted)
  const products = productsResp.products || productsResp;
  const lowStockThreshold = 5;
  const lowStockItems = (products || [])
    .filter(p => typeof p.stock === 'number' ? p.stock <= lowStockThreshold : false)
    .map(p => ({ name: p.name, stock: p.stock }));

  const normalized = {
    totalOrders: rawStats.totalOrders || 0,
    totalRevenue: rawStats.totalRevenue || 0,
  itemsSold: rawStats.itemsSold || 0,
    totalUsers: rawStats.totalUsers || 0,
    totalProducts: rawStats.totalProducts || (products || []).length || 0,
    salesData: rawStats.salesData || [],
    topSellingProducts: rawStats.topSellingProducts || [],
    recentActivity,
    lowStockItems
  };

  setStats(normalized);
      } catch {
        showError(t('fetchDashboardStatsFailed'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [showError, t]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{t('dashboardOverview')}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('totalOrders')}
          value={stats?.totalOrders || 0}
          icon={FiShoppingBag}
          color="bg-blue-500"
        />
        <StatCard
          title={t('totalRevenue')}
          value={`$${stats?.totalRevenue?.toFixed(2) || 0}`}
          icon={FiDollarSign}
          color="bg-green-500"
        />
        <StatCard
          title={t('itemsSold')}
          value={stats?.itemsSold || 0}
          icon={FiPackage}
          color="bg-indigo-500"
        />
        <StatCard
          title={t('totalUsers')}
          value={stats?.totalUsers || 0}
          icon={FiUsers}
          color="bg-purple-500"
        />
        <StatCard
          title={t('totalProducts')}
          value={stats?.totalProducts || 0}
          icon={FiPackage}
          color="bg-orange-500"
        />
      </div>

      {/* Charts & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={stats?.salesData || []} />
        </div>
        <div>
          <TopProducts items={stats?.topSellingProducts || []} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('recentActivity')}</h2>
        <div className="space-y-4">
          {stats?.recentActivity?.length ? stats.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${activity.color}`} />
              <div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500">{t('noRecentActivity')}</p>
          )}
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('lowStockAlert')}</h2>
        <div className="space-y-3">
          {stats?.lowStockItems?.length ? stats.lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 truncate" title={item.name}>{item.name}</p>
                <p className="text-xs text-gray-500">{t('currentStock')}: {item.stock}</p>
              </div>
              <span className="text-red-500 text-sm">{t('lowStock')}</span>
            </div>
          )) : (
            <p className="text-sm text-gray-500">{t('noLowStockItems')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 