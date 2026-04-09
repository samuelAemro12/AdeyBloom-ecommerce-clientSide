import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiHeart, FiShield, FiStar, FiUsers, FiArrowRight } from 'react-icons/fi';

const VALUES = [
  { icon: FiHeart, key: 'naturalIngredients' },
  { icon: FiShield, key: 'qualityAssurance' },
  { icon: FiStar, key: 'customerSatisfaction' },
  { icon: FiUsers, key: 'community' },
];

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary-text relative overflow-hidden py-24">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-brand-highlight/15 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-4">Our Story</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {t('aboutUs')}
            </h1>
            <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
              {t('aboutUsDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-3">What drives us</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-text mb-6 leading-tight">
                {t('ourMission')}
              </h2>
              <p className="text-secondary-text text-sm leading-relaxed mb-4">{t('missionDescription')}</p>
              <p className="text-secondary-text text-sm leading-relaxed">{t('missionDescription2')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-primary-text rounded-2xl p-10 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-accent/20 rounded-full blur-2xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-4">Vision</p>
                <h3 className="text-2xl font-serif font-bold mb-4 leading-snug">{t('ourVision')}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{t('visionDescription')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-3">Principles</p>
            <h2 className="section-heading mb-4">{t('ourValues')}</h2>
            <p className="text-secondary-text text-sm max-w-xl mx-auto">{t('valuesDescription')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, key }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-cloud-gray/50 hover:border-primary-accent/40 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary-accent flex items-center justify-center mb-4 group-hover:bg-primary-accent/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary-accent" />
                </div>
                <h3 className="font-semibold text-primary-text mb-2 text-sm">{t(key)}</h3>
                <p className="text-secondary-text text-xs leading-relaxed">{t(`${key}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-text relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary-accent/20 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-5">{t('joinOurJourney')}</h2>
            <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto">{t('joinJourneyDescription')}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-accent hover:bg-brand-highlight text-white rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            >
              {t('exploreProducts')}
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
