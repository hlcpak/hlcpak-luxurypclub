
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Videos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videos = [
    {
      id: 1,
      title: "Tropical Paradise Escape",
      description: "Explore the beauty of pristine beaches and luxury resorts",
      url: "https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761",
      poster: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Majestic Mountain Retreats",
      description: "Discover secluded luxury cabins with breathtaking views",
      url: "https://player.vimeo.com/external/478597646.sd.mp4?s=d8cfbe3a9ae42b2c98778d9bd067030c941fb0d2&profile_id=165&oauth2_token_id=57447761",
      poster: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Royal City Experience",
      description: "Urban luxury at its finest with top-tier service",
      url: "https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761",
      poster: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6 ml-4">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      <main>
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-gold-dark">Luxury Experience</span>
              <h2 className="text-3xl md:text-4xl mt-2 text-white">Featured <span className="text-gold">Videos</span></h2>
              <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
              <p className="mt-6 text-white/80 max-w-2xl mx-auto">
                Immerse yourself in our curated collection of luxury destination videos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all hover:border-gold/50 hover:shadow-gold">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <video
                      className="w-full h-full object-cover"
                      poster={video.poster}
                      controls
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-white mb-2">{video.title}</h3>
                    <p className="text-white/70">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
