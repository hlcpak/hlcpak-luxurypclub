
import React, { useEffect, useRef } from 'react';
import { 
  BadgePercent, 
  Trophy, 
  ArrowUpRight, 
  Clock, 
  Gift, 
  Shield 
} from 'lucide-react';

const BenefitsSection = () => {
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

  const benefits = [
    {
      title: 'Better Rates Than OTAs',
      description: 'Enjoy privileged pricing that beats major booking platforms by up to 30%.',
      icon: <BadgePercent className="h-6 w-6 text-gold" />,
      delay: 'delay-100'
    },
    {
      title: 'Exclusive Loyalty Rewards',
      description: 'Earn points with every booking and redeem for free stays, room upgrades, and more.',
      icon: <Trophy className="h-6 w-6 text-gold" />,
      delay: 'delay-200'
    },
    {
      title: 'Premium Room Upgrades',
      description: 'Members receive complimentary room upgrades when available at check-in.',
      icon: <ArrowUpRight className="h-6 w-6 text-gold" />,
      delay: 'delay-300'
    },
    {
      title: 'Late Check-out',
      description: 'Enjoy your vacation longer with guaranteed late check-out privileges.',
      icon: <Clock className="h-6 w-6 text-gold" />,
      delay: 'delay-400'
    },
    {
      title: 'VIP Welcome Amenities',
      description: 'Receive special welcome gifts and amenities at participating hotels.',
      icon: <Gift className="h-6 w-6 text-gold" />,
      delay: 'delay-500'
    },
    {
      title: 'Priority Booking Protection',
      description: 'Your reservations are guaranteed even during peak seasons.',
      icon: <Shield className="h-6 w-6 text-gold" />,
      delay: 'delay-600'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-black to-black/95 relative"
    >
      <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Membership <span className="text-gold">Benefits</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Join our exclusive membership program and unlock a world of privileges and perks at the finest luxury hotels worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 opacity-0 translate-y-10 transition-all duration-700 ${benefit.delay} hover:border-gold/50 hover:bg-white/10 hover:shadow-gold hover:-translate-y-1`}
            >
              <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
