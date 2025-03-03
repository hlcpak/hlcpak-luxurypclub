
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrandsCarousel from '@/components/BrandsCarousel';
import BenefitsSection from '@/components/BenefitsSection';
import FeaturedDeals from '@/components/FeaturedDeals';
import MembershipSection from '@/components/MembershipSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <BrandsCarousel />
        <BenefitsSection />
        <FeaturedDeals />
        <MembershipSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
