import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-primary-text px-6 py-16 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(197,133,215,0.26),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(0,128,128,0.24),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,0.04),_transparent_50%)] pointer-events-none" />
          <div className="absolute -top-18 right-10 h-44 w-44 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-12 left-12 h-32 w-32 rounded-full bg-secondary-accent/12 blur-2xl pointer-events-none" />

          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-kicker mb-5 !bg-white/8 !text-secondary-accent !border-white/12">
                Start Your Journey
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
                {t('discoverBeauty')}
              </h2>
              <p className="text-white/72 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('joinThousands')}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {['Botanical blends', 'Skin-first formulas', 'Made to feel luxurious'].map((item) => (
                  <span key={item} className="glass-pill !bg-white/8 !border-white/12 text-white/82 text-xs">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-accent hover:bg-brand-highlight text-white rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-[0_18px_36px_-18px_rgba(197,133,215,0.95)]"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  {t('shopNow')}
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/18 text-white rounded-full font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
