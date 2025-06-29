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
      question: '🛍️ How do I place an order on AdeyBloom?',
      answer: 'You can browse beauty and self-care products, add them to your cart, and proceed to checkout. You\'ll be prompted to log in or register before finalizing your purchase.'
    },
    {
      id: 'faq-2',
      question: '💳 What payment methods do you support?',
      answer: 'We currently support integration with international payment systems like Stripe for demonstration purposes.'
    },
    {
      id: 'faq-3',
      question: '🌐 Can I view prices in different currencies?',
      answer: 'Yes. AdeyBloom supports multi-currency display. You can switch between ETB, USD, and EUR using the currency selector in the top navigation bar.'
    },
    {
      id: 'faq-4',
      question: '🌍 Is the website available in Amharic?',
      answer: 'Absolutely. You can toggle between English and Amharic using the language switcher in the navigation bar. The content is dynamically translated using the Google Translate API.'
    },
    {
      id: 'faq-5',
      question: '📦 How can I track my order?',
      answer: 'Once your order is placed, you\'ll receive a confirmation and a reference ID. You can view your order history and status under the "My Orders" section in your account.'
    },
    {
      id: 'faq-6',
      question: '💰 What is your refund policy?',
      answer: 'You can request a refund within 7 days of delivery if the product is defective or unopened. Refunds are manually handled during demo scenarios.'
    },
    {
      id: 'faq-7',
      question: '📝 Do I need an account to shop on AdeyBloom?',
      answer: 'Yes, an account is required to place orders, manage your cart and wishlist, and view your order history.'
    },
    {
      id: 'faq-8',
      question: '🛒 What is the Wishlist feature for?',
      answer: 'The wishlist allows you to save products you\'re interested in for later. You can access it anytime from your profile or the navigation bar.'
    },
    {
      id: 'faq-9',
      question: '🧾 Will I receive an order receipt or confirmation?',
      answer: 'Yes, after placing an order, a confirmation message is displayed, and a receipt is stored under your order history.'
    },
    {
      id: 'faq-10',
      question: '🧠 What makes AdeyBloom different from other beauty stores?',
      answer: 'AdeyBloom is culturally aware, built for Ethiopian users, supports Amharic language, local payment systems, and uses a modern, minimal, mobile-first design for accessibility and responsiveness.'
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
            🛍️ AdeyBloom – Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about shopping on AdeyBloom
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
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Contact our support team.
          </p>
          <motion.button
            className="bg-primary-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ; 