import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Toast from './Toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    setCancelling(true);
    try {
      await axios.patch(`/api/orders/${orderId}/cancel`);
      setOrder({ ...order, status: 'cancelled' });
      setCancelling(false);
    } catch (err) {
      setError('Failed to cancel order. Please try again later.');
      setCancelling(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Toast message={error} type="error" />;
  if (!order) return <Toast message="Order not found" type="error" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={() => navigate('/orders')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Orders
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                Order #{order._id.slice(-6)}
              </h3>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'delivered'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            <p className="text-gray-600 mb-4">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
              <br />
              {order.shippingAddress.country}
            </p>

            <h4 className="font-semibold mb-2">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium">{item.product.name}</h5>
                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-600">Tax</p>
                  <p className="font-semibold text-lg">Total</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">
                    ${order.subtotal.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    ${order.shippingCost.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    ${order.tax.toFixed(2)}
                  </p>
                  <p className="font-semibold text-lg">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {order.status === 'pending' && (
              <div className="mt-6 text-right">
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 