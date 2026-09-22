import React from 'react';

const TopProducts = ({ items = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h2>
      {items.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-gray-500">No product sales yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it, idx) => (
            <li key={it._id || idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
                  {it.productDetails?.name?.charAt(0) || '?'}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate">{it.productDetails?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500">Sold: {it.totalQuantity}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">{it.productDetails?.price ? `ETB ${it.productDetails.price}` : ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopProducts;
