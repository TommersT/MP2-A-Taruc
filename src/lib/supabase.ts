import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Room = {
  id: string;
  name: string;
  type: 'Single' | 'Double' | 'Deluxe' | 'Suite';
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  image_url: string;
  available: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string | null;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_cost: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  special_requests: string | null;
  booking_reference: string;
  payment_method: string | null;
  created_at: string;
  rooms?: Room;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  created_at: string;
};
