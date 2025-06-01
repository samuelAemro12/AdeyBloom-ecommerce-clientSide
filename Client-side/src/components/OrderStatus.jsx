import React, { useState } from 'react';
import { orderService } from '../services/orderService';
import Toast from './Toast';

const OrderStatus = ({ orderId, currentStatus, onStatusUpdate }) => {
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    setError(null);

    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setStatus(newStatus);
      onStatusUpdate(newStatus);
    } catch (err) {
      setError('Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={updating}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {updating && (
        <span className="text-sm text-gray-600">Updating...</span>
      )}
      {error && <Toast message={error} type="error" />}
    </div>
  );
};

export default OrderStatus; 