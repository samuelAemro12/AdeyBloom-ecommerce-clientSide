import React from 'react';

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
      <div className="h-64 flex items-end space-x-2">
        {data?.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
            />
            <span className="text-xs text-gray-600 mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;