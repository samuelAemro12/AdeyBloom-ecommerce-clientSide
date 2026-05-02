import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiDollarSign, FiPackage, FiShoppingBag, FiUsers } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';
import SalesChart from '../../components/admin/SalesChart';
import TopProducts from '../../components/admin/TopProducts';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from '../../context/TranslationContext';
import adminService from '../../services/admin.service';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const StatCard = ({ title, value, helper, icon, accent }) => {
  const IconComponent = icon;

  return (
    <div className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-sm shadow-rose-100/50 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
          <IconComponent className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        const rawStats = response.stats || response;

        const recentActivity = (rawStats.recentOrders || []).map((order) => ({
          id: order._id,
          description: `${order.user?.name || 'Customer'} placed order #${String(order._id).slice(-6)}`,
          meta: `${order.status} / ${new Date(order.createdAt).toLocaleString()}`,
          tone:
            order.status === 'delivered'
              ? 'bg-emerald-500'
              : order.status === 'cancelled'
                ? 'bg-rose-500'
                : 'bg-amber-500'
        }));

        setStats({
          totalOrders: rawStats.totalOrders || 0,
          totalRevenue: rawStats.totalRevenue || 0,
          itemsSold: rawStats.itemsSold || 0,
          totalUsers: rawStats.totalUsers || 0,
          totalProducts: rawStats.totalProducts || 0,
          salesData: rawStats.salesData || [],
          topSellingProducts: rawStats.topSellingProducts || [],
          recentActivity,
          lowStockItems: rawStats.lowStockProducts || []
        });
      } catch (error) {
        console.error('fetchStats error:', error);
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
      <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-100 via-white to-amber-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-rose-500">{t('adminPanel')}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{t('dashboardOverview')}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Live operational summary for orders, customers, inventory, and revenue.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
            {stats?.recentActivity?.length || 0} recent order events tracked
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title={t('totalOrders')}
          value={stats?.totalOrders || 0}
          helper="All orders in the system"
          icon={FiShoppingBag}
          accent="bg-sky-500"
        />
        <StatCard
          title={t('totalRevenue')}
          value={formatCurrency(stats?.totalRevenue)}
          helper="Delivered revenue recognized"
          icon={FiDollarSign}
          accent="bg-emerald-500"
        />
        <StatCard
          title={t('itemsSold')}
          value={stats?.itemsSold || 0}
          helper="Units sold across all orders"
          icon={FiPackage}
          accent="bg-violet-500"
        />
        <StatCard
          title={t('totalUsers')}
          value={stats?.totalUsers || 0}
          helper="Customer accounts"
          icon={FiUsers}
          accent="bg-rose-500"
        />
        <StatCard
          title={t('totalProducts')}
          value={stats?.totalProducts || 0}
          helper={`${stats?.lowStockItems?.length || 0} low stock alerts`}
          icon={FiAlertCircle}
          accent="bg-amber-500"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm">
          <SalesChart data={stats?.salesData || []} />
        </div>
        <div className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm">
          <TopProducts items={stats?.topSellingProducts || []} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{t('recentActivity')}</h2>
            <span className="text-sm text-slate-500">{stats?.recentActivity?.length || 0} items</span>
          </div>
          <div className="space-y-4">
            {stats?.recentActivity?.length ? (
              stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <div className={`mt-1 h-3 w-3 rounded-full ${activity.tone}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                    <p className="mt-1 text-xs text-slate-500">{activity.meta}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">{t('noRecentActivity')}</p>
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{t('lowStockAlert')}</h2>
            <span className="text-sm text-slate-500">{stats?.lowStockItems?.length || 0} flagged</span>
          </div>
          <div className="space-y-4">
            {stats?.lowStockItems?.length ? (
              stats.lowStockItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {t('currentStock')}: {item.stock} / threshold {item.lowStockThreshold}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                    {t('lowStock')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">{t('noLowStockItems')}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
