import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash, PlusCircle, Save, LogOut, Eye, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getHotelDeals, 
  getTourPackages, 
  addHotelDeal, 
  updateHotelDeal, 
  deleteHotelDeal,
  addTourPackage,
  updateTourPackage,
  deleteTourPackage,
  HotelDeal,
  TourPackage
} from '@/lib/supabase';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hotelDeals, setHotelDeals] = useState<HotelDeal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [editingDeal, setEditingDeal] = useState<HotelDeal | null>(null);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHotelDeals();
      fetchTourPackages();
    }
  }, [isAuthenticated]);

  const fetchHotelDeals = async () => {
    try {
      setLoadingDeals(true);
      const deals = await getHotelDeals();
      setHotelDeals(deals);
    } catch (error) {
      console.error('Error fetching hotel deals:', error);
      toast({
        title: "Error",
        description: "Failed to load hotel deals",
        variant: "destructive"
      });
    } finally {
      setLoadingDeals(false);
    }
  };

  const fetchTourPackages = async () => {
    try {
      setLoadingPackages(true);
      const packages = await getTourPackages();
      setTourPackages(packages);
    } catch (error) {
      console.error('Error fetching tour packages:', error);
      toast({
        title: "Error",
        description: "Failed to load tour packages",
        variant: "destructive"
      });
    } finally {
      setLoadingPackages(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Luxury@123') {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid username or password",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleAddHotelDeal = async () => {
    const newDeal: Omit<HotelDeal, 'id' | 'created_at'> = {
      name: 'New Hotel Deal',
      location: 'Location',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'New Deal',
      regular_price: 1000,
      member_price: 800,
      duration: '3 nights'
    };

    try {
      const addedDeal = await addHotelDeal(newDeal);
      if (addedDeal) {
        setHotelDeals([...hotelDeals, addedDeal]);
        toast({
          title: "Success",
          description: "Hotel deal added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding hotel deal:', error);
      toast({
        title: "Error",
        description: "Failed to add hotel deal",
        variant: "destructive"
      });
    }
  };

  const handleEditHotelDeal = (deal: HotelDeal) => {
    setEditingDeal(deal);
  };

  const handleUpdateHotelDeal = async () => {
    if (!editingDeal) return;

    try {
      const updatedDeal = await updateHotelDeal(editingDeal.id, editingDeal);
      if (updatedDeal) {
        setHotelDeals(hotelDeals.map(d => d.id === updatedDeal.id ? updatedDeal : d));
        setEditingDeal(null);
        toast({
          title: "Success",
          description: "Hotel deal updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating hotel deal:', error);
      toast({
        title: "Error",
        description: "Failed to update hotel deal",
        variant: "destructive"
      });
    }
  };

  const handleDeleteHotelDeal = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this hotel deal?')) {
      try {
        const success = await deleteHotelDeal(id);
        if (success) {
          setHotelDeals(hotelDeals.filter(d => d.id !== id));
          toast({
            title: "Success",
            description: "Hotel deal deleted successfully",
          });
        }
      } catch (error) {
        console.error('Error deleting hotel deal:', error);
        toast({
          title: "Error",
          description: "Failed to delete hotel deal",
          variant: "destructive"
        });
      }
    }
  };

  const handleAddTourPackage = async () => {
    const newPackage: Omit<TourPackage, 'id' | 'created_at'> = {
      name: 'New Tour Package',
      location: 'Destination',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      deal: 'New Package Deal',
      regular_price: 5000,
      member_price: 4000,
      duration: '7 nights'
    };

    try {
      const addedPackage = await addTourPackage(newPackage);
      if (addedPackage) {
        setTourPackages([...tourPackages, addedPackage]);
        toast({
          title: "Success",
          description: "Tour package added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding tour package:', error);
      toast({
        title: "Error",
        description: "Failed to add tour package",
        variant: "destructive"
      });
    }
  };

  const handleEditTourPackage = (pkg: TourPackage) => {
    setEditingPackage(pkg);
  };

  const handleUpdateTourPackage = async () => {
    if (!editingPackage) return;

    try {
      const updatedPackage = await updateTourPackage(editingPackage.id, editingPackage);
      if (updatedPackage) {
        setTourPackages(tourPackages.map(p => p.id === updatedPackage.id ? updatedPackage : p));
        setEditingPackage(null);
        toast({
          title: "Success",
          description: "Tour package updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating tour package:', error);
      toast({
        title: "Error",
        description: "Failed to update tour package",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTourPackage = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      try {
        const success = await deleteTourPackage(id);
        if (success) {
          setTourPackages(tourPackages.filter(p => p.id !== id));
          toast({
            title: "Success",
            description: "Tour package deleted successfully",
          });
        }
      } catch (error) {
        console.error('Error deleting tour package:', error);
        toast({
          title: "Error",
          description: "Failed to delete tour package",
          variant: "destructive"
        });
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-gold">Admin Login</h1>
            <p className="text-white/70 mt-2">Sign in to access the admin dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white mb-1">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-black font-medium py-2 rounded-md transition-colors mt-2"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-gold-dark hover:text-gold text-sm"
              >
                Return to website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-display font-bold text-gold">Admin Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 hover:text-gold transition-colors"
            >
              <Eye size={16} className="mr-1" />
              View Site
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center text-white/80 hover:text-gold transition-colors"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-4 md:p-6">
        <Tabs defaultValue="deals">
          <TabsList className="mb-8 bg-white/5 border border-white/10">
            <TabsTrigger value="deals">Hotel Deals</TabsTrigger>
            <TabsTrigger value="packages">Tour Packages</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="content">Website Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deals" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-semibold text-white">Manage Hotel Deals</h2>
              <button 
                onClick={handleAddHotelDeal}
                className="flex items-center bg-gold-dark hover:bg-gold text-white hover:text-black px-3 py-2 rounded-md transition-colors"
              >
                <PlusCircle size={16} className="mr-2" />
                Add New Deal
              </button>
            </div>
            
            {loadingDeals ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Hotel Name</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Location</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Original Price</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Member Price</th>
                      <th className="text-center py-3 px-4 text-white/70 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelDeals.map((deal) => (
                      <tr key={deal.id} className="border-b border-white/10 hover:bg-white/10">
                        <td className="py-3 px-4 text-white">
                          {editingDeal?.id === deal.id ? (
                            <input
                              type="text"
                              value={editingDeal.name}
                              onChange={(e) => setEditingDeal({...editingDeal, name: e.target.value})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            deal.name
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingDeal?.id === deal.id ? (
                            <input
                              type="text"
                              value={editingDeal.location}
                              onChange={(e) => setEditingDeal({...editingDeal, location: e.target.value})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            deal.location
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingDeal?.id === deal.id ? (
                            <input
                              type="number"
                              value={editingDeal.regular_price}
                              onChange={(e) => setEditingDeal({...editingDeal, regular_price: parseInt(e.target.value)})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            `$${deal.regular_price}`
                          )}
                        </td>
                        <td className="py-3 px-4 text-gold">
                          {editingDeal?.id === deal.id ? (
                            <input
                              type="number"
                              value={editingDeal.member_price}
                              onChange={(e) => setEditingDeal({...editingDeal, member_price: parseInt(e.target.value)})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            `$${deal.member_price}`
                          )}
                        </td>
                        <td className="py-3 px-4 flex justify-center space-x-2">
                          {editingDeal?.id === deal.id ? (
                            <button 
                              onClick={handleUpdateHotelDeal}
                              className="p-1 text-gold hover:text-white transition-colors"
                            >
                              <Save size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleEditHotelDeal(deal)}
                              className="p-1 text-white/70 hover:text-gold transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteHotelDeal(deal.id)}
                            className="p-1 text-white/70 hover:text-red-500 transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="packages" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-semibold text-white">Manage Tour Packages</h2>
              <button 
                onClick={handleAddTourPackage}
                className="flex items-center bg-gold-dark hover:bg-gold text-white hover:text-black px-3 py-2 rounded-md transition-colors"
              >
                <PlusCircle size={16} className="mr-2" />
                Add New Package
              </button>
            </div>
            
            {loadingPackages ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Package Name</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Destination</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Regular Price</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Member Price</th>
                      <th className="text-center py-3 px-4 text-white/70 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourPackages.map((pkg) => (
                      <tr key={pkg.id} className="border-b border-white/10 hover:bg-white/10">
                        <td className="py-3 px-4 text-white">
                          {editingPackage?.id === pkg.id ? (
                            <input
                              type="text"
                              value={editingPackage.name}
                              onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            pkg.name
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingPackage?.id === pkg.id ? (
                            <input
                              type="text"
                              value={editingPackage.location}
                              onChange={(e) => setEditingPackage({...editingPackage, location: e.target.value})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            pkg.location
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingPackage?.id === pkg.id ? (
                            <input
                              type="number"
                              value={editingPackage.regular_price}
                              onChange={(e) => setEditingPackage({...editingPackage, regular_price: parseInt(e.target.value)})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            `$${pkg.regular_price}`
                          )}
                        </td>
                        <td className="py-3 px-4 text-gold">
                          {editingPackage?.id === pkg.id ? (
                            <input
                              type="number"
                              value={editingPackage.member_price}
                              onChange={(e) => setEditingPackage({...editingPackage, member_price: parseInt(e.target.value)})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            `$${pkg.member_price}`
                          )}
                        </td>
                        <td className="py-3 px-4 flex justify-center space-x-2">
                          {editingPackage?.id === pkg.id ? (
                            <button 
                              onClick={handleUpdateTourPackage}
                              className="p-1 text-gold hover:text-white transition-colors"
                            >
                              <Save size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleEditTourPackage(pkg)}
                              className="p-1 text-white/70 hover:text-gold transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteTourPackage(pkg.id)}
                            className="p-1 text-white/70 hover:text-red-500 transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="members" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Manage Members</h2>
            <p className="text-white/70">Membership management functionality will be implemented here.</p>
          </TabsContent>
          
          <TabsContent value="content" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Manage Website Content</h2>
            <p className="text-white/70">Content management functionality will be implemented here.</p>
          </TabsContent>
          
          <TabsContent value="settings" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Website Settings</h2>
            <p className="text-white/70">Settings management functionality will be implemented here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
