
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersManagement from '@/components/admin/UsersManagement';
import HotelDealsManagement from '@/components/admin/HotelDealsManagement';
import TourPackagesManagement from '@/components/admin/TourPackagesManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import CreateMasterAdmin from '@/components/admin/CreateMasterAdmin';
import { useAuth } from '@/contexts/AuthContext';
import { OrderFilterState } from '@/types/admin';

const Admin = () => {
  const [filterState, setFilterState] = useState<OrderFilterState>({
    status: 'all',
    dateRange: {
      from: null,
      to: null,
    },
  });
  const [currentTab, setCurrentTab] = useState('users');

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="mb-8 text-gray-600">Manage your website content, users, and bookings</p>
        
        <CreateMasterAdmin />
        
        <Tabs defaultValue="users" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="hotel-deals">Hotel Deals</TabsTrigger>
            <TabsTrigger value="tour-packages">Tour Packages</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>

          <TabsContent value="hotel-deals">
            <HotelDealsManagement />
          </TabsContent>

          <TabsContent value="tour-packages">
            <TourPackagesManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManagement 
              filterState={filterState}
              setFilterState={setFilterState}
            />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
