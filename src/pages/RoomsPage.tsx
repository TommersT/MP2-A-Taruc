import { useEffect, useState } from 'react';
import { supabase, Room } from '../lib/supabase';
import RoomCard from '../components/RoomCard';
import { Filter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [typeFilter, availabilityFilter, rooms]);

  const loadRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('price', { ascending: true });

    if (data) {
      setRooms(data);
      setFilteredRooms(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...rooms];

    if (typeFilter !== 'All') {
      filtered = filtered.filter((room) => room.type === typeFilter);
    }

    if (availabilityFilter === 'Available') {
      filtered = filtered.filter((room) => room.available);
    } else if (availabilityFilter === 'Unavailable') {
      filtered = filtered.filter((room) => !room.available);
    }

    setFilteredRooms(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Background Image Header */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms</h1>
          <p className="text-lg">Discover the perfect accommodation for your stay</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-[#4A90E2]" />
            <h2 className="text-xl font-semibold">Filter Rooms</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              >
                <option value="All">All Rooms</option>
                <option value="Available">Available Only</option>
                <option value="Unavailable">Unavailable Only</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2] mx-auto"></div>
          </div>
        ) : filteredRooms.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredRooms.length} of {rooms.length} rooms
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No rooms match your filters</p>
            <button
              onClick={() => {
                setTypeFilter('All');
                setAvailabilityFilter('All');
              }}
              className="mt-4 text-[#4A90E2] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tomitel Hotel</h3>
              <p className="text-gray-400">Nottingham, Taytay, Rizal</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/rooms" className="hover:text-white transition-colors">Rooms</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Reception</h3>
              <p className="text-gray-400">24/7 Service</p>
              <p className="text-gray-400 text-sm mt-1">Check-in: 1:00 PM | Check-out: 12:00 PM</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}