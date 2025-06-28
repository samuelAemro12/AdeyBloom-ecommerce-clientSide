import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';

const TrackOrder = () => {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock order status - in real app, this would come from API
      setOrderStatus({
        orderNumber: trackingNumber,
        status: 'shipped',
        estimatedDelivery: '2024-01-20',
        trackingNumber: 'TRK' + trackingNumber,
        steps: [
          { step: 'ordered', completed: true, date: '2024-01-15', title: t('orderPlaced') },
          { step: 'processing', completed: true, date: '2024-01-16', title: t('orderProcessed') },
          { step: 'shipped', completed: true, date: '2024-01-17', title: t('orderShipped') },
          { step: 'delivered', completed: false, date: null, title: t('orderDelivered') }
        ]
      });
      setIsSearching(false);
    }, 2000);
  };

  const getStatusIcon = (step) => {
    if (step.completed) {
      return <FiCheckCircle className="w-6 h-6 text-green-500" />;
    }
    if (step.step === 'shipped') {
      return <FiTruck className="w-6 h-6 text-blue-500" />;
    }
    return <FiClock className="w-6 h-6 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('trackOrder')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('trackOrderDescription')}
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                {t('orderNumberOrTracking')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder={t('enterOrderNumber')}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  required
                />
                <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isSearching || !trackingNumber.trim()}
              className="w-full bg-primary-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSearching ? t('searching') : t('trackOrder')}
            </motion.button>
          </form>
        </motion.div>

        {/* Order Status */}
        {orderStatus && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('orderStatus')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">{t('orderNumber')}</p>
                  <p className="font-semibold text-gray-900">{orderStatus.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('trackingNumber')}</p>
                  <p className="font-semibold text-gray-900">{orderStatus.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('status')}</p>
                  <p className="font-semibold text-primary-accent capitalize">{orderStatus.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('estimatedDelivery')}</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(orderStatus.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {t('orderProgress')}
              </h3>
              <div className="space-y-6">
                {orderStatus.steps.map((step, index) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {step.title}
                      </h4>
                      {step.completed && step.date && (
                        <p className="text-sm text-gray-600">
                          {new Date(step.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('needHelpTracking')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('trackingHelpText')}
          </p>
          <motion.button
            className="bg-primary-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/contact'}
          >
            {t('contactUs')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrder; 