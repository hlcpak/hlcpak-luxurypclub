import React, { useEffect, useRef, useState } from 'react';
import { getHotelDeals, getTourPackages, HotelDeal, TourPackage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import DealsSection from './deals/DealsSection';

const FeaturedDeals = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hotelDeals, setHotelDeals] = useState<HotelDeal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [hotelDeals.length, tourPackages.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const deals = await getHotelDeals();
        const packages = await getTourPackages();
        
        if (deals && deals.length > 0) {
          setHotelDeals(deals);
        } else {
          console.log("Using fallback hotel deals data");
          setHotelDeals(fallbackHotelDeals);
          toast({
            title: "Notice",
            description: "Using sample hotel deals data.",
            variant: "default"
          });
        }
        
        if (packages && packages.length > 0) {
          setTourPackages(packages);
        } else {
          console.log("Using fallback tour packages data");
          setTourPackages(fallbackTourPackages);
          toast({
            title: "Notice",
            description: "Using sample tour packages data.",
            variant: "default"
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load deals. Using fallback data instead.",
          variant: "destructive"
        });
        setHotelDeals(fallbackHotelDeals);
        setTourPackages(fallbackTourPackages);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const fallbackHotelDeals = [
    {
      id: 1,
      name: 'Four Seasons Resort Bora Bora',
      location: 'Bora Bora, French Polynesia',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Save 30% + Free Breakfast',
      member_price: 850,
      regular_price: 1200,
      duration: '3-night minimum stay',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Aman Tokyo',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Suite Upgrade + Airport Transfer',
      member_price: 720,
      regular_price: 950,
      duration: 'Flexible dates',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Ritz-Carlton Central Park',
      location: 'New York, United States',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Breakfast + $100 Spa Credit',
      member_price: 680,
      regular_price: 890,
      duration: 'Limited availability',
      created_at: new Date().toISOString()
    }
  ];

  const fallbackTourPackages = [
    {
      id: 1,
      name: 'Luxury Maldives Retreat',
      location: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Seaplane Transfers + All-Inclusive',
      member_price: 3200,
      regular_price: 4500,
      duration: '7 nights',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Italian Riviera Exploration',
      location: 'Italy',
      image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Private Guide + Yacht Day Trip',
      member_price: 4100,
      regular_price: 5500,
      duration: '10 nights',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Thai Wellness Journey',
      location: 'Thailand',
      image: 'https://images.unsplash.com/photo-1548918604-c4ca435a2aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Daily Spa Treatments + Excursions',
      member_price: 2800,
      regular_price: 3900,
      duration: '8 nights',
      created_at: new Date().toISOString()
    }
  ];

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-black/95 to-black/90 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-black/95 to-black/90 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Exclusive Offers</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Featured <span className="text-gold">Deals</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Discover our curated selection of luxury hotel deals and tour packages available only to members.
          </p>
        </div>
        
        <DealsSection
          title="Hotel Deals"
          items={hotelDeals}
          type="hotel"
          viewAllLink="/deals"
          viewAllLabel="View All Hotel Deals"
          itemsRef={itemsRef}
          startIndex={0}
        />
        
        <DealsSection
          title="Tour Packages"
          items={tourPackages}
          type="tour"
          viewAllLink="/packages"
          viewAllLabel="View All Tour Packages"
          itemsRef={itemsRef}
          startIndex={hotelDeals.length}
        />
      </div>
    </section>
  );
};

export default FeaturedDeals;
