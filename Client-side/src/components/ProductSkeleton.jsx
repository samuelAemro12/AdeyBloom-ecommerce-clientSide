import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <motion.div 
      className="bg-card-bg rounded-xl p-4 shadow-sm border border-cloud-gray/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="bg-cloud-gray/40 rounded-lg h-48 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
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