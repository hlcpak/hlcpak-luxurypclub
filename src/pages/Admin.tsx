import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash, PlusCircle, Save, LogOut, Eye, Loader2, UserPlus } from 'lucide-react';
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-semibold text-white">Manage Members</h2>
              <button 
                onClick={handleAddUser}
                className="flex items-center bg-gold-dark hover:bg-gold text-white hover:text-black px-3 py-2 rounded-md transition-colors"
              >
                <UserPlus size={16} className="mr-2" />
                Add New Member
              </button>
            </div>
            
            {loadingUsers ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Membership</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Points</th>
                      <th className="text-center py-3 px-4 text-white/70 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/10 hover:bg-white/10">
                        <td className="py-3 px-4 text-white">
                          {editingUser?.id === user.id ? (
                            <input
                              type="text"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingUser?.id === user.id ? (
                            <input
                              type="email"
                              value={editingUser.email}
                              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingUser?.id === user.id ? (
                            <select
                              value={editingUser.membership_tier}
                              onChange={(e) => setEditingUser({...editingUser, membership_tier: e.target.value as 'Silver' | 'Gold' | 'Platinum'})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            >
                              <option value="Silver">Silver</option>
                              <option value="Gold">Gold</option>
                              <option value="Platinum">Platinum</option>
                            </select>
                          ) : (
                            <span className={`${user.membership_tier === 'Gold' ? 'text-gold' : 
                              user.membership_tier === 'Platinum' ? 'text-purple-400' : 'text-gray-300'}`}>
                              {user.membership_tier}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {editingUser?.id === user.id ? (
                            <input
                              type="number"
                              value={editingUser.points}
                              onChange={(e) => setEditingUser({...editingUser, points: parseInt(e.target.value)})}
                              className="w-full bg-black/50 border border-white/20 rounded-md px-2 py-1 text-white"
                            />
                          ) : (
                            user.points
                          )}
                        </td>
                        <td className="py-3 px-4 flex justify-center space-x-2">
                          {editingUser?.id === user.id ? (
                            <button 
                              onClick={handleUpdateUser}
                              className="p-1 text-gold hover:text-white transition-colors"
                            >
                              <Save size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleEditUser(user)}
                              className="p-1 text-white/70 hover:text-gold transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
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
          
          <TabsContent value="content" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Manage Website Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">Home Page Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="Luxury Privilege Club"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Hero Subtitle
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="Exclusive travel experiences for the discerning few"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Featured Section Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="Featured Luxury Destinations"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">About Page Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      About Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="About Luxury Privilege Club"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Company Description
                    </label>
                    <textarea
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white h-24"
                      defaultValue="Luxury Privilege Club is an exclusive travel club offering exceptional experiences and unparalleled service to our members."
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Website Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Website Title
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="Luxury Privilege Club"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="contact@luxuryprivilegeclub.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="+1 (800) 123-4567"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">Social Media</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="https://instagram.com/luxuryprivilegeclub"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Facebook
                    </label>
                    <input
                      type="url"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="https://facebook.com/luxuryprivilegeclub"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Twitter
                    </label>
                    <input
                      type="url"
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white"
                      defaultValue="https://twitter.com/luxuryclub"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
