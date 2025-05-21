import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  const iconClasses = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`${typeClasses[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-[200px]`}
      >
        <span className="font-bold">{iconClasses[type]}</span>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-white hover:text-gray-200 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast; 