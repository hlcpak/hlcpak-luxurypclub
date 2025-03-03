
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Gold Member',
      image: 'https://randomuser.me/api/portraits/women/23.jpg',
      quote: 'The room upgrade at Four Seasons Bali was beyond our expectations. We saved over $2,000 on our honeymoon and received VIP treatment throughout our stay.',
      location: 'Four Seasons Bali',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Platinum Member',
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      quote: 'As a frequent business traveler, the elite status and late check-out benefits have been invaluable. I\'ve saved thousands while enjoying perks OTAs never offer.',
      location: 'Mandarin Oriental Tokyo',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Silver Member',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      quote: 'Even as a Silver member, I\'ve received incredible value. My recent stay in Paris included a beautiful welcome gift and significant savings over Booking.com rates.',
      location: 'Ritz Paris',
      rating: 5
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Gold Member',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'The personalized service is what sets this program apart. Our family vacation was perfectly arranged with kid-friendly amenities we didn\'t even have to request.',
      location: 'Rosewood Phuket',
      rating: 5
    },
  ];

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-black/95 to-black relative opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="absolute inset-0 bg-[url('/img/world-map.png')] bg-no-repeat bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Success Stories</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Member <span className="text-gold">Experiences</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg p-6 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10 min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-item absolute inset-0 p-6 md:p-10 transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gold">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-gold text-gold" />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg md:text-xl font-display italic text-white mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-gold font-display font-semibold text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-white/70 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-0">
                        <div className="text-white/70 text-sm">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4">
            <button 
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="h-10 w-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-gold-dark hover:border-gold-dark transition-colors disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="h-10 w-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-gold-dark hover:border-gold-dark transition-colors disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== activeIndex) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 500);
                }
              }}
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? 'bg-gold' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
