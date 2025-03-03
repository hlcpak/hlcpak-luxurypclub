
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with luxury poster image */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        >
          <source src="https://player.vimeo.com/external/478597646.sd.mp4?s=d8cfbe3a9ae42b2c98778d9bd067030c941fb0d2&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <h1 
          ref={titleRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white max-w-5xl mx-auto"
        >
          Exclusive Hotel Privileges <span className="text-gold">Beyond OTAs</span>
        </h1>
        <p 
          ref={subtitleRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 mt-6 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
        >
          Unlock members-only rates, VIP amenities, and personalized experiences at the world's finest luxury hotels.
        </p>
        <div 
          ref={ctaRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-700 mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button className="btn-primary min-w-[180px]">
            Join Now
          </button>
          <button className="btn-secondary min-w-[180px]">
            Explore Exclusive Rates
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-white/80 hover:text-gold transition-colors cursor-pointer" size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
