import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: '/testimonial-1.jpg',
      text: 'The natural ingredients in these products have transformed my skincare routine. My skin has never looked better!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Emily Chen',
      role: 'Beauty Blogger',
      image: '/testimonial-2.jpg',
      text: 'As someone who reviews beauty products professionally, I can confidently say that AdeyBloom offers exceptional quality.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Loyal Customer',
      image: '/testimonial-3.jpg',
      text: 'The customer service is outstanding, and the products are worth every penny. I love how my skin feels after using them.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-[#FAF3EC]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">What Our Customers Say</h2>
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