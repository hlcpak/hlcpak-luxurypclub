
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const video = document.getElementById('luxury-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-black relative opacity-0 translate-y-10 transition-all duration-1000"
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
        
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
          
          <div className="aspect-w-16 aspect-h-9 bg-black/20">
            <video
              id="luxury-video"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1600&q=80"
            >
              <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <button
            onClick={toggleMute}
            className="absolute bottom-5 right-5 z-20 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-gold-dark transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
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
