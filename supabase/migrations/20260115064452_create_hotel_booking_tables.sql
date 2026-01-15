/*
  # Create Tomitel Hotel Booking System Tables

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `phone` (text)
      - `role` (text) - 'user' or 'admin'
      - `created_at` (timestamptz)
    
    - `rooms`
      - `id` (uuid, primary key)
      - `name` (text) - Room name
      - `type` (text) - Single, Double, Deluxe, Suite
      - `price` (numeric) - Price per night
      - `capacity` (integer) - Number of guests
      - `description` (text) - Room description
      - `amenities` (text[]) - Array of amenities
      - `image_url` (text) - Room image
      - `available` (boolean) - Availability status
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, nullable)
      - `room_id` (uuid, references rooms)
      - `guest_name` (text)
      - `guest_email` (text)
      - `guest_phone` (text)
      - `check_in` (date)
      - `check_out` (date)
      - `guests` (integer)
      - `total_cost` (numeric)
      - `status` (text) - 'pending', 'confirmed', 'cancelled'
      - `special_requests` (text)
      - `booking_reference` (text, unique)
      - `payment_method` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for admins to manage all data
    - Add policies for public to read rooms
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('Single', 'Double', 'Deluxe', 'Suite')),
  price numeric NOT NULL CHECK (price > 0),
  capacity integer NOT NULL CHECK (capacity > 0),
  description text NOT NULL,
  amenities text[] DEFAULT '{}',
  image_url text NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available rooms"
  ON rooms FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert rooms"
  ON rooms FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update rooms"
  ON rooms FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete rooms"
  ON rooms FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  room_id uuid REFERENCES rooms ON DELETE CASCADE NOT NULL,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL CHECK (guests > 0),
  total_cost numeric NOT NULL CHECK (total_cost >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  special_requests text,
  booking_reference text UNIQUE NOT NULL,
  payment_method text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert sample rooms
INSERT INTO rooms (name, type, price, capacity, description, amenities, image_url, available) VALUES
  ('Cozy Single Room', 'Single', 1200, 1, 'Perfect for solo travelers. Compact and comfortable with all essential amenities.', ARRAY['Wi-Fi', 'AC', 'TV', 'Desk'], 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('Standard Double Room', 'Double', 2000, 2, 'Spacious room with a comfortable double bed, ideal for couples.', ARRAY['Wi-Fi', 'AC', 'TV', 'Mini Fridge', 'Breakfast'], 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('Deluxe Ocean View', 'Deluxe', 3500, 2, 'Luxurious room with stunning ocean views and premium amenities.', ARRAY['Wi-Fi', 'AC', 'Smart TV', 'Mini Bar', 'Breakfast', 'Balcony', 'Room Service'], 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('Executive Suite', 'Suite', 5000, 4, 'Our most premium offering with separate living area and bedroom.', ARRAY['Wi-Fi', 'AC', 'Smart TV', 'Mini Bar', 'Breakfast', 'Balcony', 'Room Service', 'Jacuzzi', 'Kitchen'], 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('Family Double Room', 'Double', 2500, 3, 'Spacious double room perfect for small families with extra bedding options.', ARRAY['Wi-Fi', 'AC', 'TV', 'Mini Fridge', 'Breakfast', 'Extra Bed'], 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('Premium Suite', 'Suite', 6000, 4, 'Top-tier luxury suite with panoramic city views and exclusive services.', ARRAY['Wi-Fi', 'AC', 'Smart TV', 'Mini Bar', 'Breakfast', 'Balcony', 'Room Service', 'Jacuzzi', 'Kitchen', 'Butler Service'], 'https://images.pexels.com/photos/1743373/pexels-photo-1743373.jpeg?auto=compress&cs=tinysrgb&w=800', true);
