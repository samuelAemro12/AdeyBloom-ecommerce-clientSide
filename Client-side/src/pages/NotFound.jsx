import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-pink-600">404</h1>
        <div className="mt-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="block w-full md:inline md:w-auto px-6 py-3 bg-transparent border-2 border-pink-600 text-pink-600 rounded-md hover:bg-pink-50 transition-colors md:mr-4"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="block w-full md:inline md:w-auto px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="mt-12 text-gray-400">
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
      </div>
    </div>
  );
};

export default NotFound; 