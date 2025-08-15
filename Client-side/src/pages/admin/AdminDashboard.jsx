import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiUsers, FiDollarSign, FiPackage } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useTranslation } from '../../context/TranslationContext';
import adminService from '../../services/admin.service';
import SalesChart from '../../components/admin/SalesChart';
import TopProducts from '../../components/admin/TopProducts';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {Icon ? <Icon className="w-6 h-6 text-white" /> : null}
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
  const data = await adminService.getDashboardStats();
  // adminService returns { success, stats } or stats depending on implementation; normalize
  setStats(data.stats || data);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('recentActivity')}</h2>
        <div className="space-y-4">
          {stats?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${activity.color}`} />
              <div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('lowStockAlert')}</h2>
        <div className="space-y-4">
          {stats?.lowStockItems?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">{t('currentStock')}: {item.stock}</p>
              </div>
              <span className="text-red-500 text-sm">{t('lowStock')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 