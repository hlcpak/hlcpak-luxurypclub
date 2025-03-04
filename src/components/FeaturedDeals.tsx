
import React, { useEffect, useRef } from 'react';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';

const FeaturedDeals = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
  }, []);

  const hotelDeals = [
    {
      id: 1,
      name: 'Four Seasons Resort Bora Bora',
      location: 'Bora Bora, French Polynesia',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Save 30% + Free Breakfast',
      memberPrice: 850,
      regularPrice: 1200,
      duration: '3-night minimum stay',
      delay: 'delay-100'
    },
    {
      id: 2,
      name: 'Aman Tokyo',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Suite Upgrade + Airport Transfer',
      memberPrice: 720,
      regularPrice: 950,
      duration: 'Flexible dates',
      delay: 'delay-200'
    },
    {
      id: 3,
      name: 'Ritz-Carlton Central Park',
      location: 'New York, United States',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Breakfast + $100 Spa Credit',
      memberPrice: 680,
      regularPrice: 890,
      duration: 'Limited availability',
      delay: 'delay-300'
    }
  ];

  const tourPackages = [
    {
      id: 1,
      name: 'Luxury Maldives Retreat',
      location: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Seaplane Transfers + All-Inclusive',
      memberPrice: 3200,
      regularPrice: 4500,
      duration: '7 nights',
      delay: 'delay-100'
    },
    {
      id: 2,
      name: 'Italian Riviera Exploration',
      location: 'Italy',
      image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Private Guide + Yacht Day Trip',
      memberPrice: 4100,
      regularPrice: 5500,
      duration: '10 nights',
      delay: 'delay-200'
    },
    {
      id: 3,
      name: 'Thai Wellness Journey',
      location: 'Thailand',
      image: 'https://images.unsplash.com/photo-1548918604-c4ca435a2aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'Daily Spa Treatments + Excursions',
      memberPrice: 2800,
      regularPrice: 3900,
      duration: '8 nights',
      delay: 'delay-300'
    }
  ];

  // Reusable Deal Card component
  const DealCard = ({ 
    item, 
    index, 
    type
  }: { 
    item: typeof hotelDeals[0] | typeof tourPackages[0], 
    index: number,
    type: 'hotel' | 'tour'
  }) => (
    <div
      ref={(el) => (itemsRef.current[type === 'hotel' ? index : index + hotelDeals.length] = el)}
      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ${item.delay} hover:border-gold/50 hover:shadow-gold`}
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
            <div className="group-hover:opacity-100">
              <span className="text-xs text-white/50">Member Price</span>
              <div className="text-xl font-display font-bold text-gold">
                ${item.memberPrice}
                <span className="text-sm text-white/60 ml-1 line-through">
                  ${item.regularPrice}
                </span>
              </div>
            </div>
            <div className="flex items-center text-white/60 text-xs">
              <Clock size={14} className="mr-1" />
              {item.duration}
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 py-3 rounded text-center border border-gold-dark text-white hover:bg-gold-dark transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

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
        
        {/* Hotel Deals */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-white">Hotel Deals</h3>
            <a href="/deals" className="text-gold-dark hover:text-gold flex items-center">
              View All Hotel Deals <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelDeals.map((deal, index) => (
              <DealCard key={deal.id} item={deal} index={index} type="hotel" />
            ))}
          </div>
        </div>
        
        {/* Tour Packages */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-white">Tour Packages</h3>
            <a href="/packages" className="text-gold-dark hover:text-gold flex items-center">
              View All Tour Packages <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg, index) => (
              <DealCard key={pkg.id} item={pkg} index={index} type="tour" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
