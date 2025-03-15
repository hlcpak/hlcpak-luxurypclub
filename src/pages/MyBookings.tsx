
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Order } from '@/lib/supabase';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Hotel, Map, Calendar, Users, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        if (user) {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching bookings:', error);
          } else {
            setBookings(data || []);
          }
        }
      } catch (err) {
        console.error('Error in fetchBookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'hotel' ? 
      <Hotel className="h-5 w-5 text-gold" /> : 
      <Map className="h-5 w-5 text-gold" />;
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      <main className="pt-24 pb-12 bg-black min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-white">My Bookings</h1>
              <p className="text-white/70 mt-2">View and manage your travel reservations</p>
            </div>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="mt-4 md:mt-0 border-gold/50 text-gold hover:bg-gold/10"
            >
              Explore More Deals
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <span className="ml-2 text-white">Loading your bookings...</span>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="h-20 w-20 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                    <Hotel className="h-10 w-10 text-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">No Bookings Yet</h3>
                <p className="text-white/70 mb-6">
                  You haven't made any bookings yet. Explore our exclusive hotel deals and tour packages.
                </p>
                <Button 
                  onClick={() => navigate('/deals')} 
                  className="bg-gold hover:bg-gold-dark text-black mr-2"
                >
                  Browse Hotel Deals
                </Button>
                <Button 
                  onClick={() => navigate('/packages')} 
                  variant="outline" 
                  className="border-gold/50 text-gold hover:bg-gold/10 mt-2 sm:mt-0"
                >
                  Explore Tour Packages
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-white/5 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getTypeIcon(booking.booking_type)}
                        <CardTitle className="text-white ml-2">
                          {booking.booking_type === 'hotel' ? 'Hotel Stay' : 'Tour Package'}
                        </CardTitle>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <CardDescription className="text-white/70">
                      Booking #{booking.id} - {new Date(booking.booking_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-display font-bold text-gold mb-4">
                      {booking.item_name}
                    </h3>
                    <div className="space-y-3 text-white/80 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gold" />
                        <span>Travel Date: {new Date(booking.travel_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gold" />
                        <span>Guests: {booking.guests}</span>
                      </div>
                      <div className="flex items-center">
                        <Banknote className="h-4 w-4 mr-2 text-gold" />
                        <span>Total Price: ${Number(booking.total_price).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate(
                        booking.booking_type === 'hotel' 
                          ? `/deals/${booking.item_id}` 
                          : `/packages/${booking.item_id}`
                      )} 
                      variant="outline" 
                      className="w-full border-gold/50 text-gold hover:bg-gold/10"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
