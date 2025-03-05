
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getTourPackages, TourPackage } from '@/lib/supabase';
import { Star, MapPin, Clock, ArrowLeft, CheckCircle, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const TourPackageDetail = () => {
  const { id } = useParams();
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [travelerCount, setTravelerCount] = useState(2);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Silver membership discount (10%)
  const silverDiscount = 0.10;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const tourPackages = await getTourPackages();
      const foundPackage = tourPackages.find(p => p.id === Number(id));
      
      if (foundPackage) {
        setTourPackage(foundPackage);
      } else {
        toast({
          title: "Error",
          description: "Tour package not found",
          variant: "destructive"
        });
        navigate('/packages');
      }
    } catch (error) {
      console.error('Error fetching tour package:', error);
      toast({
        title: "Error",
        description: "Failed to load tour package",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    setBookingDialog(true);
  };

  const handleConfirmBooking = () => {
    // In a real app, this would save the booking to the database
    setBookingDialog(false);
    
    // Show success message
    toast({
      title: "Booking Confirmed",
      description: `Your ${tourPackage?.name} tour has been booked successfully!`,
      variant: "default"
    });
    
    setBookingConfirmed(true);
  };

  // Calculate silver member price with additional discount
  const calculateSilverPrice = (regularPrice: number, memberPrice: number) => {
    // Apply silver discount to member price
    return memberPrice - (memberPrice * silverDiscount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black overflow-hidden">
        <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
            Luxury Privilege Club
          </h1>
        </div>
        <Navbar />
        <main className="pt-24 pb-12 bg-black min-h-screen">
          <div className="container mx-auto px-4">
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tourPackage) {
    return (
      <div className="min-h-screen bg-black overflow-hidden">
        <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
            Luxury Privilege Club
          </h1>
        </div>
        <Navbar />
        <main className="pt-24 pb-12 bg-black min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-display text-white mb-4">Package Not Found</h2>
            <p className="text-white/70 mb-8">The tour package you're looking for does not exist.</p>
            <Button onClick={() => navigate('/packages')} className="bg-gold hover:bg-gold-dark text-black">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tour Packages
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      <main className="pt-24 pb-12 bg-black">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => navigate('/packages')} 
            variant="outline" 
            className="mb-6 border-gold/50 text-gold hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tour Packages
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images */}
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img 
                  src={tourPackage.image} 
                  alt={tourPackage.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1.5 rounded text-sm font-semibold">
                  {tourPackage.deal}
                </div>
              </div>
              
              <div className="mt-6">
                <h1 className="text-3xl font-display font-bold text-white mb-2">{tourPackage.name}</h1>
                <div className="flex items-center text-white/70 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>{tourPackage.location}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    {[...Array(tourPackage.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-4">
                  <h2 className="text-xl font-display font-semibold text-white mb-3">Tour Description</h2>
                  <p className="text-white/70">
                    {tourPackage.description || `Embark on an unforgettable journey with our exclusive ${tourPackage.name} tour package in ${tourPackage.location}. This carefully curated experience combines luxury accommodations, authentic local experiences, and personalized service for the discerning traveler. With a duration of ${tourPackage.duration}, you'll have ample time to immerse yourself in the culture and beauty of this destination.`}
                  </p>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-6">
                  <h2 className="text-xl font-display font-semibold text-white mb-3">Tour Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Expert local guides fluent in English</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Luxury accommodations at 5-star properties</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Private transportation throughout the tour</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Exclusive access to cultural sites</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Curated dining experiences at top restaurants</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Authentic cultural immersion activities</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Airport transfers and ground transportation</span>
                    </div>
                    <div className="flex items-start text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2 mt-0.5" />
                      <span>Daily breakfast and select meals included</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-6">
                  <h2 className="text-xl font-display font-semibold text-white mb-3">Itinerary</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-3 rounded">
                      <h3 className="text-gold font-semibold">Day 1: Arrival</h3>
                      <p className="text-white/70 text-sm mt-1">Welcome reception, hotel check-in, and orientation briefing with your tour guide.</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <h3 className="text-gold font-semibold">Day 2-3: Cultural Exploration</h3>
                      <p className="text-white/70 text-sm mt-1">Visit historical sites, museums, and enjoy authentic local cuisine at carefully selected venues.</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <h3 className="text-gold font-semibold">Day 4-5: Natural Wonders</h3>
                      <p className="text-white/70 text-sm mt-1">Excursions to natural attractions with private guides and luxury transportation.</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <h3 className="text-gold font-semibold">Final Day: Leisure & Departure</h3>
                      <p className="text-white/70 text-sm mt-1">Free time for shopping or relaxation, followed by private transfer to the airport.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Booking */}
            <div>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-white mb-4">Booking Summary</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-white/70 mb-2">
                      <span>Regular Price</span>
                      <span className="line-through">${tourPackage.regular_price}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Member Price</span>
                      <span className="text-white font-semibold">${tourPackage.member_price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gold">Silver Member Price</span>
                      <span className="text-gold font-semibold">${calculateSilverPrice(tourPackage.regular_price, tourPackage.member_price).toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/60 text-sm mb-6">
                    <Clock size={14} className="mr-1" />
                    <span className="mr-4">{tourPackage.duration}</span>
                    <Calendar size={14} className="mr-1" />
                    <span>Multiple departure dates</span>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded mb-6">
                    <h4 className="text-white font-semibold mb-2">Package Includes:</h4>
                    <ul className="text-white/70 space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Luxury accommodations throughout the tour</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Professional English-speaking guides</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>All entrance fees to attractions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Daily breakfast and select meals</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Airport transfers and transportation</span>
                      </li>
                    </ul>
                  </div>
                  
                  {bookingConfirmed ? (
                    <div className="bg-gold/20 border border-gold p-4 rounded text-center">
                      <CheckCircle size={24} className="text-gold mx-auto mb-2" />
                      <h4 className="text-gold font-semibold mb-1">Booking Confirmed</h4>
                      <p className="text-white/70 text-sm">Your tour has been successfully booked!</p>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleBookNow} 
                      className="w-full bg-gold hover:bg-gold-dark text-black font-semibold"
                    >
                      Book Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <Dialog open={bookingDialog} onOpenChange={setBookingDialog}>
        <DialogContent className="bg-black border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-gold">Confirm Your Tour Booking</DialogTitle>
            <DialogDescription className="text-white/70">
              Please review the details of your tour reservation before confirming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-white">Number of Travelers</Label>
                <Input 
                  id="travelers"
                  type="number"
                  min={1}
                  max={10}
                  value={travelerCount}
                  onChange={(e) => setTravelerCount(parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div>
                <h4 className="text-white mb-2">Booking Summary</h4>
                <div className="bg-white/5 rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Tour Package:</span>
                    <span className="text-white">{tourPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Destination:</span>
                    <span className="text-white">{tourPackage.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Duration:</span>
                    <span className="text-white">{tourPackage.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Travelers:</span>
                    <span className="text-white">{travelerCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Price per person:</span>
                    <span className="text-gold">${calculateSilverPrice(tourPackage.regular_price, tourPackage.member_price).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white/70">Total price:</span>
                    <span className="text-gold font-semibold">${(calculateSilverPrice(tourPackage.regular_price, tourPackage.member_price) * travelerCount).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialog(false)} className="border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} className="bg-gold hover:bg-gold-dark text-black">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourPackageDetail;
