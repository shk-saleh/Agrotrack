import React from 'react'
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import FeaturesSection from '../Components/FeaturesSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import CTASection from '../Components/CTASection';
import FooterSection from '../Components/FooterSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

export default HomePage