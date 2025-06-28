import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      id: 1,
      name: t('testimonialName1'),
      role: t('testimonialRole1'),
      image: '/src/assets/1111.jpeg',
      text: t('testimonialText1'),
      rating: 5,
    },
    {
      id: 2,
      name: t('testimonialName2'),
      role: t('testimonialRole2'),
      image: '/src/assets/2222.jpeg',
      text: t('testimonialText2'),
      rating: 5,
    },
    {
      id: 3,
      name: t('testimonialName3'),
      role: t('testimonialRole3'),
      image: '/src/assets/3333.jpeg',
      text: t('testimonialText3'),
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-[#FAF3EC]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">{t('testimonialsHeader')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">{testimonial.name}</h3>
                  <p className="text-[#6A6A6A]">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6A6A6A] italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 