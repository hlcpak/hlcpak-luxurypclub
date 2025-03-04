
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
