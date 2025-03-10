
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTourPackages, TourPackage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import DealCard from '@/components/deals/DealCard';

const TourPackages = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const tourPackages = await getTourPackages();
      setPackages(tourPackages);
    } catch (error) {
      console.error('Error fetching tour packages:', error);
      toast({
        title: "Error",
        description: "Failed to load tour packages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDelayClass = (index: number): string => {
    switch (index % 3) {
      case 0: return 'delay-100';
      case 1: return 'delay-200';
      case 2: return 'delay-300';
      default: return 'delay-100';
    }
  };

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

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
              </div>
            ) : packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                  <DealCard
                    key={pkg.id}
                    item={pkg}
                    type="tour"
                    index={index}
                    delayClass={getDelayClass(index)}
                    ref={(el) => (itemsRef.current[index] = el)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-white/70 text-xl">No tour packages available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TourPackages;
