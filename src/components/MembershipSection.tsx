
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const MembershipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // Here, we're simulating the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted to luxuryprivilegeclub@gmail.com:', {
        ...formData,
        plan: selectedPlan,
        timestamp: new Date().toISOString(),
      });
      
      // Close dialog and show success message
      setJoinDialogOpen(false);
      toast({
        title: "Application Submitted",
        description: `Thank you for joining our ${selectedPlan} membership plan. We'll contact you shortly!`,
        variant: "default"
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const membershipPlans = [
    {
      name: 'Silver',
      description: 'Perfect for the occasional traveler',
      price: 35000,
      currency: 'Rs.',
      billingPeriod: 'year',
      discount: 'Up to 30% off',
      features: [
        'Access to exclusive hotel deals',
        'Up to 30% discount on domestic hotels',
        'Up to 20% discount on international hotels',
        'Silver tier room upgrades when available',
        'Dedicated travel concierge service',
        '24/7 customer support',
      ],
      color: 'bg-slate-100/10 border-slate-200/30',
      textColor: 'text-[#C8C8C9]',
      badgeColor: 'bg-[#C8C8C9]/20 border border-[#C8C8C9] text-[#C8C8C9]',
      buttonVariant: 'outline',
    },
    {
      name: 'Gold',
      description: 'Our most popular membership',
      price: 70000,
      currency: 'Rs.',
      billingPeriod: 'year',
      discount: 'Up to 50% off',
      features: [
        'All Silver benefits',
        'Up to 50% discount on domestic hotels',
        'Up to 35% discount on international hotels',
        'Guaranteed room upgrades',
        'Late checkout privileges',
        'Exclusive access to partner lounges',
        'Complimentary breakfast at select properties',
        'Annual credit towards any booking',
      ],
      color: 'bg-gold/10 border-gold',
      textColor: 'text-gold',
      badgeColor: 'bg-gold/20 border border-gold text-gold',
      buttonVariant: 'default',
      featured: true,
    },
    {
      name: 'Platinum',
      description: 'For the elite luxury traveler',
      price: 150000,
      currency: 'Rs.',
      billingPeriod: 'year',
      discount: 'Up to 70% off',
      features: [
        'All Gold benefits',
        'Up to 70% discount on domestic hotels',
        'Up to 50% discount on international hotels',
        'Complimentary airport transfers',
        'Personalized travel planning',
        'VIP meet and greet at select destinations',
        'Exclusive events and experiences',
        'Generous annual travel credit',
        'Complimentary spa treatments at partner hotels',
      ],
      color: 'bg-slate-900 border-slate-800',
      textColor: 'text-white',
      badgeColor: 'bg-white/10 border border-white/30 text-white',
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

              <div className={`${plan.badgeColor} text-sm px-3 py-1.5 rounded-md inline-flex items-center mb-4 w-fit`}>
                <span className="font-medium">{plan.discount}</span>
              </div>

              <div className={`${plan.textColor} mb-6 relative`}>
                <div className="flex items-baseline">
                  <span className="text-sm mr-1">{plan.currency}</span>
                  <span className="text-3xl font-bold font-display">{plan.price.toLocaleString()}</span>
                  <span className="text-white/60 ml-1">/{plan.billingPeriod}</span>
                </div>
                <div className="absolute -right-2 -top-2 rotate-12 bg-gradient-to-r from-gold/80 to-gold-dark/80 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  Best Value
                </div>
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
                className="mt-auto backdrop-blur-sm hover:shadow-gold/30 hover:scale-105 transition-all"
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
        <DialogContent className="bg-black border border-white/10 text-white max-w-md">
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

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">Additional Information (Optional)</Label>
              <Textarea 
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white resize-none min-h-[80px]"
                placeholder="Any additional details you'd like to share..."
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => setJoinDialogOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                Cancel
              </Button>
              <Button type="submit" className="bg-gold hover:bg-gold-dark text-black" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MembershipSection;
