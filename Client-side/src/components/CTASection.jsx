import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const CTASection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-[#C585D7]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('discoverBeauty')}
        </h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          {t('joinThousands')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#C585D7] hover:bg-[#008080] hover:text-white rounded-full transition-colors duration-300"
          >
            {t('shopNow')}
            <FiArrowRight className="ml-2" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#C585D7] rounded-full transition-colors duration-300"
          >
            {t('learnMore')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 