
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTourPackages, TourPackage } from '@/lib/supabase';
import { Star, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TourPackages = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const tourPackages = await getTourPackages();
      setPackages(tourPackages);
    } catch (error) {
      console.error('Error fetching tour packages:', error);
      toast({
        title: "Error",
        description: "Failed to load tour packages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewPackage = (packageId: number) => {
    navigate(`/packages/${packageId}`);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      <main>
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-gold-dark">Curated Experiences</span>
              <h2 className="text-3xl md:text-4xl mt-2 text-white">Luxury <span className="text-gold">Tour Packages</span></h2>
              <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
              <p className="mt-6 text-white/80 max-w-2xl mx-auto">
                Discover handcrafted journeys to the world's most extraordinary destinations with exclusive member benefits.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
              </div>
            ) : packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-gold/50 hover:shadow-gold">
                    <div className="relative overflow-hidden h-64">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img 
                        src={pkg.image} 
                        alt={pkg.name} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-0.5">
                            {[...Array(pkg.rating)].map((_, i) => (
                              <Star key={i} size={16} className="fill-gold text-gold" />
                            ))}
                          </div>
                          <span className="text-xs bg-gold text-black px-2 py-1 rounded">
                            {pkg.deal}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-gold transition-colors">
                            {pkg.name}
                          </h3>
                          <div className="flex items-center text-white/60 text-sm">
                            <MapPin size={14} className="mr-1" />
                            {pkg.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center">
                          <div className="opacity-100">
                            <span className="text-xs text-white/50">Member Price</span>
                            <div className="text-xl font-display font-bold text-gold">
                              ${pkg.member_price}
                              <span className="text-sm text-white/60 ml-1 line-through">
                                ${pkg.regular_price}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-white/60 text-xs">
                            <Clock size={14} className="mr-1" />
                            {pkg.duration}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleViewPackage(pkg.id)} 
                        className="w-full mt-4 py-3 rounded text-center border border-gold-dark text-white hover:bg-gold-dark transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-white/70 text-xl">No tour packages available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TourPackages;
