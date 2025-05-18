import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // For testing, we'll use mock data
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    navigate('/signin');
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const getOrderStatus = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      statusColors[status] || 'bg-gray-100 text-gray-800'
    }`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Order #{order.orderNumber}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={getOrderStatus(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 py-4 border-t"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-lg font-semibold">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/order/${order.id}`)}
                        className="text-pink-600 hover:text-pink-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {order.status === 'delivered' && (
                  <div className="bg-gray-50 px-6 py-4">
                    <button
                      onClick={() => navigate(`/review/${order.id}`)}
                      className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                    >
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory; 