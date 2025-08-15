import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const FAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 'faq-1',
      question: t('faqHowToPlaceOrder'),
      answer: t('faqHowToPlaceOrderAnswer')
    },
    {
      id: 'faq-2',
      question: t('faqPaymentMethods'),
      answer: t('faqPaymentMethodsAnswer')
    },
    {
      id: 'faq-3',
      question: t('faqAmharicSupport'),
      answer: t('faqAmharicSupportAnswer')
    },
  // refund policy FAQ removed
    {
      id: 'faq-5',
      question: t('faqNeedAccount'),
      answer: t('faqNeedAccountAnswer')
    },
    {
      id: 'faq-6',
      question: t('faqWishlistFeature'),
      answer: t('faqWishlistFeatureAnswer')
    },
    {
      id: 'faq-7',
      question: t('faqWhatMakesAdeyBloomDifferent'),
      answer: t('faqWhatMakesAdeyBloomDifferentAnswer')
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
            🛍️ AdeyBloom – {t('frequentlyAskedQuestions')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('faqDescription')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900 pr-4 text-lg">
                  {item.question}
                </span>
                {openItems[item.id] ? (
                  <FiChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                ) : (
                  <FiChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
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
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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