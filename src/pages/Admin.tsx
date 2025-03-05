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
                        <Loader2 className="
