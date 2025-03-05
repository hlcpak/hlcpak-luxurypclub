
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const MembershipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    planRefs.current.forEach((plan) => {
      if (plan) observer.observe(plan);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      planRefs.current.forEach((plan) => {
        if (plan) observer.unobserve(plan);
      });
    };
  }, []);

  const membershipPlans = [
    {
      name: 'Silver',
      description: 'Perfect for the occasional traveler',
      price: 499,
      billingPeriod: 'year',
      features: [
        'Access to exclusive hotel deals',
        'Priority booking',
        'Silver tier room upgrades when available',
        'Dedicated travel concierge service',
        '24/7 customer support',
      ],
      color: 'bg-slate-100 border-slate-200',
      textColor: 'text-black',
      buttonVariant: 'outline',
    },
    {
      name: 'Gold',
      description: 'Our most popular membership',
      price: 999,
      billingPeriod: 'year',
      features: [
        'All Silver benefits',
        'Guaranteed room upgrades',
        'Late checkout privileges',
        'Exclusive access to partner lounges',
        'Complimentary breakfast at select properties',
        'Annual credit towards any booking',
      ],
      color: 'bg-gold/10 border-gold',
      textColor: 'text-gold',
      buttonVariant: 'default',
      featured: true,
    },
    {
      name: 'Platinum',
      description: 'For the elite luxury traveler',
      price: 2499,
      billingPeriod: 'year',
      features: [
        'All Gold benefits',
        'Complimentary airport transfers',
        'Personalized travel planning',
        'VIP meet and greet at select destinations',
        'Exclusive events and experiences',
        'Generous annual travel credit',
        'Complimentary spa treatments at partner hotels',
      ],
      color: 'bg-slate-900 border-slate-800',
      textColor: 'text-white',
      buttonVariant: 'outline',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="relative py-24 bg-black"
    >
      <div className="absolute inset-0 bg-[url('/img/pattern-dark.svg')] opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Membership Options</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Choose Your <span className="text-gold">Level</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Select the perfect membership tier to match your travel lifestyle and unlock a world of exclusive privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {membershipPlans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => (planRefs.current[index] = el)}
              className={`relative rounded-lg overflow-hidden border ${
                plan.color
              } p-8 flex flex-col opacity-0 translate-y-10 transition-all duration-700 delay-${
                index * 100
              } ${
                plan.featured ? 'transform md:-translate-y-4' : ''
              } hover:border-gold/70 hover:shadow-xl transition-all`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-2xl font-display font-semibold ${plan.textColor}`}>
                  {plan.name}
                </h3>
                <p className="text-white/60 mt-1">{plan.description}</p>
              </div>

              <div className={`${plan.textColor} mb-6`}>
                <span className="text-3xl font-bold font-display">${plan.price}</span>
                <span className="text-white/60">/{plan.billingPeriod}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check size={18} className="text-gold shrink-0 mt-0.5 mr-2" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="mt-auto"
                variant={plan.buttonVariant as any}
              >
                Join {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
