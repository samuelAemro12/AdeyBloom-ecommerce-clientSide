import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      title: t('generalQuestions'),
      items: [
        {
          id: 'general-1',
          question: t('whatIsAdeyBloom'),
          answer: t('whatIsAdeyBloomAnswer')
        },
        {
          id: 'general-2',
          question: t('areProductsNatural'),
          answer: t('areProductsNaturalAnswer')
        },
        {
          id: 'general-3',
          question: t('doYouShipInternationally'),
          answer: t('doYouShipInternationallyAnswer')
        }
      ]
    },
    {
      title: t('orderingQuestions'),
      items: [
        {
          id: 'ordering-1',
          question: t('howToPlaceOrder'),
          answer: t('howToPlaceOrderAnswer')
        },
        {
          id: 'ordering-2',
          question: t('paymentMethods'),
          answer: t('paymentMethodsAnswer')
        },
        {
          id: 'ordering-3',
          question: t('orderConfirmation'),
          answer: t('orderConfirmationAnswer')
        },
        {
          id: 'ordering-4',
          question: t('trackOrder'),
          answer: t('trackOrderAnswer')
        }
      ]
    },
    {
      title: t('shippingQuestions'),
      items: [
        {
          id: 'shipping-1',
          question: t('shippingTime'),
          answer: t('shippingTimeAnswer')
        },
        {
          id: 'shipping-2',
          question: t('shippingCost'),
          answer: t('shippingCostAnswer')
        },
        {
          id: 'shipping-3',
          question: t('freeShipping'),
          answer: t('freeShippingAnswer')
        }
      ]
    },
    {
      title: t('returnsQuestions'),
      items: [
        {
          id: 'returns-1',
          question: t('returnPolicy'),
          answer: t('returnPolicyAnswer')
        },
        {
          id: 'returns-2',
          question: t('howToReturn'),
          answer: t('howToReturnAnswer')
        },
        {
          id: 'returns-3',
          question: t('refundTime'),
          answer: t('refundTimeAnswer')
        }
      ]
    },
    {
      title: t('productQuestions'),
      items: [
        {
          id: 'product-1',
          question: t('productExpiry'),
          answer: t('productExpiryAnswer')
        },
        {
          id: 'product-2',
          question: t('ingredientsList'),
          answer: t('ingredientsListAnswer')
        },
        {
          id: 'product-3',
          question: t('skinTypeRecommendation'),
          answer: t('skinTypeRecommendationAnswer')
        }
      ]
    }
  ];

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
            {t('frequentlyAskedQuestions')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('faqDescription')}
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {item.question}
                      </span>
                      {openItems[item.id] ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {openItems[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-white border-t border-gray-200">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('stillHaveQuestions')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('contactUsForHelp')}
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

export default FAQ; 