import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiTruck, FiClock, FiMapPin, FiPackage } from 'react-icons/fi';

const Shipping = () => {
  const { t } = useTranslation();

  const shippingInfo = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: t('standardShipping'),
      description: t('standardShippingDesc'),
      time: t('standardShippingTime'),
      cost: t('standardShippingCost')
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: t('expressShipping'),
      description: t('expressShippingDesc'),
      time: t('expressShippingTime'),
      cost: t('expressShippingCost')
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: t('localPickup'),
      description: t('localPickupDesc'),
      time: t('localPickupTime'),
      cost: t('localPickupCost')
    }
  ];

  const shippingSteps = [
    {
      step: 1,
      title: t('orderPlaced'),
      description: t('orderPlacedDesc')
    },
    {
      step: 2,
      title: t('orderProcessed'),
      description: t('orderProcessedDesc')
    },
    {
      step: 3,
      title: t('orderShipped'),
      description: t('orderShippedDesc')
    },
    {
      step: 4,
      title: t('orderDelivered'),
      description: t('orderDeliveredDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('shippingInformation')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('shippingDescription')}
          </p>
        </motion.div>

        {/* Shipping Options */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('shippingOptions')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {shippingInfo.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="text-primary-accent mb-4">{option.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {option.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">{t('deliveryTime')}:</span> {option.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">{t('cost')}:</span> {option.cost}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Shipping Process */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t('shippingProcess')}
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {shippingSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="bg-primary-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Shipping Policies */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {t('shippingPolicies')}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('freeShipping')}
                </h3>
                <p className="text-gray-600">
                  {t('freeShippingPolicy')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('trackingOrders')}
                </h3>
                <p className="text-gray-600">
                  {t('trackingOrdersDesc')}
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('deliveryAreas')}
                </h3>
                <p className="text-gray-600">
                  {t('deliveryAreasDesc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('shippingRestrictions')}
                </h3>
                <p className="text-gray-600">
                  {t('shippingRestrictionsDesc')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('needHelp')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('shippingHelpText')}
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

export default Shipping; 