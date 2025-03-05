import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash, PlusCircle, Save, LogOut, Eye, Loader2, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getHotelDeals, 
  getTourPackages,
  getUsers,
  getTransactions,
  addHotelDeal, 
  updateHotelDeal, 
  deleteHotelDeal,
  addTourPackage,
  updateTourPackage,
  deleteTourPackage,
  addUser,
  updateUser,
  deleteUser,
  HotelDeal,
  TourPackage,
  User,
  Transaction
} from '@/lib/supabase';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hotelDeals, setHotelDeals] = useState<HotelDeal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [editingDeal, setEditingDeal] = useState<HotelDeal | null>(null);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddDealForm, setShowAddDealForm] = useState(false);
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [newDeal, setNewDeal] = useState<Omit<HotelDeal, 'id' | 'created_at'>>({
    name: '',
    location: '',
    image: '',
    rating: 5,
    deal: '',
    regular_price: 0,
    member_price: 0,
    duration: '',
    description: ''
  });
  const [newPackage, setNewPackage] = useState<Omit<TourPackage, 'id' | 'created_at'>>({
    name: '',
    location: '',
    image: '',
    rating: 5,
    deal: '',
    regular_price: 0,
    member_price: 0,
    duration: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHotelDeals();
      fetchTourPackages();
      fetchUsers();
      fetchTransactions();
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

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const usersList = await getUsers();
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const transactionsList = await getTransactions();
      setTransactions(transactionsList);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive"
      });
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
    setShowAddDealForm(true);
  };

  const handleSubmitNewDeal = async () => {
    // Validation
    if (!newDeal.name || !newDeal.location || !newDeal.image || !newDeal.deal || 
        !newDeal.duration || newDeal.regular_price <= 0 || newDeal.member_price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const addedDeal = await addHotelDeal(newDeal);
      if (addedDeal) {
        setHotelDeals([...hotelDeals, addedDeal]);
        setShowAddDealForm(false);
        // Reset form
        setNewDeal({
          name: '',
          location: '',
          image: '',
          rating: 5,
          deal: '',
          regular_price: 0,
          member_price: 0,
          duration: '',
          description: ''
        });
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
    setShowAddPackageForm(true);
  };

  const handleSubmitNewPackage = async () => {
    // Validation
    if (!newPackage.name || !newPackage.location || !newPackage.image || !newPackage.deal || 
        !newPackage.duration || newPackage.regular_price <= 0 || newPackage.member_price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const addedPackage = await addTourPackage(newPackage);
      if (addedPackage) {
        setTourPackages([...tourPackages, addedPackage]);
        setShowAddPackageForm(false);
        // Reset form
        setNewPackage({
          name: '',
          location: '',
          image: '',
          rating: 5,
          deal: '',
          regular_price: 0,
          member_price: 0,
          duration: '',
          description: ''
        });
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

  const handleAddUser = async () => {
    const newUser: Omit<User, 'id' | 'created_at'> = {
      name: 'New Member',
      email: 'member@example.com',
      membership_tier: 'Silver',
      points: 0
    };

    try {
      const addedUser = await addUser(newUser);
      if (addedUser) {
        setUsers([addedUser, ...users]);
        toast({
          title: "Success",
          description: "Member added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive"
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      const updatedUser = await updateUser(editingUser.id, editingUser);
      if (updatedUser) {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setEditingUser(null);
        toast({
          title: "Success",
          description: "Member updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating member:', error);
      toast({
        title: "Error",
        description: "Failed to update member",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const success = await deleteUser(id);
        if (success) {
          setUsers(users.filter(u => u.id !== id));
          toast({
            title: "Success",
            description: "Member deleted successfully",
          });
        }
      } catch (error) {
        console.error('Error deleting member:', error);
        toast({
          title: "Error",
          description: "Failed to delete member",
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
            
            {showAddDealForm && (
              <div className="mb-8 bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Add New Hotel Deal</h3>
                  <button 
                    onClick={() => setShowAddDealForm(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Hotel Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newDeal.name}
                      onChange={(e) => setNewDeal({...newDeal, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. Grand Plaza Resort"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newDeal.location}
                      onChange={(e) => setNewDeal({...newDeal, location: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. Maldives"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newDeal.image}
                      onChange={(e) => setNewDeal({...newDeal, image: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newDeal.rating}
                      onChange={(e) => setNewDeal({...newDeal, rating: parseInt(e.target.value)})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                    >
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Deal Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newDeal.deal}
                      onChange={(e) => setNewDeal({...newDeal, deal: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. Save 30% + Free Breakfast"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Regular Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={newDeal.regular_price}
                      onChange={(e) => setNewDeal({...newDeal, regular_price: parseInt(e.target.value)})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. 1200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Member Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={newDeal.member_price}
                      onChange={(e) => setNewDeal({...newDeal, member_price: parseInt(e.target.value)})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. 850"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Duration <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newDeal.duration}
                      onChange={(e) => setNewDeal({...newDeal, duration: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. 3 nights"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newDeal.description || ''}
                      onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white h-24"
                      placeholder="Describe the hotel deal"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setShowAddDealForm(false)}
                    className="px-4 py-2 border border-white/20 text-white/70 rounded-md hover:bg-white/10 mr-2"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitNewDeal}
                    className="px-4 py-2 bg-gold-dark text-white rounded-md hover:bg-gold hover:text-black"
                  >
                    Save Deal
                  </button>
                </div>
              </div>
            )}
            
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

            {showAddPackageForm && (
              <div className="mb-8 bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Add New Tour Package</h3>
                  <button 
                    onClick={() => setShowAddPackageForm(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Package Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPackage.name}
                      onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. European Elegance Tour"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPackage.location}
                      onChange={(e) => setNewPackage({...newPackage, location: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. France, Italy, Switzerland"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPackage.image}
                      onChange={(e) => setNewPackage({...newPackage, image: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newPackage.rating}
                      onChange={(e) => setNewPackage({...newPackage, rating: parseInt(e.target.value)})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                    >
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Deal Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPackage.deal}
                      onChange={(e) => setNewPackage({...newPackage, deal: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      placeholder="e.g. Early Bird Discount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-
