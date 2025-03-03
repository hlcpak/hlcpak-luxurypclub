
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      <main>
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-4">
            <div 
              ref={sectionRef} 
              className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12 opacity-0 translate-y-10 transition-all duration-1000"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
                Welcome to <span className="text-gold">Luxury Privilege Club</span> – The Future of Exclusive Travel
              </h2>
              
              <div className="space-y-6 text-white/80">
                <p>
                  Luxury Privilege Club is Pakistan's first-of-its-kind exclusive hotel privilege program, designed to give you unparalleled access to premium hotel deals at rates better than OTAs. We partner with top 20 global hotel brands to offer our members exclusive discounts, VIP perks, and a rewarding loyalty program that enhances every stay.
                </p>
                
                <p>
                  Whether you're traveling domestically or internationally, our Silver, Gold, and Platinum memberships unlock a world of luxury benefits including complimentary upgrades, late checkouts, and exclusive travel experiences.
                </p>
                
                <p>
                  Join us today and experience a smarter way to travel in luxury!
                </p>
              </div>
              
              <button className="mt-10 btn-primary group">
                Explore Exclusive Privileges
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
