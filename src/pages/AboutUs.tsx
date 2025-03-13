
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, MapPin, Users, Award, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const animatedSections = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
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

    animatedSections.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      animatedSections.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3")'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              About <span className="text-gold">Us</span>
            </h1>
            <div className="w-20 h-1 bg-gold mb-6"></div>
            <p className="text-white/80 text-lg md:text-xl">
              Discover the story behind Pakistan's exclusive hotel privilege program designed for the discerning traveler
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div 
            ref={(el) => (animatedSections.current[0] = el)} 
            className="flex flex-col md:flex-row gap-10 items-center opacity-0 translate-y-10 transition-all duration-1000"
          >
            <div className="md:w-1/2">
              <span className="text-gold-dark text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
                Pioneering Luxury Travel <span className="text-gold">Since 2018</span>
              </h2>
              <div className="space-y-6 text-white/80">
                <p>
                  Luxury Privilege Club was founded with a vision to transform how Pakistani travelers experience luxury accommodations, both locally and internationally. We recognized the gap between premium hotel offerings and the value received by frequent travelers.
                </p>
                
                <p>
                  What began as a small network of partner hotels has grown into Pakistan's first-of-its-kind exclusive hotel privilege program, working with over 20 global hotel brands to offer our members rates that consistently outperform online travel agencies.
                </p>
                
                <p>
                  Our founding principle remains unchanged: to provide our members with exceptional value, personalized service, and unforgettable experiences that define true luxury.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Luxury hotel lobby" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold-dark/90 backdrop-blur-sm p-6 rounded-lg max-w-xs hidden md:block">
                <p className="text-white font-medium">
                  "Our mission is to provide unmatched value and personalized service to every member."
                </p>
                <p className="text-white/80 mt-2 text-sm">— Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-black/95">
        <div className="container mx-auto px-4">
          <div 
            ref={(el) => (animatedSections.current[1] = el)} 
            className="text-center mb-12 opacity-0 translate-y-10 transition-all duration-1000"
          >
            <span className="text-gold-dark text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
              Key <span className="text-gold">Benefits</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-6"></div>
          </div>
          
          <div 
            ref={(el) => (animatedSections.current[2] = el)} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0 translate-y-10 transition-all duration-1000 delay-300"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
              <div className="bg-gold-dark/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <Star className="text-gold h-7 w-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                Exclusive Room Rates
              </h3>
              <p className="text-white/70">
                Enjoy member-only rates that consistently beat those offered by online travel agencies.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
              <div className="bg-gold-dark/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <Users className="text-gold h-7 w-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                VIP Recognition
              </h3>
              <p className="text-white/70">
                Receive priority treatment, room upgrades, and personalized attention during your stay.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
              <div className="bg-gold-dark/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <Clock className="text-gold h-7 w-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                Flexible Privileges
              </h3>
              <p className="text-white/70">
                Late check-outs, early check-ins, and customized amenities to enhance your experience.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
              <div className="bg-gold-dark/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <Award className="text-gold h-7 w-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                Points Program
              </h3>
              <p className="text-white/70">
                Earn and redeem points for every stay, unlocking complimentary nights and exclusive rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div 
            ref={(el) => (animatedSections.current[3] = el)} 
            className="text-center mb-12 opacity-0 translate-y-10 transition-all duration-1000"
          >
            <span className="text-gold-dark text-sm uppercase tracking-widest">Membership Options</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
              Our <span className="text-gold">Membership Tiers</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-6"></div>
          </div>
          
          <div 
            ref={(el) => (animatedSections.current[4] = el)} 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 translate-y-10 transition-all duration-1000 delay-300"
          >
            {/* Silver Tier */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
              <div className="h-2 bg-gray-300"></div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-semibold text-white mb-3">
                  Silver
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-display font-bold text-gold">Rs. 9,999</span>
                  <span className="text-white/70 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Access to member-only rates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">10% off on dining</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Early check-in when available</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Silver tier points accrual</span>
                  </li>
                </ul>
                <Link to="#" className="btn-secondary w-full block text-center">
                  Choose Silver
                </Link>
              </div>
            </div>
            
            {/* Gold Tier */}
            <div className="bg-white/5 backdrop-blur-sm border border-gold/30 rounded-lg overflow-hidden hover:border-gold/70 transition-all duration-300 hover:shadow-gold relative">
              <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1">
                MOST POPULAR
              </div>
              <div className="h-2 bg-gold"></div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-semibold text-white mb-3">
                  Gold
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-display font-bold text-gold">Rs. 19,999</span>
                  <span className="text-white/70 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">All Silver benefits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Room upgrades when available</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">15% off on dining & spa</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Guaranteed late check-out</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Enhanced points accrual rate</span>
                  </li>
                </ul>
                <Link to="#" className="btn-primary w-full block text-center">
                  Choose Gold
                </Link>
              </div>
            </div>
            
            {/* Platinum Tier */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
              <div className="h-2 bg-purple-400"></div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-semibold text-white mb-3">
                  Platinum
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-display font-bold text-gold">Rs. 29,999</span>
                  <span className="text-white/70 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">All Gold benefits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Dedicated concierge service</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">25% off on dining & spa</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Complimentary airport transfers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Premium points accrual rate</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-gold mr-2">✓</div>
                    <span className="text-white/80">Access to exclusive events</span>
                  </li>
                </ul>
                <Link to="#" className="btn-secondary w-full block text-center">
                  Choose Platinum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => (animatedSections.current[5] = el)} 
        className="py-20 bg-black relative opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="bg-gold-dark/30 border border-gold/20 rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Join Our Exclusive <span className="text-gold">Community</span>
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Experience a new standard of luxury travel. Become a member today and unlock a world of privileges, exclusive rates, and personalized service.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="#" className="btn-primary">
                  Become a Member
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
