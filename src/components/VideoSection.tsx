
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoSection = () => {
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
      className="py-32 bg-black relative opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Explore</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Luxury <span className="text-gold">Destinations</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Immerse yourself in extraordinary travel experiences at the world's most exclusive destinations.
          </p>
          <Link to="/videos" className="inline-flex items-center mt-4 text-gold hover:text-white transition-colors">
            <span>View All Luxury Videos</span>
            <ExternalLink size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-lg shadow-elegant">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/zvP-BoDL9I0"
              title="Luxury Travel Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[600px]"
            ></iframe>
          </div>
          
          <div className="absolute bottom-5 left-5 z-20">
            <h3 className="text-xl font-display font-semibold text-white">Luxury Travel Experiences</h3>
            <p className="text-white/80 text-sm">Discover handcrafted journeys to extraordinary destinations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
