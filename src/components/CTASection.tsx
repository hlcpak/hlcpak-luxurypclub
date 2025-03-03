
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-black to-black/90 relative opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/img/cta-poster.jpg"
        >
          <source src="https://player.vimeo.com/external/321837978.sd.mp4?s=3d25e61970561c5efce1b21253ed3430b9a2a5fb&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-gold">Join Today</span>
          <h2 className="text-3xl md:text-5xl mt-4 text-white font-display font-bold">
            Unlock a World of <span className="text-gold">Exclusive Privileges</span>
          </h2>
          <p className="mt-6 text-white/80 text-lg md:text-xl">
            Join thousands of members who are already enjoying VIP treatment, member-only rates, and exceptional experiences at the world's finest luxury hotels.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="btn-primary min-w-[200px] group">
              <span>Join Now</span>
              <ArrowRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn-secondary min-w-[200px]">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
