
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash, PlusCircle, Save, LogOut, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <button className="flex items-center bg-gold-dark hover:bg-gold text-white hover:text-black px-3 py-2 rounded-md transition-colors">
                <PlusCircle size={16} className="mr-2" />
                Add New Deal
              </button>
            </div>
            
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
                  <tr className="border-b border-white/10 hover:bg-white/10">
                    <td className="py-3 px-4 text-white">Four Seasons Bora Bora</td>
                    <td className="py-3 px-4 text-white">Bora Bora, French Polynesia</td>
                    <td className="py-3 px-4 text-white">$1,200</td>
                    <td className="py-3 px-4 text-gold">$850</td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button className="p-1 text-white/70 hover:text-gold transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1 text-white/70 hover:text-red-500 transition-colors">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/10">
                    <td className="py-3 px-4 text-white">Aman Tokyo</td>
                    <td className="py-3 px-4 text-white">Tokyo, Japan</td>
                    <td className="py-3 px-4 text-white">$950</td>
                    <td className="py-3 px-4 text-gold">$720</td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button className="p-1 text-white/70 hover:text-gold transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1 text-white/70 hover:text-red-500 transition-colors">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="packages" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-semibold text-white">Manage Tour Packages</h2>
              <button className="flex items-center bg-gold-dark hover:bg-gold text-white hover:text-black px-3 py-2 rounded-md transition-colors">
                <PlusCircle size={16} className="mr-2" />
                Add New Package
              </button>
            </div>
            
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
                  <tr className="border-b border-white/10 hover:bg-white/10">
                    <td className="py-3 px-4 text-white">Luxury Maldives Retreat</td>
                    <td className="py-3 px-4 text-white">Maldives</td>
                    <td className="py-3 px-4 text-white">$4,500</td>
                    <td className="py-3 px-4 text-gold">$3,200</td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button className="p-1 text-white/70 hover:text-gold transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1 text-white/70 hover:text-red-500 transition-colors">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/10">
                    <td className="py-3 px-4 text-white">Italian Riviera Exploration</td>
                    <td className="py-3 px-4 text-white">Italy</td>
                    <td className="py-3 px-4 text-white">$5,500</td>
                    <td className="py-3 px-4 text-gold">$4,100</td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <button className="p-1 text-white/70 hover:text-gold transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1 text-white/70 hover:text-red-500 transition-colors">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
