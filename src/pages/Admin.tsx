import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Hotel, 
  Map, 
  ShoppingBag, 
  FileText,
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';
import BlogManagement from '@/components/admin/BlogManagement';
import HotelDealsManagement from '@/components/admin/HotelDealsManagement';
import TourPackagesManagement from '@/components/admin/TourPackagesManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import UsersManagement from '@/components/admin/UsersManagement';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('dashboard')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant={activeTab === 'users' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </Button>
                <Button 
                  variant={activeTab === 'hotel-deals' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('hotel-deals')}
                >
                  <Hotel className="h-4 w-4 mr-2" />
                  Hotel Deals
                </Button>
                <Button 
                  variant={activeTab === 'tour-packages' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('tour-packages')}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Tour Packages
                </Button>
                <Button 
                  variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('orders')}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Orders
                </Button>
                <Button 
                  variant={activeTab === 'blogs' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('blogs')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Blog Posts
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'dashboard' && (
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Overview of your business metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                          <p className="text-3xl font-bold">1,248</p>
                        </div>
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Deals</p>
                          <p className="text-3xl font-bold">24</p>
                        </div>
                        <Hotel className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Sales This Month</p>
                          <p className="text-3xl font-bold">$24,800</p>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'users' && (
            <UsersManagement />
          )}
          
          {activeTab === 'blogs' && (
            <BlogManagement />
          )}
          
          {activeTab === 'hotel-deals' && (
            <HotelDealsManagement />
          )}
          
          {activeTab === 'tour-packages' && (
            <TourPackagesManagement />
          )}
          
          {activeTab === 'orders' && (
            <OrdersManagement />
          )}
          
          {(activeTab !== 'dashboard' && 
            activeTab !== 'users' &&
            activeTab !== 'blogs' && 
            activeTab !== 'hotel-deals' && 
            activeTab !== 'tour-packages' &&
            activeTab !== 'orders') && (
            <Card>
              <CardHeader>
                <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</CardTitle>
                <CardDescription>This section is under development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center text-muted-foreground">
                  <p>This feature will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
