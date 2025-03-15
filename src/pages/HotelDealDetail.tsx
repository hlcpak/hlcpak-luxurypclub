
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getHotelDeals, HotelDeal, addOrder } from '@/lib/supabase';
import { Star, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const HotelDealDetail = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState<HotelDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('');
  const [notes, setNotes] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Silver membership discount (10%)
  const silverDiscount = 0.10;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDeal();
  }, [id]);

  useEffect(() => {
    // Set default booking date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const fetchDeal = async () => {
    try {
      setLoading(true);
      const hotelDeals = await getHotelDeals();
      const foundDeal = hotelDeals.find(d => d.id === Number(id));
      
      if (foundDeal) {
        setDeal(foundDeal);
      } else {
        toast({
          title: "Error",
          description: "Hotel deal not found",
          variant: "destructive"
        });
        navigate('/deals');
      }
    } catch (error) {
      console.error('Error fetching hotel deal:', error);
      toast({
        title: "Error",
        description: "Failed to load hotel deal",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book this hotel deal",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    setBookingDialog(true);
  };

  const handleConfirmBooking = async () => {
    if (!user || !deal) return;
    
    try {
      setIsSubmitting(true);
      
      const orderDetails = {
        user_id: user.id,
        customer_name: user.user_metadata?.name || user.email?.split('@')[0] || 'Guest',
        customer_email: user.email || '',
        customer_phone: contactPhone,
        booking_type: 'hotel' as const,
        item_id: deal.id,
        item_name: deal.name,
        booking_date: new Date().toISOString(),
        travel_date: new Date(bookingDate).toISOString(),
        guests: guestCount,
        total_price: calculateSilverPrice(deal.regular_price, deal.member_price),
        notes: notes,
        status: 'pending' as const,
      };
      
      const newOrder = await addOrder(orderDetails);
      
      if (newOrder) {
        setBookingDialog(false);
        toast({
          title: "Booking Confirmed",
          description: `Your stay at ${deal.name} has been booked successfully!`,
          variant: "default"
        });
        setBookingConfirmed(true);
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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

  if (!deal) {
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
            <h2 className="text-2xl font-display text-white mb-4">Deal Not Found</h2>
            <p className="text-white/70 mb-8">The hotel deal you're looking for does not exist.</p>
            <Button onClick={() => navigate('/deals')} className="bg-gold hover:bg-gold-dark text-black">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotel Deals
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
            onClick={() => navigate('/deals')} 
            variant="outline" 
            className="mb-6 border-gold/50 text-gold hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotel Deals
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images */}
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1.5 rounded text-sm font-semibold">
                  {deal.deal}
                </div>
              </div>
              
              <div className="mt-6">
                <h1 className="text-3xl font-display font-bold text-white mb-2">{deal.name}</h1>
                <div className="flex items-center text-white/70 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>{deal.location}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    {[...Array(deal.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-4">
                  <h2 className="text-xl font-display font-semibold text-white mb-3">Description</h2>
                  <p className="text-white/70">
                    {deal.description || `Experience luxury and comfort at ${deal.name}, located in the heart of ${deal.location}. This exclusive deal includes premium accommodations with stunning views and world-class amenities. Perfect for both leisure and business travelers seeking an exceptional stay experience.`}
                  </p>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-6">
                  <h2 className="text-xl font-display font-semibold text-white mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Free WiFi</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Spa Access</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Fine Dining</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Airport Transfer</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Room Service</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Concierge</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Fitness Center</span>
                    </div>
                    <div className="flex items-center text-white/70">
                      <CheckCircle size={16} className="text-gold mr-2" />
                      <span>Premium Bedding</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Booking */}
            <div>
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-white mb-4">Booking Summary</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-white/70 mb-2">
                      <span>Regular Price</span>
                      <span className="line-through">${deal.regular_price}/night</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Member Price</span>
                      <span className="text-white font-semibold">${deal.member_price}/night</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gold">Silver Member Price</span>
                      <span className="text-gold font-semibold">${calculateSilverPrice(deal.regular_price, deal.member_price).toFixed(0)}/night</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/60 text-sm mb-6">
                    <Clock size={14} className="mr-1" />
                    {deal.duration}
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded mb-6">
                    <h4 className="text-white font-semibold mb-2">Deal Includes:</h4>
                    <ul className="text-white/70 space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Complimentary breakfast for two</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>One free spa treatment per stay</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Early check-in & late check-out</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={14} className="text-gold mr-2 mt-0.5" />
                        <span>Welcome drink on arrival</span>
                      </li>
                    </ul>
                  </div>
                  
                  {bookingConfirmed ? (
                    <div className="bg-gold/20 border border-gold p-4 rounded text-center">
                      <CheckCircle size={24} className="text-gold mx-auto mb-2" />
                      <h4 className="text-gold font-semibold mb-1">Booking Confirmed</h4>
                      <p className="text-white/70 text-sm">Your reservation has been successfully booked!</p>
                      <Button 
                        onClick={() => navigate('/my-bookings')} 
                        className="mt-3 w-full bg-gold hover:bg-gold-dark text-black font-semibold"
                      >
                        View My Bookings
                      </Button>
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
            <DialogTitle className="text-gold">Confirm Your Booking</DialogTitle>
            <DialogDescription className="text-white/70">
              Please review the details of your reservation before confirming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-white">Number of Guests</Label>
                <Input 
                  id="guests"
                  type="number"
                  min={1}
                  max={4}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bookingDate" className="text-white">Travel Date</Label>
                <Input 
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input 
                  id="phone"
                  type="tel"
                  placeholder="Your contact number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">Special Requests (Optional)</Label>
                <Textarea 
                  id="notes"
                  placeholder="Any special requirements or requests"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-[100px]"
                />
              </div>
              
              <div>
                <h4 className="text-white mb-2">Booking Summary</h4>
                <div className="bg-white/5 rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Hotel:</span>
                    <span className="text-white">{deal.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Location:</span>
                    <span className="text-white">{deal.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Duration:</span>
                    <span className="text-white">{deal.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Guests:</span>
                    <span className="text-white">{guestCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Price per night:</span>
                    <span className="text-gold">${calculateSilverPrice(deal.regular_price, deal.member_price).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialog(false)} className="border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} disabled={isSubmitting} className="bg-gold hover:bg-gold-dark text-black">
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin">⌛</span>
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelDealDetail;
