import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { contactService } from '../services/contactService';

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', type: '' });
    try {
      const response = await contactService.submitContact(formData);
      if (response.success) {
        setFeedback({ message: response.message || 'Message sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFeedback({ message: response.message || 'Failed to send message. Please try again.', type: 'error' });
      }
    } catch (error) {
      setFeedback({ message: error.response?.data?.message || 'Failed to send message. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, title: t('email'), value: 'samuelaemrowork12@gmail.com', desc: t('emailDescription') },
    { icon: FiPhone, title: t('phone'), value: '+251-902-329-031', desc: t('phoneDescription') },
    { icon: FiMapPin, title: t('address'), value: 'Addis Ababa, Ethiopia', desc: t('addressDescription') },
    { icon: FiClock, title: t('businessHours'), value: 'Mon – Fri: 9AM – 6PM', desc: t('businessHoursDescription') },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary-text relative overflow-hidden py-20">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-accent/20 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-4">Get in Touch</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-5">{t('contactUs')}</h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">{t('contactUsDescription')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl border border-cloud-gray/50 shadow-sm p-8"
          >
            <h2 className="text-xl font-serif font-bold text-primary-text mb-6">{t('sendMessage')}</h2>

            {feedback.message && (
              <div className={`mb-5 px-4 py-3 rounded-xl text-sm ${
                feedback.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1.5">{t('fullName')}</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field" placeholder={t('fullNamePlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1.5">{t('email')}</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-field" placeholder={t('emailPlaceholder')} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1.5">{t('subject')}</label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="input-field" placeholder={t('subjectPlaceholder')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1.5">{t('message')}</label>
                <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="input-field resize-none" placeholder={t('messagePlaceholder')} />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary-accent hover:bg-brand-highlight text-white rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60"
              >
                <FiSend className="w-4 h-4" />
                {isSubmitting ? t('sending') : t('sendMessage')}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-serif font-bold text-primary-text mb-3">{t('getInTouch')}</h2>
              <p className="text-secondary-text text-sm leading-relaxed">{t('getInTouchDescription')}</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, title, value, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl border border-cloud-gray/50 p-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary-accent flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary-text mb-0.5">{title}</p>
                    <p className="text-sm font-semibold text-primary-text mb-0.5">{value}</p>
                    <p className="text-xs text-secondary-text">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-cloud-gray/50 h-48 flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="w-8 h-8 text-cloud-gray mx-auto mb-2" />
                <p className="text-sm text-secondary-text">{t('mapPlaceholder')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
