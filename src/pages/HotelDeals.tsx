
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HotelDeals = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-gold-dark">Exclusive Access</span>
              <h2 className="text-3xl md:text-4xl mt-2 text-white">Member-Only <span className="text-gold">Hotel Deals</span></h2>
              <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
              <p className="mt-6 text-white/80 max-w-2xl mx-auto">
                Browse our collection of exclusive hotel deals at prices you won't find on any OTA.
              </p>
            </div>

            {/* Content will be added here in future updates */}
            <div className="py-20 text-center">
              <p className="text-white/70 text-xl">Coming soon - Exclusive hotel deals for members only</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDeals;
