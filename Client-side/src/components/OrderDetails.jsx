import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
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
        const data = await orderService.getOrderDetails(orderId);
        setOrder(data);
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
      await orderService.cancelOrder(orderId);
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Information</h3>
              <p className="text-gray-600">Order ID: {order._id}</p>
              <p className="text-gray-600">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Status: {order.status}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <p className="text-gray-600">{order.shippingAddress.street}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-600">Tax</p>
                <p className="font-semibold text-lg mt-2">Total</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">${order.subtotal.toFixed(2)}</p>
                <p className="text-gray-600">${order.shippingCost.toFixed(2)}</p>
                <p className="text-gray-600">${order.tax.toFixed(2)}</p>
                <p className="font-semibold text-lg mt-2">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {order.status === 'pending' && (
            <div className="mt-8 flex justify-end">
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
  );
};

export default OrderDetails; 