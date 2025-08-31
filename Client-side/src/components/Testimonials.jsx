import React, { useEffect, useState } from 'react';
// removed framer-motion (not required for simple hover effect)
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
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);


  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const resp = await reviewService.getRecentReviews(3);
        if (mounted) {
          if (resp && resp.reviews && resp.reviews.length > 0) {
            // Map to the expected shape
            setTestimonials(resp.reviews.map(r => ({
              id: r._id,
              name: r.user?.name || 'User',
              role: r.product?.name || '',
              text: r.comment || '',
              rating: r.rating || 5
            })));
          } else {
            // No reviews returned — use fallback static testimonials
            setTestimonials(fallbackTestimonials);
          }
        }
      } catch (e) {
        // fail silently for now; you may want a toast later
        if (mounted) setTestimonials(fallbackTestimonials);
        console.debug('Failed to load testimonials', e);
      }
    };

    load();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-16 bg-[#FAF3EC]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">{t('testimonialsHeader')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-150 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4 text-lg font-semibold text-gray-700">
                  {testimonial.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">{testimonial.name}</h3>
                  <p className="text-[#6A6A6A]">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6A6A6A] italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 