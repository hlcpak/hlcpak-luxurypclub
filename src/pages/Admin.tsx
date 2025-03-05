
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2, Plus, Edit, Trash, Check, X, Search, ChevronDown } from "lucide-react";
import { 
  getHotelDeals, 
  getTourPackages, 
  getTransactions, 
  getUsers, 
  getWebsiteContent,
  updateWebsiteContent,
  getSystemSettings,
  updateSystemSetting,
  addHotelDeal, 
  updateHotelDeal, 
  deleteHotelDeal, 
  addTourPackage, 
  updateTourPackage, 
  deleteTourPackage,
  addUser,
  updateUser,
  deleteUser,
  addTransaction,
  HotelDeal,
  TourPackage,
  User,
  Transaction,
  WebsiteContent,
  SiteSetting
} from "@/lib/supabase";

const Admin = () => {
  // State for data
  const [users, setUsers] = useState<User[]>([]);
  const [hotelDeals, setHotelDeals] = useState<HotelDeal[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent[]>([]);
  const [systemSettings, setSystemSettings] = useState<SiteSetting[]>([]);
  
  // Loading states
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);
  
  // Editing states
  const [editingDeal, setEditingDeal] = useState<HotelDeal | null>(null);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingContent, setEditingContent] = useState<WebsiteContent | null>(null);
  const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
  
  // Form display states
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
  
  const [newUser, setNewUser] = useState<Omit<User, 'id' | 'created_at'>>({
    name: '',
    email: '',
    membership_tier: 'Silver',
    points: 0
  });
  
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: 'deal' | 'package' | 'user', id: number | string } | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Search filters
  const [dealSearchTerm, setDealSearchTerm] = useState('');
  const [packageSearchTerm, setPackageSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  
  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        setLoadingUsers(true);
        const userData = await getUsers();
        setUsers(userData);
        setLoadingUsers(false);
        
        // Fetch hotel deals
        setLoadingDeals(true);
        const dealData = await getHotelDeals();
        setHotelDeals(dealData);
        setLoadingDeals(false);
        
        // Fetch tour packages
        setLoadingPackages(true);
        const packageData = await getTourPackages();
        setTourPackages(packageData);
        setLoadingPackages(false);
        
        // Fetch transactions
        setLoadingTransactions(true);
        const transactionData = await getTransactions();
        setTransactions(transactionData);
        setLoadingTransactions(false);
        
        // Fetch website content
        setLoadingContent(true);
        const contentData = await getWebsiteContent();
        setWebsiteContent(contentData);
        setLoadingContent(false);
        
        // Fetch system settings
        setLoadingSettings(true);
        const settingsData = await getSystemSettings();
        setSystemSettings(settingsData);
        setLoadingSettings(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast({
          title: "Error",
          description: "Failed to load some admin data. Please try refreshing the page.",
          variant: "destructive",
        });
      }
    };
    
    fetchData();
  }, []);
  
  // Handle editing website content
  const handleEditContent = (content: WebsiteContent) => {
    setEditingContent(content);
  };
  
  const handleSaveContent = async () => {
    if (!editingContent) return;
    
    try {
      const updatedContent = await updateWebsiteContent(editingContent.id, {
        title: editingContent.title,
        content: editingContent.content,
        active: editingContent.active
      });
      
      if (updatedContent) {
        setWebsiteContent(prev => 
          prev.map(item => item.id === updatedContent.id ? updatedContent : item)
        );
        
        toast({
          title: "Success",
          description: "Website content updated successfully",
        });
        
        setEditingContent(null);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Failed to update website content",
        variant: "destructive",
      });
    }
  };
  
  // Handle editing system settings
  const handleEditSetting = (setting: SiteSetting) => {
    setEditingSetting(setting);
  };
  
  const handleSaveSetting = async () => {
    if (!editingSetting) return;
    
    try {
      const updatedSetting = await updateSystemSetting(
        editingSetting.id, 
        editingSetting.setting_value
      );
      
      if (updatedSetting) {
        setSystemSettings(prev => 
          prev.map(item => item.id === updatedSetting.id ? updatedSetting : item)
        );
        
        toast({
          title: "Success",
          description: "System setting updated successfully",
        });
        
        setEditingSetting(null);
      }
    } catch (error) {
      console.error("Error updating setting:", error);
      toast({
        title: "Error",
        description: "Failed to update system setting",
        variant: "destructive",
      });
    }
  };
  
  // Handle adding a new hotel deal
  const handleAddDeal = async () => {
    try {
      const newDealData = await addHotelDeal(newDeal);
      if (newDealData) {
        setHotelDeals(prev => [...prev, newDealData]);
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
        setShowAddDealForm(false);
        toast({
          title: "Success",
          description: "Hotel deal added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding hotel deal:", error);
      toast({
        title: "Error",
        description: "Failed to add hotel deal",
        variant: "destructive",
      });
    }
  };
  
  // Handle updating a hotel deal
  const handleUpdateDeal = async () => {
    if (!editingDeal) return;
    
    try {
      const updatedDeal = await updateHotelDeal(editingDeal.id, {
        name: editingDeal.name,
        location: editingDeal.location,
        image: editingDeal.image,
        rating: editingDeal.rating,
        deal: editingDeal.deal,
        regular_price: editingDeal.regular_price,
        member_price: editingDeal.member_price,
        duration: editingDeal.duration,
        description: editingDeal.description
      });
      
      if (updatedDeal) {
        setHotelDeals(prev => 
          prev.map(item => item.id === updatedDeal.id ? updatedDeal : item)
        );
        
        toast({
          title: "Success",
          description: "Hotel deal updated successfully",
        });
        
        setEditingDeal(null);
      }
    } catch (error) {
      console.error("Error updating hotel deal:", error);
      toast({
        title: "Error",
        description: "Failed to update hotel deal",
        variant: "destructive",
      });
    }
  };
  
  // Handle deleting a hotel deal
  const handleDeleteDeal = async (id: number) => {
    try {
      const success = await deleteHotelDeal(id);
      if (success) {
        setHotelDeals(prev => prev.filter(item => item.id !== id));
        toast({
          title: "Success",
          description: "Hotel deal deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting hotel deal:", error);
      toast({
        title: "Error",
        description: "Failed to delete hotel deal",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(null);
    }
  };
  
  // Handle adding a new tour package
  const handleAddPackage = async () => {
    try {
      const newPackageData = await addTourPackage(newPackage);
      if (newPackageData) {
        setTourPackages(prev => [...prev, newPackageData]);
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
        setShowAddPackageForm(false);
        toast({
          title: "Success",
          description: "Tour package added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding tour package:", error);
      toast({
        title: "Error",
        description: "Failed to add tour package",
        variant: "destructive",
      });
    }
  };
  
  // Handle updating a tour package
  const handleUpdatePackage = async () => {
    if (!editingPackage) return;
    
    try {
      const updatedPackage = await updateTourPackage(editingPackage.id, {
        name: editingPackage.name,
        location: editingPackage.location,
        image: editingPackage.image,
        rating: editingPackage.rating,
        deal: editingPackage.deal,
        regular_price: editingPackage.regular_price,
        member_price: editingPackage.member_price,
        duration: editingPackage.duration,
        description: editingPackage.description
      });
      
      if (updatedPackage) {
        setTourPackages(prev => 
          prev.map(item => item.id === updatedPackage.id ? updatedPackage : item)
        );
        
        toast({
          title: "Success",
          description: "Tour package updated successfully",
        });
        
        setEditingPackage(null);
      }
    } catch (error) {
      console.error("Error updating tour package:", error);
      toast({
        title: "Error",
        description: "Failed to update tour package",
        variant: "destructive",
      });
    }
  };
  
  // Handle deleting a tour package
  const handleDeletePackage = async (id: number) => {
    try {
      const success = await deleteTourPackage(id);
      if (success) {
        setTourPackages(prev => prev.filter(item => item.id !== id));
        toast({
          title: "Success",
          description: "Tour package deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting tour package:", error);
      toast({
        title: "Error",
        description: "Failed to delete tour package",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(null);
    }
  };
  
  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      const newUserData = await addUser(newUser);
      if (newUserData) {
        setUsers(prev => [...prev, newUserData]);
        setNewUser({
          name: '',
          email: '',
          membership_tier: 'Silver',
          points: 0
        });
        setShowAddUserForm(false);
        toast({
          title: "Success",
          description: "User added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
    }
  };
  
  // Handle updating a user
  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    try {
      const updatedUser = await updateUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email,
        membership_tier: editingUser.membership_tier,
        points: editingUser.points
      });
      
      if (updatedUser) {
        setUsers(prev => 
          prev.map(item => item.id === updatedUser.id ? updatedUser : item)
        );
        
        toast({
          title: "Success",
          description: "User updated successfully",
        });
        
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };
  
  // Handle deleting a user
  const handleDeleteUser = async (id: string) => {
    try {
      const success = await deleteUser(id);
      if (success) {
        setUsers(prev => prev.filter(item => item.id !== id));
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  // Filter hotel deals based on search term
  const filteredHotelDeals = hotelDeals.filter(deal => 
    deal.name.toLowerCase().includes(dealSearchTerm.toLowerCase()) ||
    deal.location.toLowerCase().includes(dealSearchTerm.toLowerCase())
  );
  
  // Filter tour packages based on search term
  const filteredTourPackages = tourPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(packageSearchTerm.toLowerCase()) ||
    pkg.location.toLowerCase().includes(packageSearchTerm.toLowerCase())
  );
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );
  
  // Chart data for dashboard
  const membershipData = [
    { name: 'Silver', value: users.filter(u => u.membership_tier === 'Silver').length },
    { name: 'Gold', value: users.filter(u => u.membership_tier === 'Gold').length },
    { name: 'Platinum', value: users.filter(u => u.membership_tier === 'Platinum').length },
  ];
  
  const transactionData = [
    { name: 'Silver', amount: transactions.filter(t => t.membership_type === 'Silver').reduce((acc, t) => acc + t.amount, 0) },
    { name: 'Gold', amount: transactions.filter(t => t.membership_type === 'Gold').reduce((acc, t) => acc + t.amount, 0) },
    { name: 'Platinum', amount: transactions.filter(t => t.membership_type === 'Platinum').reduce((acc, t) => acc + t.amount, 0) },
  ];
  
  const COLORS = ['#C0C0C0', '#FFD700', '#E5E4E2'];
  
  // Render add deal form
  const renderAddDealForm = () => (
    <Dialog open={showAddDealForm} onOpenChange={setShowAddDealForm}>
      <DialogContent className="bg-black border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Add New Hotel Deal</DialogTitle>
          <DialogDescription>
            Fill in the details for the new hotel deal
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={newDeal.name} 
              onChange={(e) => setNewDeal({...newDeal, name: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={newDeal.location} 
              onChange={(e) => setNewDeal({...newDeal, location: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              value={newDeal.image} 
              onChange={(e) => setNewDeal({...newDeal, image: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select onValueChange={(value) => setNewDeal({...newDeal, rating: parseInt(value)})}>
              <SelectTrigger className="bg-black/50 border-white/20">
                <SelectValue placeholder="Select Rating" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10 text-white">
                {[1, 2, 3, 4, 5].map(rating => (
                  <SelectItem key={rating} value={rating.toString()}>{rating} Stars</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deal">Deal</Label>
            <Input 
              id="deal" 
              value={newDeal.deal} 
              onChange={(e) => setNewDeal({...newDeal, deal: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regular_price">Regular Price</Label>
            <Input 
              type="number"
              id="regular_price" 
              value={newDeal.regular_price} 
              onChange={(e) => setNewDeal({...newDeal, regular_price: parseFloat(e.target.value)})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member_price">Member Price</Label>
            <Input 
              type="number"
              id="member_price" 
              value={newDeal.member_price} 
              onChange={(e) => setNewDeal({...newDeal, member_price: parseFloat(e.target.value)})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration" 
              value={newDeal.duration} 
              onChange={(e) => setNewDeal({...newDeal, duration: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              value={newDeal.description} 
              onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddDealForm(false)}>Cancel</Button>
          <Button onClick={handleAddDeal}>Add Deal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  // Render add package form
  const renderAddPackageForm = () => (
    <Dialog open={showAddPackageForm} onOpenChange={setShowAddPackageForm}>
      <DialogContent className="bg-black border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Add New Tour Package</DialogTitle>
          <DialogDescription>
            Fill in the details for the new tour package
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={newPackage.name} 
              onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={newPackage.location} 
              onChange={(e) => setNewPackage({...newPackage, location: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              value={newPackage.image} 
              onChange={(e) => setNewPackage({...newPackage, image: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select onValueChange={(value) => setNewPackage({...newPackage, rating: parseInt(value)})}>
              <SelectTrigger className="bg-black/50 border-white/20">
                <SelectValue placeholder="Select Rating" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10 text-white">
                {[1, 2, 3, 4, 5].map(rating => (
                  <SelectItem key={rating} value={rating.toString()}>{rating} Stars</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deal">Deal</Label>
            <Input 
              id="deal" 
              value={newPackage.deal} 
              onChange={(e) => setNewPackage({...newPackage, deal: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regular_price">Regular Price</Label>
            <Input 
              type="number"
              id="regular_price" 
              value={newPackage.regular_price} 
              onChange={(e) => setNewPackage({...newPackage, regular_price: parseFloat(e.target.value)})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member_price">Member Price</Label>
            <Input 
              type="number"
              id="member_price" 
              value={newPackage.member_price} 
              onChange={(e) => setNewPackage({...newPackage, member_price: parseFloat(e.target.value)})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration" 
              value={newPackage.duration} 
              onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              value={newPackage.description} 
              onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddPackageForm(false)}>Cancel</Button>
          <Button onClick={handleAddPackage}>Add Package</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  // Render add user form
  const renderAddUserForm = () => (
    <Dialog open={showAddUserForm} onOpenChange={setShowAddUserForm}>
      <DialogContent className="bg-black border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details for the new user
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={newUser.name} 
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={newUser.email} 
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="bg-black/50 border-white/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="membership_tier">Membership Tier</Label>
            <Select onValueChange={(value) => setNewUser({...newUser, membership_tier: value as 'Silver' | 'Gold' | 'Platinum'})}>
              <SelectTrigger className="bg-black/50 border-white/20">
                <SelectValue placeholder="Select Tier" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10 text-white">
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input 
              type="number"
              id="points" 
              value={newUser.points} 
              onChange={(e) => setNewUser({...newUser, points: parseInt(e.target.value)})}
              className="bg-black/50 border-white/20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddUserForm(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-white/10 py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gold">Luxury Privilege Club Admin</h1>
          <div className="flex items-center space-x-4">
            <span>Admin User</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-black border border-white/10">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="hotel-deals">Hotel Deals</TabsTrigger>
            <TabsTrigger value="tour-packages">Tour Packages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="website-content">Website Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard">
            <Card className="bg-black border-white/10">
              <CardHeader>
                <CardTitle className="text-gold">Dashboard Overview</CardTitle>
                <CardDescription>Summary of key metrics and recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Total Users */}
                  <Card className="bg-black border-white/10">
                    <CardHeader>
                      <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingUsers ? (
                        <Loader2 className="animate-spin text-gold" />
                      ) : (
                        <div className="text-3xl font-bold">{users.length}</div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Total Hotel Deals */}
                  <Card className="bg-black border-white/10">
                    <CardHeader>
                      <CardTitle>Total Hotel Deals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingDeals ? (
                        <Loader2 className="animate-spin text-gold" />
                      ) : (
                        <div className="text-3xl font-bold">{hotelDeals.length}</div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Total Tour Packages */}
                  <Card className="bg-black border-white/10">
                    <CardHeader>
                      <CardTitle>Total Tour Packages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingPackages ? (
                        <Loader2 className="animate-spin text-gold" />
                      ) : (
                        <div className="text-3xl font-bold">{tourPackages.length}</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* Membership Distribution */}
                  <Card className="bg-black border-white/10">
                    <CardHeader>
                      <CardTitle>Membership Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={membershipData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {membershipData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Revenue by Membership */}
                  <Card className="bg-black border-white/10">
                    <CardHeader>
                      <CardTitle>Revenue by Membership</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={transactionData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#FFD700" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Hotel Deals Tab Content */}
          <TabsContent value="hotel-deals">
            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gold">Hotel Deals</CardTitle>
                  <CardDescription>Manage all hotel deals available on the platform</CardDescription>
                </div>
                <Button onClick={() => setShowAddDealForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Deal
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search deals..."
                      className="pl-8 bg-black/50 border-white/20"
                      value={dealSearchTerm}
                      onChange={(e) => setDealSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {loadingDeals ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHotelDeals.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              No hotel deals found. Add some deals to get started.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredHotelDeals.map((deal) => (
                            <TableRow key={deal.id} className="border-white/10">
                              <TableCell>
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={deal.image} alt={deal.name} />
                                  <AvatarFallback>{deal.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell>{deal.name}</TableCell>
                              <TableCell>{deal.location}</TableCell>
                              <TableCell>{deal.rating} Stars</TableCell>
                              <TableCell>${deal.member_price}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => setEditingDeal(deal)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border-white/10 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit Hotel Deal</DialogTitle>
                                      </DialogHeader>
                                      {editingDeal && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-name">Name</Label>
                                            <Input 
                                              id="edit-name" 
                                              value={editingDeal.name} 
                                              onChange={(e) => setEditingDeal({...editingDeal, name: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-location">Location</Label>
                                            <Input 
                                              id="edit-location" 
                                              value={editingDeal.location} 
                                              onChange={(e) => setEditingDeal({...editingDeal, location: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-image">Image URL</Label>
                                            <Input 
                                              id="edit-image" 
                                              value={editingDeal.image} 
                                              onChange={(e) => setEditingDeal({...editingDeal, image: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-rating">Rating</Label>
                                            <Select 
                                              value={editingDeal.rating.toString()} 
                                              onValueChange={(value) => setEditingDeal({...editingDeal, rating: parseInt(value)})}
                                            >
                                              <SelectTrigger className="bg-black/50 border-white/20">
                                                <SelectValue placeholder="Select Rating" />
                                              </SelectTrigger>
                                              <SelectContent className="bg-black border-white/10 text-white">
                                                {[1, 2, 3, 4, 5].map(rating => (
                                                  <SelectItem key={rating} value={rating.toString()}>{rating} Stars</SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-deal">Deal</Label>
                                            <Input 
                                              id="edit-deal" 
                                              value={editingDeal.deal} 
                                              onChange={(e) => setEditingDeal({...editingDeal, deal: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-regular-price">Regular Price</Label>
                                            <Input 
                                              type="number"
                                              id="edit-regular-price" 
                                              value={editingDeal.regular_price} 
                                              onChange={(e) => setEditingDeal({...editingDeal, regular_price: parseFloat(e.target.value)})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-member-price">Member Price</Label>
                                            <Input 
                                              type="number"
                                              id="edit-member-price" 
                                              value={editingDeal.member_price} 
                                              onChange={(e) => setEditingDeal({...editingDeal, member_price: parseFloat(e.target.value)})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-duration">Duration</Label>
                                            <Input 
                                              id="edit-duration" 
                                              value={editingDeal.duration} 
                                              onChange={(e) => setEditingDeal({...editingDeal, duration: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-description">Description</Label>
                                            <Textarea 
                                              id="edit-description" 
                                              rows={3}
                                              value={editingDeal.description} 
                                              onChange={(e) => setEditingDeal({...editingDeal, description: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditingDeal(null)}>Cancel</Button>
                                        <Button onClick={handleUpdateDeal}>Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" className="bg-red-500/20 hover:bg-red-500/30">
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-black border-white/10 text-white">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete the hotel deal. This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-black/50 border-white/20">Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          className="bg-red-500"
                                          onClick={() => handleDeleteDeal(deal.id)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
            {renderAddDealForm()}
          </TabsContent>
          
          {/* Tour Packages Tab Content */}
          <TabsContent value="tour-packages">
            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gold">Tour Packages</CardTitle>
                  <CardDescription>Manage all tour packages available on the platform</CardDescription>
                </div>
                <Button onClick={() => setShowAddPackageForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Package
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      className="pl-8 bg-black/50 border-white/20"
                      value={packageSearchTerm}
                      onChange={(e) => setPackageSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {loadingPackages ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTourPackages.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              No tour packages found. Add some packages to get started.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredTourPackages.map((pkg) => (
                            <TableRow key={pkg.id} className="border-white/10">
                              <TableCell>
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={pkg.image} alt={pkg.name} />
                                  <AvatarFallback>{pkg.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell>{pkg.name}</TableCell>
                              <TableCell>{pkg.location}</TableCell>
                              <TableCell>{pkg.rating} Stars</TableCell>
                              <TableCell>${pkg.member_price}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => setEditingPackage(pkg)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border-white/10 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit Tour Package</DialogTitle>
                                      </DialogHeader>
                                      {editingPackage && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-name">Name</Label>
                                            <Input 
                                              id="edit-name" 
                                              value={editingPackage.name} 
                                              onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-location">Location</Label>
                                            <Input 
                                              id="edit-location" 
                                              value={editingPackage.location} 
                                              onChange={(e) => setEditingPackage({...editingPackage, location: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-image">Image URL</Label>
                                            <Input 
                                              id="edit-image" 
                                              value={editingPackage.image} 
                                              onChange={(e) => setEditingPackage({...editingPackage, image: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-rating">Rating</Label>
                                            <Select 
                                              value={editingPackage.rating.toString()} 
                                              onValueChange={(value) => setEditingPackage({...editingPackage, rating: parseInt(value)})}
                                            >
                                              <SelectTrigger className="bg-black/50 border-white/20">
                                                <SelectValue placeholder="Select Rating" />
                                              </SelectTrigger>
                                              <SelectContent className="bg-black border-white/10 text-white">
                                                {[1, 2, 3, 4, 5].map(rating => (
                                                  <SelectItem key={rating} value={rating.toString()}>{rating} Stars</SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-deal">Deal</Label>
                                            <Input 
                                              id="edit-deal" 
                                              value={editingPackage.deal} 
                                              onChange={(e) => setEditingPackage({...editingPackage, deal: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-regular-price">Regular Price</Label>
                                            <Input 
                                              type="number"
                                              id="edit-regular-price" 
                                              value={editingPackage.regular_price} 
                                              onChange={(e) => setEditingPackage({...editingPackage, regular_price: parseFloat(e.target.value)})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-member-price">Member Price</Label>
                                            <Input 
                                              type="number"
                                              id="edit-member-price" 
                                              value={editingPackage.member_price} 
                                              onChange={(e) => setEditingPackage({...editingPackage, member_price: parseFloat(e.target.value)})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-duration">Duration</Label>
                                            <Input 
                                              id="edit-duration" 
                                              value={editingPackage.duration} 
                                              onChange={(e) => setEditingPackage({...editingPackage, duration: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-description">Description</Label>
                                            <Textarea 
                                              id="edit-description" 
                                              rows={3}
                                              value={editingPackage.description} 
                                              onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditingPackage(null)}>Cancel</Button>
                                        <Button onClick={handleUpdatePackage}>Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" className="bg-red-500/20 hover:bg-red-500/30">
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-black border-white/10 text-white">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete the tour package. This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-black/50 border-white/20">Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          className="bg-red-500"
                                          onClick={() => handleDeletePackage(pkg.id)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
            {renderAddPackageForm()}
          </TabsContent>
          
          {/* Users Tab Content */}
          <TabsContent value="users">
            <Card className="bg-black border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gold">Users</CardTitle>
                  <CardDescription>Manage all users registered on the platform</CardDescription>
                </div>
                <Button onClick={() => setShowAddUserForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8 bg-black/50 border-white/20"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {loadingUsers ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Membership</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              No users found. Add some users to get started.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id} className="border-white/10">
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.membership_tier === 'Silver' ? 'bg-gray-200 text-gray-800' :
                                  user.membership_tier === 'Gold' ? 'bg-yellow-200 text-yellow-800' :
                                  'bg-gray-300 text-gray-800'
                                }`}>
                                  {user.membership_tier}
                                </div>
                              </TableCell>
                              <TableCell>{user.points}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => setEditingUser(user)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border-white/10 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit User</DialogTitle>
                                      </DialogHeader>
                                      {editingUser && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-name">Name</Label>
                                            <Input 
                                              id="edit-name" 
                                              value={editingUser.name} 
                                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-email">Email</Label>
                                            <Input 
                                              id="edit-email" 
                                              value={editingUser.email} 
                                              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-membership">Membership Tier</Label>
                                            <Select 
                                              value={editingUser.membership_tier} 
                                              onValueChange={(value) => setEditingUser({...editingUser, membership_tier: value as 'Silver' | 'Gold' | 'Platinum'})}
                                            >
                                              <SelectTrigger className="bg-black/50 border-white/20">
                                                <SelectValue placeholder="Select Tier" />
                                              </SelectTrigger>
                                              <SelectContent className="bg-black border-white/10 text-white">
                                                <SelectItem value="Silver">Silver</SelectItem>
                                                <SelectItem value="Gold">Gold</SelectItem>
                                                <SelectItem value="Platinum">Platinum</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-points">Points</Label>
                                            <Input 
                                              type="number"
                                              id="edit-points" 
                                              value={editingUser.points} 
                                              onChange={(e) => setEditingUser({...editingUser, points: parseInt(e.target.value)})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                                        <Button onClick={handleUpdateUser}>Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" className="bg-red-500/20 hover:bg-red-500/30">
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-black border-white/10 text-white">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete the user. This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-black/50 border-white/20">Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          className="bg-red-500"
                                          onClick={() => handleDeleteUser(user.id)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
            {renderAddUserForm()}
          </TabsContent>
          
          {/* Website Content Tab */}
          <TabsContent value="website-content">
            <Card className="bg-black border-white/10">
              <CardHeader>
                <CardTitle className="text-gold">Website Content</CardTitle>
                <CardDescription>Manage all content displayed on the website</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingContent ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead>Title</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {websiteContent.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                              No content found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          websiteContent.map((content) => (
                            <TableRow key={content.id} className="border-white/10">
                              <TableCell>{content.title}</TableCell>
                              <TableCell>
                                <div className="max-w-xs truncate">
                                  {content.content}
                                </div>
                              </TableCell>
                              <TableCell>
                                {content.active ? (
                                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Inactive
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleEditContent(content)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border-white/10 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit Content</DialogTitle>
                                      </DialogHeader>
                                      {editingContent && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-title">Title</Label>
                                            <Input 
                                              id="edit-title" 
                                              value={editingContent.title} 
                                              onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-content">Content</Label>
                                            <Textarea 
                                              id="edit-content" 
                                              rows={5}
                                              value={editingContent.content} 
                                              onChange={(e) => setEditingContent({...editingContent, content: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Switch 
                                              id="active" 
                                              checked={editingContent.active} 
                                              onCheckedChange={(checked) => setEditingContent({...editingContent, active: checked})}
                                            />
                                            <Label htmlFor="active">Active</Label>
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditingContent(null)}>Cancel</Button>
                                        <Button onClick={handleSaveContent}>Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-black border-white/10">
              <CardHeader>
                <CardTitle className="text-gold">System Settings</CardTitle>
                <CardDescription>Configure global system settings</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSettings ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead>Setting</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {systemSettings.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                              No settings found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          systemSettings.map((setting) => (
                            <TableRow key={setting.id} className="border-white/10">
                              <TableCell>{setting.setting_name}</TableCell>
                              <TableCell>{setting.setting_value}</TableCell>
                              <TableCell>{setting.setting_description}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleEditSetting(setting)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border-white/10 text-white">
                                      <DialogHeader>
                                        <DialogTitle>Edit Setting</DialogTitle>
                                      </DialogHeader>
                                      {editingSetting && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-setting-name">Setting Name</Label>
                                            <Input 
                                              id="edit-setting-name" 
                                              value={editingSetting.setting_name} 
                                              readOnly
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-setting-value">Value</Label>
                                            <Input 
                                              id="edit-setting-value" 
                                              value={editingSetting.setting_value} 
                                              onChange={(e) => setEditingSetting({...editingSetting, setting_value: e.target.value})}
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-setting-desc">Description</Label>
                                            <Input 
                                              id="edit-setting-desc" 
                                              value={editingSetting.setting_description} 
                                              readOnly
                                              className="bg-black/50 border-white/20"
                                            />
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditingSetting(null)}>Cancel</Button>
                                        <Button onClick={handleSaveSetting}>Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
