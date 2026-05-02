import React, { useEffect, useState, useCallback } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { reviewService } from '../services/reviewService';

const fallbackTestimonials = [
  {
    id: 'static-1',
    name: 'Aisha Nguyen',
    role: 'Happy Customer',
    text: 'Absolutely love the texture and scent - my skin feels amazing after every use!',
    rating: 5,
  },
  {
    id: 'static-2',
    name: 'Michael Lee',
    role: 'Verified Buyer',
    text: 'Great quality and fast shipping. Will definitely buy again.',
    rating: 5,
  },
  {
    id: 'static-3',
    name: 'Sofia Patel',
    role: 'Long-time User',
    text: 'My go-to products for daily care - gentle and incredibly effective.',
    rating: 5,
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const resp = await reviewService.getRecentReviews();
        const reviewsArr = Array.isArray(resp?.reviews) ? resp.reviews : [];
        if (mounted) {
          setTestimonials(
            reviewsArr.length > 0
              ? reviewsArr.map((r) => ({
                  id: r._id || r.id,
                  name: r.user?.name || 'Anonymous',
                  role: r.product?.name || 'Verified Buyer',
                  text: r.comment || r.text || 'No comment provided.',
                  rating: 5,
                }))
              : fallbackTestimonials
          );
        }
      } catch {
        if (mounted) setTestimonials(fallbackTestimonials);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [total, next]);

  if (total === 0) return null;

  const active = testimonials[current];
  const initials = active.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <section className="relative py-24">
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-4 h-80 w-80 rounded-full bg-secondary-accent/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-frame px-5 py-14 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="section-kicker mb-4">Real Stories</p>
            <h2 className="section-heading mb-4">{t('testimonialsHeader')}</h2>
            <p className="section-copy max-w-2xl mx-auto">
              Rituals people come back to, textures they remember, and results that make the routine feel special.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_70px_-36px_rgba(47,47,47,0.4)] p-8 sm:p-10 md:p-12"
              >
                <div className="absolute right-8 top-7 text-[5rem] leading-none text-primary-accent/10 font-serif pointer-events-none">
                  "
                </div>

                <div className="glass-pill mb-7 text-xs font-semibold text-primary-accent">
                  5.0 community love
                </div>

                <p className="text-primary-text text-lg sm:text-[1.55rem] leading-relaxed italic mb-8 max-w-3xl">
                  &ldquo;{active.text}&rdquo;
                </p>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-secondary-accent flex items-center justify-center text-primary-accent font-bold text-lg shrink-0 shadow-inner">
                      {initials}
                    </div>
                    <div>
                      <p className="font-semibold text-primary-text text-base">{active.name}</p>
                      <p className="text-sm text-secondary-text">{active.role}</p>
                    </div>
                  </div>
                  <div className="glass-pill text-xs text-secondary-text">
                    Trusted by shoppers across Ethiopia
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  aria-label="Previous testimonial"
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-white shadow-sm flex items-center justify-center hover:border-primary-accent hover:text-primary-accent transition-colors duration-200 md:-left-5"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next testimonial"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-white shadow-sm flex items-center justify-center hover:border-primary-accent hover:text-primary-accent transition-colors duration-200 md:-right-5"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {total > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === current ? 'w-8 h-2.5 bg-primary-accent' : 'w-2.5 h-2.5 bg-cloud-gray/70 hover:bg-secondary-accent'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
