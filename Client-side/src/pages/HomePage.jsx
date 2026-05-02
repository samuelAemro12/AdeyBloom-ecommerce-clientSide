import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div className="landing-shell">
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default HomePage; 
