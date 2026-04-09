import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <motion.div 
      className="bg-white rounded-2xl border border-cloud-gray/50 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="bg-card-bg w-full" style={{ paddingBottom: '100%', position: 'relative' }}>
          <div className="absolute inset-0 bg-cloud-gray/30" />
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-3">
          {/* Title */}
          <div className="h-5 bg-cloud-gray/40 rounded w-3/4"></div>
          
          {/* Brand */}
          <div className="h-4 bg-cloud-gray/30 rounded w-1/2"></div>
          
          {/* Price */}
          <div className="h-6 bg-primary-accent/20 rounded w-1/3"></div>
          
          {/* Buttons */}
          <div className="flex space-x-2 pt-2">
            <div className="h-10 bg-primary-accent/20 rounded-lg flex-1"></div>
            <div className="h-10 w-10 bg-secondary-accent/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProductGridSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
    </div>
  );
};

export default ProductSkeleton; 