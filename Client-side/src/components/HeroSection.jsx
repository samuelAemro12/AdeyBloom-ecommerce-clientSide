import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HeroSection1 from '../assets/hero section 1.png';
import HeroSection2 from '../assets/hero section.png';
import HeroSection3 from '../assets/hero section (3).png';
import HeroSection4 from '../assets/hero section (1).png';
import { useTranslation } from '../context/TranslationContext';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  // Move slides array inside the render so it updates with language
  const slides = [
    {
      image: HeroSection1,
      title: t('heroTitle1'),
      subtitle: t('heroSubtitle1'),
      cta: t('heroCTA1'),
      accent: 'primary-accent',
    },
    {
      image: HeroSection2,
      title: t('heroTitle2'),
      subtitle: t('heroSubtitle2'),
      cta: t('heroCTA2'),
      accent: 'secondary-accent',
    },
    {
      image: HeroSection3,
      title: t('heroTitle3'),
      subtitle: t('heroSubtitle3'),
      cta: t('heroCTA3'),
      accent: 'brand-highlight',
    },
    {
      image: HeroSection4,
      title: t('heroTitle4'),
      subtitle: t('heroSubtitle4'),
      cta: t('heroCTA4'),
      accent: 'primary-accent',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Increased to 6 seconds for better UX

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden bg-card-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Use an img tag with object-cover to avoid background-size scaling blur */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              decoding="sync"
              loading="eager"
              className="w-full h-full object-cover object-center"
              style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-5xl px-4 sm:px-6 lg:px-8">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link
                  to="/shop"
                  className={`inline-flex items-center px-8 py-4 bg-${slides[currentSlide].accent} hover:bg-brand-highlight text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold text-lg`}
                >
                  {slides[currentSlide].cta}
                  <FiArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-primary-text transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('previousSlide')}
      >
        <FiChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-primary-text transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('nextSlide')}
      >
        <FiChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={t('goToSlide').replace('{number}', index + 1)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default HeroSection; 