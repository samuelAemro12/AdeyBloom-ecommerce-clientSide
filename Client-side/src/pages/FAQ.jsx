import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const FAQ = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const faqData = [
    { id: 'faq-1', question: t('faqHowToPlaceOrder'), answer: t('faqHowToPlaceOrderAnswer') },
    { id: 'faq-2', question: t('faqPaymentMethods'), answer: t('faqPaymentMethodsAnswer') },
    { id: 'faq-3', question: t('faqAmharicSupport'), answer: t('faqAmharicSupportAnswer') },
    { id: 'faq-5', question: t('faqNeedAccount'), answer: t('faqNeedAccountAnswer') },
    { id: 'faq-6', question: t('faqWishlistFeature'), answer: t('faqWishlistFeatureAnswer') },
    { id: 'faq-7', question: t('faqWhatMakesAdeyBloomDifferent'), answer: t('faqWhatMakesAdeyBloomDifferentAnswer') },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary-text relative overflow-hidden py-20">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-primary-accent/20 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-4">Help Center</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-5">
              {t('frequentlyAskedQuestions')}
            </h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{t('faqDescription')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="bg-white rounded-2xl border border-cloud-gray/50 overflow-hidden"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-background transition-colors duration-200"
              >
                <span className="font-semibold text-primary-text text-sm pr-6">{item.question}</span>
                <FiChevronDown
                  className={`w-5 h-5 text-secondary-text shrink-0 transition-transform duration-300 ${openId === item.id ? 'rotate-180 text-primary-accent' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t border-cloud-gray/40">
                      <p className="text-secondary-text text-sm leading-relaxed pt-4">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center bg-white rounded-2xl border border-cloud-gray/50 p-10"
        >
          <p className="text-2xl font-serif font-bold text-primary-text mb-3">{t('stillHaveQuestions')}</p>
          <p className="text-sm text-secondary-text mb-6">{t('contactUsForHelp')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 btn-primary"
          >
            {t('contactUs')}
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
