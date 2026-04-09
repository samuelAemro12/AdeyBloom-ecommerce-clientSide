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

  const slides = [
    { image: HeroSection1, title: t('heroTitle1'), subtitle: t('heroSubtitle1'), cta: t('heroCTA1') },
    { image: HeroSection2, title: t('heroTitle2'), subtitle: t('heroSubtitle2'), cta: t('heroCTA2') },
    { image: HeroSection3, title: t('heroTitle3'), subtitle: t('heroSubtitle3'), cta: t('heroCTA3') },
    { image: HeroSection4, title: t('heroTitle4'), subtitle: t('heroSubtitle4'), cta: t('heroCTA4') },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[75vh] min-h-[520px] max-h-[760px] overflow-hidden bg-card-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay — stronger on left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

          {/* Text Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
              <div className="max-w-2xl">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-primary-accent text-sm font-semibold uppercase tracking-widest mb-4"
                >
                  AdeyBloom Collection
                </motion.p>
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-5 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-base sm:text-lg text-white/80 mb-9 leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.7 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-accent hover:bg-brand-highlight text-white rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    {slides[currentSlide].cta}
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/40 text-white rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/15 hover:bg-white/30 border border-white/30 text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/15 hover:bg-white/30 border border-white/30 text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
        <motion.div
          className="h-full bg-primary-accent"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
