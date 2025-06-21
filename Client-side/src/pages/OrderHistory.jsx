import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiPackage, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

// Mock order data for testing
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    createdAt: "2024-03-15T10:30:00Z",
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Natural Face Cream",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400"
      },
      {
        id: 2,
        name: "Organic Lip Balm",
        price: 12.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
      }
    ],
    totalAmount: 55.97
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    createdAt: "2024-03-10T15:45:00Z",
    status: "shipped",
    items: [
      {
        id: 3,
        name: "Anti-Aging Serum",
        price: 45.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400"
      }
    ],
    totalAmount: 45.99
  }
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // For testing, we'll use mock data
        // Simulate error for testing
        const shouldError = Math.random() < 0.5; // 50% chance of error
        if (shouldError) {
          throw new Error(t('fetchOrdersFailed'));
        }
        setOrders(mockOrders);
        setError(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, t]);

  if (!user) {
    navigate('/signin');
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF9F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C585D7]"></div>
      </div>
    );
  }

  if (error) {
    navigate('/404', { replace: true });
    return null;
  }

  const getOrderStatus = (status) => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <FiPackage className="w-4 h-4" />
      },
      processing: {
        color: 'bg-blue-100 text-blue-800',
        icon: <FiPackage className="w-4 h-4" />
      },
      shipped: {
        color: 'bg-green-100 text-green-800',
        icon: <FiPackage className="w-4 h-4" />
      },
      delivered: {
        color: 'bg-green-100 text-green-800',
        icon: <FiPackage className="w-4 h-4" />
      },
      cancelled: {
        color: 'bg-red-100 text-red-800',
        icon: <FiPackage className="w-4 h-4" />
      },
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800',
      icon: <FiPackage className="w-4 h-4" />
    };

    const statusTranslations = {
      pending: t('pending'),
      processing: t('processing'),
      shipped: t('shipped'),
      delivered: t('delivered'),
      cancelled: t('cancelled'),
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon}
        <span className="ml-2">{statusTranslations[status] || status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">{t('orderHistory')}</h1>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FiShoppingBag className="w-16 h-16 text-[#C585D7] mx-auto mb-6" />
            <p className="text-[#6A6A6A] text-xl mb-8">{t('noOrders')}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#C585D7] text-white px-8 py-3 rounded-full hover:bg-[#008080] transition-colors"
            >
              {t('startShopping')}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                        {t('order')} #{order.orderNumber}
                      </h2>
                      <p className="text-[#6A6A6A] mt-1">
                        {t('placedOn')} {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {getOrderStatus(order.status)}
                  </div>

                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-6 py-6 border-t border-gray-100"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        <div className="flex-grow">
                          <h3 className="text-xl font-medium text-[#2F2F2F]">{item.name}</h3>
                          <p className="text-[#6A6A6A] mt-1">
                            {t('quantity')}: {item.quantity}
                          </p>
                        </div>
                        <p className="text-xl font-semibold text-[#C585D7]">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 mt-6 pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#6A6A6A]">{t('totalAmount')}</p>
                        <p className="text-2xl font-semibold text-[#2F2F2F]">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/order/${order.id}`)}
                        className="text-[#C585D7] hover:text-[#008080] font-medium transition-colors"
                      >
                        {t('viewDetails')}
                      </button>
                    </div>
                  </div>
                </div>

                {order.status === 'delivered' && (
                  <div className="bg-[#FAF3EC] px-8 py-4">
                    <button
                      onClick={() => navigate(`/review/${order.id}`)}
                      className="inline-flex items-center text-[#C585D7] hover:text-[#008080] font-medium transition-colors"
                    >
                      <FiStar className="w-5 h-5 mr-2" />
                      {t('writeReview')}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory; 