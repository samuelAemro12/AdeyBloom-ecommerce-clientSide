import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      {/* this is the importing of the testimonial carousal */}
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default HomePage; 