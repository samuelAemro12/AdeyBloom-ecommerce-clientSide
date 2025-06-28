import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiHeart, FiShield, FiStar, FiUsers } from 'react-icons/fi';

const AboutUs = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: t('naturalIngredients'),
      description: t('naturalIngredientsDesc')
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: t('qualityAssurance'),
      description: t('qualityAssuranceDesc')
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: t('customerSatisfaction'),
      description: t('customerSatisfactionDesc')
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: t('community'),
      description: t('communityDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('aboutUs')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('aboutUsDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('ourMission')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('missionDescription')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('missionDescription2')}
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('ourVision')}</h3>
                <p className="text-lg leading-relaxed">
                  {t('visionDescription')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('ourValues')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('valuesDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary-accent mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-accent to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('joinOurJourney')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('joinJourneyDescription')}
            </p>
            <motion.button
              className="bg-white text-primary-accent px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/products'}
            >
              {t('exploreProducts')}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 