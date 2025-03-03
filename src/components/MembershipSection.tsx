
import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const MembershipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

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

  const membershipTiers = [
    {
      id: 'silver',
      name: 'Silver',
      price: 35000,
      currency: 'Rs.',
      description: 'Entry-level access to exclusive hotel rates and basic benefits.',
      features: [
        'Member-only rates (up to 15% discount)',
        'Priority booking assistance',
        'Basic loyalty points (1x)',
        'Room upgrades (when available)',
        'Welcome amenity at check-in',
      ],
      recommended: false,
      delay: 'delay-100'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 70000,
      currency: 'Rs.',
      description: 'Enhanced benefits with VIP treatment at partner hotels.',
      features: [
        'Member-only rates (up to 25% discount)',
        'Premium booking assistance',
        'Enhanced loyalty points (2x)',
        'Guaranteed room upgrades',
        'Luxury welcome amenities',
        'Late check-out (up to 4pm)',
        'Dedicated concierge service',
      ],
      recommended: true,
      delay: 'delay-200'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 150000,
      currency: 'Rs.',
      description: 'Ultimate luxury experience with exclusive access to rare privileges.',
      features: [
        'Member-only rates (up to 30% discount)',
        'VIP booking assistance',
        'Premium loyalty points (3x)',
        'Suite upgrades',
        'Exclusive welcome gifts',
        'Guaranteed late check-out',
        'Private airport transfers',
        'Personalized trip planning',
        'Access to VIP events worldwide',
      ],
      recommended: false,
      delay: 'delay-300'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-black/90 to-black/95 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Membership Options</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Choose Your <span className="text-gold">Tier</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Select the membership level that best suits your travel needs and unlock a world of exclusive privileges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipTiers.map((tier, index) => (
            <div
              key={tier.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-lg overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ${tier.delay} ${
                hoveredTier === tier.id ? 'border-gold shadow-gold scale-[1.02]' : 
                tier.recommended ? 'border-gold/50' : 'border-white/10'
              }`}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 left-0 bg-gold text-black text-xs font-medium text-center py-1">
                  Most Popular
                </div>
              )}
              
              <div className="p-8 pt-12">
                <h3 className="text-2xl font-display font-semibold text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-display font-bold text-gold">{tier.currency}{tier.price.toLocaleString()}</span>
                  <span className="text-white/60 ml-2">/year</span>
                </div>
                <p className="mt-4 text-white/70 min-h-[60px]">{tier.description}</p>
                
                <div className="mt-6 space-y-3">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <Check className="h-5 w-5 text-gold" />
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className={`w-full mt-8 py-3 rounded-md text-center transition-colors ${
                    tier.recommended 
                      ? 'bg-gold-dark text-white hover:bg-gold hover:text-black' 
                      : 'border border-gold-dark text-white hover:bg-gold-dark'
                  }`}
                >
                  {tier.recommended ? 'Join Now' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
