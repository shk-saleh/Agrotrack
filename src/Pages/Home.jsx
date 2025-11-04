import React from 'react'
import HeroSection from '../Components/HeroSection'
import WhatWeOfferSection from '../Components/WhatWeOfferSection'
import WhyChooseSection from '../Components/WhyChooseSection'
import TestimonialsSection from '../Components/TestimonialsSection'
import FAQSection from '../Components/FAQSection'
import CTASection from '../Components/CTASection'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection/>
      <WhyChooseSection/>
      <WhatWeOfferSection/>
      <TestimonialsSection/>
      <FAQSection/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default HomePage