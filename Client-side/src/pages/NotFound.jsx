import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#FFF9F6]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-[#C585D7]">404</h1>
        <div className="mt-4">
          <h2 className="text-3xl font-semibold text-[#2F2F2F] mb-3">Page Not Found</h2>
          <p className="text-[#6A6A6A] mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="block w-full md:inline md:w-auto px-6 py-3 bg-transparent border-2 border-[#C585D7] text-[#C585D7] rounded-full hover:bg-[#C585D7] hover:text-white transition-colors md:mr-4"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="block w-full md:inline md:w-auto px-6 py-3 bg-[#C585D7] text-white rounded-full hover:bg-[#008080] transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="mt-12 text-[#C585D7]">
          <div className="inline-block transform rotate-45">
            <span className="block w-8 h-1 bg-current mb-2"></span>
            <span className="block w-8 h-1 bg-current"></span>
          </div>
          <div className="inline-block mx-6">
            <span className="block w-2 h-2 bg-current mb-2"></span>
            <span className="block w-2 h-2 bg-current"></span>
          </div>
          <div className="inline-block transform -rotate-45">
            <span className="block w-8 h-1 bg-current mb-2"></span>
            <span className="block w-8 h-1 bg-current"></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound; 