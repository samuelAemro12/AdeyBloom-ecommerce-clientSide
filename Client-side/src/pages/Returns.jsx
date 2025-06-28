import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiRefreshCw, FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';

const Returns = () => {
  const { t } = useTranslation();

  const returnSteps = [
    {
      icon: <FiPackage className="w-8 h-8" />,
      title: t('initiateReturn'),
      description: t('initiateReturnDesc')
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: t('packageItem'),
      description: t('packageItemDesc')
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: t('shipReturn'),
      description: t('shipReturnDesc')
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: t('refundProcessed'),
      description: t('refundProcessedDesc')
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
            {t('returnsAndRefunds')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('returnsDescription')}
          </p>
        </motion.div>

        {/* Return Policy */}
        <section className="mb-16">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {t('returnPolicy')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('returnWindow')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('returnWindowDesc')}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>{t('returnCondition1')}</li>
                  <li>{t('returnCondition2')}</li>
                  <li>{t('returnCondition3')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('nonReturnable')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('nonReturnableDesc')}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>{t('nonReturnable1')}</li>
                  <li>{t('nonReturnable2')}</li>
                  <li>{t('nonReturnable3')}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Return Process */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('returnProcess')}
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="bg-primary-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{step.icon}</div>
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

        {/* Refund Information */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t('refundInformation')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('refundTime')}
              </h3>
              <p className="text-gray-600">
                {t('refundTimeDesc')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('refundMethod')}
              </h3>
              <p className="text-gray-600">
                {t('refundMethodDesc')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('partialRefunds')}
              </h3>
              <p className="text-gray-600">
                {t('partialRefundsDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('needHelpWithReturn')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('returnHelpText')}
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

export default Returns; 