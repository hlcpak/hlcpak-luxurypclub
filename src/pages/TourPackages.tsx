
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TourPackages = () => {
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
              <span className="text-xs uppercase tracking-widest text-gold-dark">Curated Experiences</span>
              <h2 className="text-3xl md:text-4xl mt-2 text-white">Luxury <span className="text-gold">Tour Packages</span></h2>
              <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
              <p className="mt-6 text-white/80 max-w-2xl mx-auto">
                Discover handcrafted journeys to the world's most extraordinary destinations with exclusive member benefits.
              </p>
            </div>

            {/* Content will be added here in future updates */}
            <div className="py-20 text-center">
              <p className="text-white/70 text-xl">Coming soon - Luxury tour packages with member discounts</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TourPackages;
