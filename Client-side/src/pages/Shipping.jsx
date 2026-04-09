import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiTruck, FiClock, FiMapPin, FiPackage, FiArrowRight } from 'react-icons/fi';

const Shipping = () => {
  const { t } = useTranslation();

  const shippingOptions = [
    { icon: FiTruck, key: 'standardShipping' },
    { icon: FiClock, key: 'expressShipping' },
    { icon: FiMapPin, key: 'localPickup' },
  ];

  const steps = [
    { step: 1, key: 'orderPlaced', icon: FiPackage },
    { step: 2, key: 'orderProcessed', icon: FiClock },
    { step: 3, key: 'orderShipped', icon: FiTruck },
    { step: 4, key: 'orderDelivered', icon: FiMapPin },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary-text relative overflow-hidden py-20">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-brand-highlight/20 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-4">Delivery</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-5">{t('shippingInformation')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{t('shippingDescription')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Shipping Options */}
        <section>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-3">Options</p>
            <h2 className="section-heading">{t('shippingOptions')}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {shippingOptions.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-cloud-gray/50 p-6 hover:border-primary-accent/40 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-accent flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary-accent" />
                </div>
                <h3 className="font-semibold text-primary-text mb-3">{t(key)}</h3>
                <p className="text-secondary-text text-sm leading-relaxed mb-4">{t(`${key}Desc`)}</p>
                <div className="pt-4 border-t border-cloud-gray/40 space-y-1">
                  <p className="text-xs text-secondary-text">
                    <span className="font-medium text-primary-text">{t('deliveryTime')}:</span> {t(`${key}Time`)}
                  </p>
                  <p className="text-xs text-secondary-text">
                    <span className="font-medium text-primary-text">{t('cost')}:</span> {t(`${key}Cost`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-3">How it works</p>
            <h2 className="section-heading">{t('shippingProcess')}</h2>
          </div>
          <div className="grid sm:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-cloud-gray/50" />
            {steps.map(({ step, key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-primary-accent flex items-center justify-center mx-auto mb-4 relative z-10 shadow-sm">
                  <span className="text-white font-bold text-sm">{step}</span>
                </div>
                <h3 className="font-semibold text-primary-text text-sm mb-2">{t(key)}</h3>
                <p className="text-secondary-text text-xs leading-relaxed">{t(`${key}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section>
          <div className="bg-white rounded-2xl border border-cloud-gray/50 p-8 sm:p-10">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-3">Policies</p>
              <h2 className="section-heading">{t('shippingPolicies')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-7">
              {[
                { titleKey: 'freeShipping', descKey: 'freeShippingPolicy' },
                { titleKey: 'trackingOrders', descKey: 'trackingOrdersDesc' },
                { titleKey: 'deliveryAreas', descKey: 'deliveryAreasDesc' },
                { titleKey: 'shippingRestrictions', descKey: 'shippingRestrictionsDesc' },
              ].map(({ titleKey, descKey }) => (
                <div key={titleKey}>
                  <h3 className="font-semibold text-primary-text mb-2 text-sm">{t(titleKey)}</h3>
                  <p className="text-secondary-text text-xs leading-relaxed">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <div className="text-center">
          <p className="text-xl font-serif font-bold text-primary-text mb-2">{t('needHelp')}</p>
          <p className="text-secondary-text text-sm mb-6">{t('shippingHelpText')}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 btn-primary">
            {t('contactUs')}
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
