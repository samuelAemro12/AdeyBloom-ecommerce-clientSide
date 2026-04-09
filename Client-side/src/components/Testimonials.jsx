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
    text: 'Absolutely love the texture and scent — my skin feels amazing after every use!',
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
    text: 'My go-to products for daily care — gentle and incredibly effective.',
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
    return () => { mounted = false; };
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
    <section className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-3">
            Real Stories
          </p>
          <h2 className="section-heading">{t('testimonialsHeader')}</h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-sm border border-cloud-gray/40 p-8 sm:p-10"
            >
              {/* Top accent bar */}
              <div className="w-12 h-1 bg-primary-accent rounded-full mb-7" />

              {/* Quote */}
              <p className="text-primary-text text-base sm:text-lg leading-relaxed italic mb-8">
                &ldquo;{active.text}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-secondary-accent flex items-center justify-center text-primary-accent font-bold text-base shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-primary-text text-sm">{active.name}</p>
                  <p className="text-xs text-secondary-text">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                aria-label="Previous testimonial"
                onClick={prev}
                className="absolute -left-5 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-cloud-gray shadow-sm flex items-center justify-center hover:border-primary-accent hover:text-primary-accent transition-colors duration-200"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="Next testimonial"
                onClick={next}
                className="absolute -right-5 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-cloud-gray shadow-sm flex items-center justify-center hover:border-primary-accent hover:text-primary-accent transition-colors duration-200"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className="flex justify-center gap-2 mt-7">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === current ? 'w-6 h-2 bg-primary-accent' : 'w-2 h-2 bg-cloud-gray hover:bg-secondary-accent'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
