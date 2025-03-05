import { createClient } from '@supabase/supabase-js';

// Define your Supabase URL and key - these will be injected from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://lxcnlzeeheafepavmbcc.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4Y25semVlaGVhZmVwYXZtYmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTYyODgsImV4cCI6MjA1NjY5MjI4OH0.t6ySqS5E-nZtiAQNnUY4vQes3DzM7zJ81fKfVDzHcMc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define database types
export type User = {
  id: string;
  name: string;
  email: string;
  membership_tier: 'Silver' | 'Gold' | 'Platinum';
  points: number;
  created_at: string;
}

export type HotelDeal = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  deal: string;
  regular_price: number;
  member_price: number;
  duration: string;
  description?: string;
  created_at: string;
}

export type TourPackage = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  deal: string;
  regular_price: number;
  member_price: number;
  duration: string;
  description?: string;
  created_at: string;
}

export type Transaction = {
  id: number;
  user_id: string;
  amount: number;
  membership_type: 'Silver' | 'Gold' | 'Platinum';
  status: 'Pending' | 'Completed';
  created_at: string;
}

export type WebsiteContent = {
  id: number;
  section: string;
  title: string;
  content: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type SiteSetting = {
  id: number;
  setting_key: string;
  setting_value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Database service functions
export const getHotelDeals = async (): Promise<HotelDeal[]> => {
  const { data, error } = await supabase
    .from('hotel_deals')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching hotel deals:', error);
    return [];
  }
  
  return data || [];
};

export const getTourPackages = async (): Promise<TourPackage[]> => {
  const { data, error } = await supabase
    .from('tour_packages')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching tour packages:', error);
    return [];
  }
  
  return data || [];
};

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  
  return data || [];
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
  
  return data || [];
};

export const addHotelDeal = async (deal: Omit<HotelDeal, 'id' | 'created_at'>): Promise<HotelDeal | null> => {
  const { data, error } = await supabase
    .from('hotel_deals')
    .insert([{ ...deal }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding hotel deal:', error);
    return null;
  }
  
  return data;
};

export const updateHotelDeal = async (id: number, updates: Partial<HotelDeal>): Promise<HotelDeal | null> => {
  const { data, error } = await supabase
    .from('hotel_deals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating hotel deal:', error);
    return null;
  }
  
  return data;
};

export const deleteHotelDeal = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('hotel_deals')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting hotel deal:', error);
    return false;
  }
  
  return true;
};

export const addTourPackage = async (pkg: Omit<TourPackage, 'id' | 'created_at'>): Promise<TourPackage | null> => {
  const { data, error } = await supabase
    .from('tour_packages')
    .insert([{ ...pkg }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding tour package:', error);
    return null;
  }
  
  return data;
};

export const updateTourPackage = async (id: number, updates: Partial<TourPackage>): Promise<TourPackage | null> => {
  const { data, error } = await supabase
    .from('tour_packages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating tour package:', error);
    return null;
  }
  
  return data;
};

export const deleteTourPackage = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('tour_packages')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting tour package:', error);
    return false;
  }
  
  return true;
};

export const addUser = async (user: Omit<User, 'id' | 'created_at'>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ ...user }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding user:', error);
    return null;
  }
  
  return data;
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  
  return data;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }
  
  return true;
};

export const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transaction }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding transaction:', error);
    return null;
  }
  
  return data;
};

export const getWebsiteContent = async (): Promise<WebsiteContent[]> => {
  // This is a mock implementation since the table doesn't exist yet
  // In a real implementation, you would query the database
  return [
    {
      id: 1,
      section: 'hero',
      title: 'Luxury Travel for Discerning Travelers',
      content: 'Experience the epitome of luxury with our exclusive member-only travel deals.',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      section: 'about',
      title: 'About Our Exclusive Club',
      content: 'The Luxury Privilege Club offers members-only access to the finest hotels and experiences worldwide.',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      section: 'footer',
      title: 'Contact Information',
      content: 'Email: contact@luxuryprivilegeclub.com | Phone: +1 (800) 123-4567',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};

export const updateWebsiteContent = async (id: number, updates: Partial<WebsiteContent>): Promise<WebsiteContent | null> => {
  // This is a mock implementation
  console.log('Updating website content:', id, updates);
  // In a real implementation, you would update the database
  return {
    id,
    section: updates.section || 'section',
    title: updates.title || 'Title',
    content: updates.content || 'Content',
    active: updates.active !== undefined ? updates.active : true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

export const getSystemSettings = async (): Promise<SiteSetting[]> => {
  // This is a mock implementation
  return [
    {
      id: 1,
      setting_key: 'site_name',
      setting_value: 'Luxury Privilege Club',
      description: 'The name of the website',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      setting_key: 'contact_email',
      setting_value: 'contact@luxuryprivilegeclub.com',
      description: 'Primary contact email',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      setting_key: 'currency',
      setting_value: 'USD',
      description: 'Default currency for prices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      setting_key: 'maintenance_mode',
      setting_value: 'false',
      description: 'Enable/disable site maintenance mode',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};

export const updateSystemSetting = async (id: number, value: string): Promise<SiteSetting | null> => {
  // This is a mock implementation
  console.log('Updating system setting:', id, value);
  // In a real implementation, you would update the database
  return {
    id,
    setting_key: 'updated_setting',
    setting_value: value,
    description: 'Updated setting',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};
