import React from 'react';

const TopProducts = ({ items = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No product sales yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it._id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{it.productDetails?.name || 'Unknown'}</p>
                <p className="text-xs text-gray-500">Sold: {it.totalQuantity}</p>
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
