import React, { useEffect, useMemo, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import { useTranslation } from '../../context/TranslationContext';
import adminService from '../../services/admin.service';

const statusClasses = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-sky-100 text-sky-700',
  shipped: 'bg-violet-100 text-violet-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-rose-100 text-rose-700'
};

const OrdersPanel = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await adminService.getOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.error('loadOrders error:', error);
      setToast({ show: true, message: t('fetchOrdersFailed'), type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const filteredOrders = useMemo(() => (
    orders.filter((order) => {
      const statusMatch = selectedStatus === 'all' || order.status === selectedStatus;
      const haystack = [
        order._id,
        order.user?.email,
        order.user?.name,
        order.shippingAddress?.city,
        order.shippingAddress?.country
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return statusMatch && haystack.includes(searchTerm.toLowerCase());
    })
  ), [orders, searchTerm, selectedStatus]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await adminService.updateOrderStatus(orderId, newStatus);
      const updatedOrder = response.order || { status: newStatus, _id: orderId };

      setOrders((current) =>
        current.map((order) =>
          order._id === orderId ? { ...order, ...updatedOrder, status: updatedOrder.status || newStatus } : order
        )
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder((current) => ({ ...current, ...updatedOrder, status: updatedOrder.status || newStatus }));
      }

      setToast({ show: true, message: 'Order status updated', type: 'success' });
    } catch (error) {
      console.error('updateOrderStatus error:', error);
      setToast({ show: true, message: t('updateOrderStatusFailed'), type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((current) => ({ ...current, show: false }))}
      />

      <section className="rounded-[28px] bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Fulfillment</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{t('ordersManagement')}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Track incoming orders, update fulfillment status, and inspect line items without leaving the admin page.
            </p>
          </div>
          <button
            onClick={loadOrders}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            Refresh Orders
          </button>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option value="all">{t('allStatus')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="processing">{t('processing')}</option>
              <option value="shipped">{t('shipped')}</option>
              <option value="delivered">{t('delivered')}</option>
              <option value="cancelled">{t('cancelled')}</option>
            </select>
            <input
              type="text"
              placeholder={t('searchOrders')}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="text-sm text-slate-500">{filteredOrders.length} matching orders</div>
        </div>

        {loading ? <div className="mt-6"><LoadingSpinner /></div> : null}

        {!loading ? (
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                  <th className="px-4 py-3">{t('orderId')}</th>
                  <th className="px-4 py-3">{t('customer')}</th>
                  <th className="px-4 py-3">{t('date')}</th>
                  <th className="px-4 py-3">{t('total')}</th>
                  <th className="px-4 py-3">{t('status')}</th>
                  <th className="px-4 py-3">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="text-sm text-slate-700">
                    <td className="px-4 py-4 font-medium text-slate-900">#{String(order._id).slice(-6)}</td>
                    <td className="px-4 py-4">
                      <div>{order.user?.name || 'Customer'}</div>
                      <div className="text-slate-500">{order.user?.email || 'No email'}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">${Number(order.totalAmount || 0).toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status] || 'bg-slate-100 text-slate-700'}`}>
                        {t(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                          title="View details"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(event) => updateOrderStatus(order._id, event.target.value)}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        >
                          <option value="pending">{t('pending')}</option>
                          <option value="processing">{t('processing')}</option>
                          <option value="shipped">{t('shipped')}</option>
                          <option value="delivered">{t('delivered')}</option>
                          <option value="cancelled">{t('cancelled')}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      {selectedOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Order #{String(selectedOrder._id).slice(-6)}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedOrder.user?.name || 'Customer'} / {selectedOrder.user?.email || 'No email'}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Shipping</h3>
                <p className="mt-3 text-sm text-slate-700">
                  {selectedOrder.shippingAddress?.street}
                  <br />
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}
                  <br />
                  {selectedOrder.shippingAddress?.zipCode}, {selectedOrder.shippingAddress?.country}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Summary</h3>
                <p className="mt-3 text-sm text-slate-700">Placed: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p className="mt-2 text-sm text-slate-700">Total: ${Number(selectedOrder.totalAmount || 0).toFixed(2)}</p>
                <p className="mt-2 text-sm text-slate-700">Items: {selectedOrder.orderItems?.length || 0}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Line items</h3>
              <div className="mt-3 space-y-3">
                {(selectedOrder.orderItems || []).map((item) => (
                  <div key={item._id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.product?.name || 'Product removed'}</p>
                      <p className="mt-1 text-xs text-slate-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      ${Number(item.product?.price || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersPanel;
