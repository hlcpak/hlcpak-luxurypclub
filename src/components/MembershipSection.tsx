
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const MembershipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
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

  const handleJoinClick = (planName: string) => {
    setSelectedPlan(planName);
    setJoinDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to your backend
    console.log('Form submitted:', { ...formData, plan: selectedPlan });
    
    // Close dialog and show success message
    setJoinDialogOpen(false);
    toast({
      title: "Application Submitted",
      description: `Thank you for joining our ${selectedPlan} membership plan. We'll contact you shortly!`,
      variant: "default"
    });
    
    // Reset form
    setFormData({ name: '', email: '', phone: '' });
  };

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
      className="relative py-28 bg-black"
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

        <div className="text-center mb-12">
          <h3 className="text-2xl text-white font-display">
            <span className="text-gold">Membership Pricing</span> & Benefits
          </h3>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Compare our membership tiers to find the perfect fit for your travel needs
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

              {plan.name === 'Silver' && (
                <div className="bg-[#C8C8C9]/20 border border-[#C8C8C9] text-[#C8C8C9] text-sm px-3 py-1.5 rounded-md inline-flex items-center mb-4 w-fit">
                  <span className="font-medium">Silver Member</span>
                </div>
              )}

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
                onClick={() => handleJoinClick(plan.name)}
              >
                Join {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Join Membership Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="bg-black border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-gold">Join {selectedPlan} Membership</DialogTitle>
            <DialogDescription className="text-white/70">
              Complete the form below to apply for {selectedPlan} membership.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/20 text-white"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/20 text-white"
                placeholder="Enter your email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input 
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/20 text-white"
                placeholder="Enter your phone number"
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => setJoinDialogOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                Cancel
              </Button>
              <Button type="submit" className="bg-gold hover:bg-gold-dark text-black">
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MembershipSection;
