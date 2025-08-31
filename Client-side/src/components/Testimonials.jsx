import React, { useEffect, useState, useCallback } from 'react';
import { FiStar } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';
import { reviewService } from '../services/reviewService';

// Fallback testimonials (previous static version) used when backend has none or fetch fails
const fallbackTestimonials = [
  {
    id: 'static-1',
    name: 'Aisha Nguyen',
    role: 'Happy customer',
    text: 'Absolutely love the texture and scent — my skin feels amazing after every use!',
    rating: 5,
  },
  {
    id: 'static-2',
    name: 'Michael Lee',
    role: 'Verified buyer',
    text: 'Great quality and fast shipping. Will definitely buy again.',
    rating: 5,
  },
  {
    id: 'static-3',
    name: 'Sofia Patel',
    role: 'Long-time user',
    text: 'My go-to products for daily care — gentle and effective.',
    rating: 5,
  },
];

const Testimonials = () => {
  const { t: translate } = useTranslation(); // Renamed to avoid conflict
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // Fetch all reviews from backend by passing no limit
        const resp = await reviewService.getRecentReviews();
        const reviewsArr = Array.isArray(resp?.reviews) ? resp.reviews : [];

        if (mounted) {
          if (reviewsArr.length > 0) {
            setTestimonials(reviewsArr.map(r => ({
              id: r._id || r.id,
              name: r.user?.name || 'Anonymous',
              role: r.product?.name || 'Verified Buyer',
              text: r.comment || r.text || 'No comment provided.',
              rating: 5 // Always 5 stars as requested
            })));
          } else {
            setTestimonials(fallbackTestimonials);
          }
        }
      } catch (err) {
        if (mounted) {
          setTestimonials(fallbackTestimonials);
        }
        console.error('Failed to load testimonials:', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Carousel navigation
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [total, next]);

  if (total === 0) {
    return null; // Don't render anything if there are no testimonials to show
  }

  const activeTestimonial = testimonials[current];

  return (
    <section className="py-16 bg-[#FAF3EC]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-6">{translate('testimonialsHeader')}</h2>
        <div className="text-center mb-4 text-sm text-gray-600">Showing {total} testimonials</div>
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center min-h-[300px] transition-opacity duration-500 ease-in-out">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4 text-lg font-semibold text-gray-700">
                {activeTestimonial.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2F2F2F]">{activeTestimonial.name}</h3>
                <p className="text-[#6A6A6A]">{activeTestimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-[#6A6A6A] italic text-center">"{activeTestimonial.text}"</p>
          </div>

          {/* Controls */}
          {total > 1 && (
            <>
              <button
                aria-label="Previous testimonial"
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                aria-label="Next testimonial"
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-400' : 'bg-gray-300'} focus:outline-none transition-colors`}
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
 