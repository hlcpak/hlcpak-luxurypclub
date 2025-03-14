
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTourPackages, TourPackage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import DealCard from '@/components/deals/DealCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const TourPackages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPackages, setFilteredPackages] = useState<TourPackage[]>([]);
  const { toast } = useToast();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Use React Query for data fetching with proper error handling
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['tourPackages'],
    queryFn: getTourPackages,
    onSuccess: (data) => {
      console.log('Successfully fetched tour packages:', data.length);
    },
    onError: (error: any) => {
      console.error('Error fetching tour packages:', error);
      toast({
        title: "Error",
        description: "Failed to load tour packages",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (packages.length > 0) {
      const filtered = packages.filter(pkg => 
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPackages(filtered);
    } else {
      setFilteredPackages([]);
    }
  }, [searchTerm, packages]);

  const getDelayClass = (index: number): string => {
    switch (index % 3) {
      case 0: return 'delay-100';
      case 1: return 'delay-200';
      case 2: return 'delay-300';
      default: return 'delay-100';
    }
  };

  // Set up delay classes for animation after component mounts
  useEffect(() => {
    // Add classes to animate items in
    if (itemsRef.current.length > 0 && !isLoading) {
      itemsRef.current.forEach((item, i) => {
        if (item) {
          setTimeout(() => {
            item.classList.remove('opacity-0', 'translate-y-10');
          }, 100 * (i % 3));
        }
      });
    }
  }, [filteredPackages, isLoading]);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3")'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Exclusive <span className="text-gold">Tour Packages</span>
            </h1>
            <div className="w-20 h-1 bg-gold mb-6"></div>
            <p className="text-white/80 text-lg md:text-xl">
              Discover handcrafted journeys to the world's most extraordinary destinations with special benefits for members
            </p>
          </div>
        </div>
      </section>
      
      <main>
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-2/3 lg:w-1/2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                  <input 
                    type="text"
                    placeholder="Search by destination or package name" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md pl-10 pr-4 py-3 text-white placeholder:text-white/50 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white/80 hover:border-gold hover:text-gold transition-colors">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
                <p className="text-white/70 text-lg">Loading tour packages...</p>
              </div>
            ) : filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
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
                {searchTerm ? (
                  <div>
                    <p className="text-white/70 text-xl mb-4">No tour packages found matching "{searchTerm}"</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="text-gold hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                ) : packages.length > 0 ? (
                  <p className="text-white/70 text-xl">No tour packages match your criteria. Please try a different search.</p>
                ) : (
                  <p className="text-white/70 text-xl">No tour packages available at the moment. Please check back later.</p>
                )}
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
