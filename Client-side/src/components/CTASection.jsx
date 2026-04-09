import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden bg-primary-text">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-highlight/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-4">
            Start Your Journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {t('discoverBeauty')}
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t('joinThousands')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-accent hover:bg-brand-highlight text-white rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <FiShoppingBag className="w-4 h-4" />
              {t('shopNow')}
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-sm hover:bg-white/10 transition-all duration-300"
            >
              {t('learnMore')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
