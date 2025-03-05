import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { getHotelDeals, getTourPackages, HotelDeal, TourPackage } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const FeaturedDeals = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hotelDeals, setHotelDeals] = useState<HotelDeal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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
  }, [hotelDeals.length, tourPackages.length]); // Add dependencies to re-observe after data loads

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch real data from Supabase
        const deals = await getHotelDeals();
        const packages = await getTourPackages();
        
        console.log("Fetched hotel deals:", deals);
        console.log("Fetched tour packages:", packages);
        
        // Only use fallback if no data is returned
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

  const handleViewDeal = (id: number, type: 'hotel' | 'tour') => {
    if (type === 'hotel') {
      navigate(`/deals/${id}`);
    } else {
      navigate(`/packages/${id}`);
    }
  };

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

  const getDelayClass = (index: number): string => {
    switch (index % 3) {
      case 0: return 'delay-100';
      case 1: return 'delay-200';
      case 2: return 'delay-300';
      default: return 'delay-100';
    }
  };

  const DealCard = ({ 
    item, 
    index, 
    type
  }: { 
    item: (HotelDeal | TourPackage), 
    index: number,
    type: 'hotel' | 'tour'
  }) => (
    <div
      ref={(el) => (itemsRef.current[type === 'hotel' ? index : index + hotelDeals.length] = el)}
      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ${getDelayClass(index)} hover:border-gold/50 hover:shadow-gold`}
    >
      <div className="relative overflow-hidden h-64">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-0.5">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs bg-gold text-black px-2 py-1 rounded group-hover:bg-gold">
              {item.deal}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-gold transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center text-white/60 text-sm">
              <MapPin size={14} className="mr-1" />
              {item.location}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center">
            <div className="opacity-100 group-hover:opacity-100">
              <span className="text-xs text-white/50">Member Price</span>
              <div className="text-xl font-display font-bold text-gold">
                ${item.member_price}
                <span className="text-sm text-white/60 ml-1 line-through">
                  ${item.regular_price}
                </span>
              </div>
            </div>
            <div className="flex items-center text-white/60 text-xs">
              <Clock size={14} className="mr-1" />
              {item.duration}
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => handleViewDeal(item.id, type)}
          className="w-full mt-4 py-3 rounded text-center border border-gold-dark text-white hover:bg-gold-dark transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

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
        
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-white">Hotel Deals</h3>
            <a href="/deals" className="text-gold-dark hover:text-gold flex items-center">
              View All Hotel Deals <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelDeals.slice(0, 3).map((deal, index) => (
              <DealCard key={deal.id} item={deal} index={index} type="hotel" />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-white">Tour Packages</h3>
            <a href="/packages" className="text-gold-dark hover:text-gold flex items-center">
              View All Tour Packages <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.slice(0, 3).map((pkg, index) => (
              <DealCard key={pkg.id} item={pkg} index={index} type="tour" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
