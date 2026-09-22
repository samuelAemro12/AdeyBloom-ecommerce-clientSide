import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const SalesChart = ({ data = [] }) => {
  // data expected: [{ _id: 'YYYY-MM-DD', totalSales: Number }, ...]
  const chartData = (data || []).map(d => ({ date: d._id, sales: d.totalSales || 0 }));

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales (last 7 days)</h2>
      {chartData.length === 0 ? (
        <div className="py-6 flex items-center justify-center">
          <p className="text-sm text-gray-500">No sales data available.</p>
        </div>
      ) : (
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v} />
              <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
              <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SalesChart;