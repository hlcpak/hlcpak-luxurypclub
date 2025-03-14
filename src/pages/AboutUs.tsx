import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';

const AboutUs = () => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Add classes to animate items in
    if (itemsRef.current.length > 0) {
      itemsRef.current.forEach((item, i) => {
        if (item) {
          setTimeout(() => {
            item.classList.remove('opacity-0', 'translate-y-10');
          }, 100 * i);
        }
      });
    }
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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3")'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              About <span className="text-gold">Our Club</span>
            </h1>
            <div className="w-20 h-1 bg-gold mb-6"></div>
            <p className="text-white/80 text-lg md:text-xl">
              Discover the exclusive world of luxury travel and privileges designed for discerning travelers
            </p>
          </div>
        </div>
      </section>
      
      <main>
        {/* Our Story Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <div 
                  ref={el => itemsRef.current[0] = el} 
                  className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Story</h2>
                  <div className="w-16 h-1 bg-gold mb-6"></div>
                  <p className="text-white/70 mb-6">
                    Founded in 2010, Luxury Privilege Club was born from a passion for exceptional travel experiences and a desire to make luxury accessible to discerning travelers. What began as a small collective of travel enthusiasts has evolved into an exclusive membership club with a global presence.
                  </p>
                  <p className="text-white/70 mb-6">
                    Our journey started with a simple mission: to curate extraordinary travel experiences that go beyond the ordinary. We believe that luxury is not just about opulence, but about meaningful experiences, personalized service, and attention to detail.
                  </p>
                  <p className="text-white/70">
                    Today, we continue to build on our founding principles, constantly seeking out new destinations, forging partnerships with the world's finest hotels and resorts, and creating bespoke experiences for our members.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div 
                  ref={el => itemsRef.current[1] = el} 
                  className="opacity-0 translate-y-10 transition-all duration-700 delay-200 ease-out"
                >
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Luxury hotel lobby" 
                      className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                    />
                    <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/20 rounded-lg -z-10"></div>
                    <div className="absolute -top-6 -right-6 w-48 h-48 bg-gold/20 rounded-lg -z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Parallax Quote Section */}
        <Parallax
          blur={0}
          bgImage="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
          bgImageAlt="Luxury hotel view"
          strength={300}
        >
          <div className="h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <div 
                ref={el => itemsRef.current[2] = el} 
                className="opacity-0 translate-y-10 transition-all duration-700 ease-out max-w-3xl mx-auto bg-black/60 p-10 rounded-lg"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  "Luxury is in the experience, not the price tag."
                </h2>
                <p className="text-gold text-lg">— Our Founding Principle</p>
              </div>
            </div>
          </div>
        </Parallax>
        
        {/* Our Values Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Values</h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-white/70 max-w-2xl mx-auto">
                At the core of our club are the values that guide everything we do, from selecting our partners to designing experiences for our members.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Exclusivity",
                  description: "We carefully curate our membership to ensure a community of like-minded individuals who appreciate the finer things in life.",
                  icon: "✦"
                },
                {
                  title: "Excellence",
                  description: "We hold ourselves to the highest standards in everything we do, from the partners we choose to the experiences we create.",
                  icon: "★"
                },
                {
                  title: "Personalization",
                  description: "We believe that true luxury lies in experiences tailored to individual preferences and desires.",
                  icon: "♦"
                },
                {
                  title: "Authenticity",
                  description: "We seek out genuine experiences that connect our members with local cultures and traditions in meaningful ways.",
                  icon: "❖"
                },
                {
                  title: "Innovation",
                  description: "We constantly push boundaries to discover new destinations, experiences, and ways to delight our members.",
                  icon: "✧"
                },
                {
                  title: "Sustainability",
                  description: "We are committed to responsible travel that respects and preserves the environments and communities we visit.",
                  icon: "♣"
                }
              ].map((value, index) => (
                <div 
                  key={value.title}
                  ref={el => itemsRef.current[index + 3] = el} 
                  className="opacity-0 translate-y-10 transition-all duration-700 ease-out bg-white/5 border border-white/10 rounded-lg p-6 hover:border-gold transition-colors"
                >
                  <div className="text-4xl text-gold mb-4">{value.icon}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Membership Tiers Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Membership Tiers</h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-white/70 max-w-2xl mx-auto">
                Choose the membership level that suits your travel style and aspirations. Each tier offers exclusive benefits designed to enhance your luxury travel experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  tier: "Silver",
                  price: "$1,000",
                  period: "annually",
                  description: "Perfect for the occasional luxury traveler seeking exceptional value and special perks.",
                  benefits: [
                    "Access to member-only hotel rates",
                    "Room upgrades when available",
                    "Early check-in and late check-out",
                    "Welcome amenity at partner hotels",
                    "Dedicated concierge service"
                  ],
                  featured: false
                },
                {
                  tier: "Gold",
                  price: "$2,500",
                  period: "annually",
                  description: "Designed for frequent travelers who appreciate luxury experiences and premium benefits.",
                  benefits: [
                    "All Silver benefits",
                    "Priority room upgrades",
                    "Complimentary breakfast",
                    "Spa or dining credits",
                    "Exclusive event invitations",
                    "Airport transfers at select destinations"
                  ],
                  featured: true
                },
                {
                  tier: "Platinum",
                  price: "$5,000",
                  period: "annually",
                  description: "The ultimate luxury travel membership for those who demand the very best.",
                  benefits: [
                    "All Gold benefits",
                    "Guaranteed room upgrades",
                    "Personalized travel planning",
                    "Access to exclusive villas and residences",
                    "VIP airport services",
                    "Bespoke experiences and private tours",
                    "Dedicated lifestyle manager"
                  ],
                  featured: false
                }
              ].map((tier, index) => (
                <div 
                  key={tier.tier}
                  ref={el => itemsRef.current[index + 9] = el} 
                  className={`opacity-0 translate-y-10 transition-all duration-700 ease-out rounded-lg overflow-hidden ${
                    tier.featured 
                      ? 'border-2 border-gold bg-gradient-to-b from-black to-gray-800 transform md:-translate-y-4' 
                      : 'border border-white/10 bg-white/5'
                  }`}
                >
                  {tier.featured && (
                    <div className="bg-gold text-black text-center py-2 font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{tier.tier}</h3>
                    <div className="flex items-end mb-6">
                      <span className="text-3xl font-bold text-white">{tier.price}</span>
                      <span className="text-white/70 ml-1">/{tier.period}</span>
                    </div>
                    <p className="text-white/70 mb-6">{tier.description}</p>
                    <div className="w-12 h-1 bg-gold mb-6"></div>
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gold mr-2">✓</span>
                          <span className="text-white/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-md font-medium transition-colors ${
                      tier.featured 
                        ? 'bg-gold text-black hover:bg-gold/90' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                      Join Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Member Testimonials</h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-white/70 max-w-2xl mx-auto">
                Hear what our members have to say about their experiences with Luxury Privilege Club.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "The exclusive deals and upgrades have transformed how I travel. The personalized service is unmatched.",
                  author: "Sarah J.",
                  location: "New York",
                  membership: "Gold Member",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
                },
                {
                  quote: "As a business traveler, the value I get from my membership is extraordinary. The concierge service alone has saved me countless hours.",
                  author: "Michael T.",
                  location: "London",
                  membership: "Platinum Member",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
                },
                {
                  quote: "Our family vacation was elevated to an unforgettable experience thanks to the exclusive access and special touches arranged by the club.",
                  author: "Elena R.",
                  location: "Milan",
                  membership: "Gold Member",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3"
                }
              ].map((testimonial, index) => (
                <div 
                  key={testimonial.author}
                  ref={el => itemsRef.current[index + 12] = el} 
                  className="opacity-0 translate-y-10 transition-all duration-700 ease-out bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white">{testimonial.author}</h3>
                      <p className="text-white/60 text-sm">{testimonial.location}</p>
                      <p className="text-gold text-sm">{testimonial.membership}</p>
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 text-center">
            <div 
              ref={el => itemsRef.current[15] = el} 
              className="opacity-0 translate-y-10 transition-all duration-700 ease-out max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Elevate Your Travel Experience?
              </h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-white/70 mb-8">
                Join our exclusive club today and discover a world of luxury travel privileges, exceptional service, and unforgettable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gold text-black px-8 py-3 rounded-md font-medium hover:bg-gold/90 transition-colors">
                  Become a Member
                </button>
                <button className="bg-transparent border border-gold text-gold px-8 py-3 rounded-md font-medium hover:bg-gold/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
