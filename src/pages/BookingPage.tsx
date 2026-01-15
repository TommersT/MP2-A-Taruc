import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Calendar, Users, DollarSign, MapPin, Phone, Mail } from 'lucide-react';
import { supabase, Room } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateBookingData } = useBooking();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/booking' } });
      return;
    }
    loadRooms();
  }, [user, navigate]);

  useEffect(() => {
    const roomId = searchParams.get('roomId');
    if (roomId) {
      setSelectedRoomId(roomId);
    }
  }, [searchParams]);

  const loadRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('available', true)
      .order('price', { ascending: true });

    if (data) {
      setRooms(data);
    }
    setLoading(false);
  };

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const validateBooking = () => {
    if (!selectedRoomId) {
      setError('Please select a room');
      return false;
    }
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return false;
    }
    const nights = calculateNights();
    if (nights <= 0) {
      setError('Check-out date must be after check-in date');
      return false;
    }
    if (guests < 1 || (selectedRoom && guests > selectedRoom.capacity)) {
      setError(`Number of guests must be between 1 and ${selectedRoom?.capacity}`);
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn);
    if (checkInDate < today) {
      setError('Check-in date cannot be in the past');
      return false;
    }
    setError('');
    return true;
  };

  const handleProceed = () => {
    if (!validateBooking() || !selectedRoom) return;

    updateBookingData({
      room: selectedRoom,
      checkIn,
      checkOut,
      guests,
      totalCost: calculateTotal(),
    });

    navigate('/guest-info');
  };

  const nights = calculateNights();
  const total = calculateTotal();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content with increased vertical padding (py-20) */}
      <div className="max-w-4xl mx-auto px-4 py-20 flex-grow w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Book Your Stay</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Room
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              >
                <option value="">Choose a room...</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.type} (₱{room.price.toLocaleString()}/night)
                  </option>
                ))}
              </select>
            </div>

            {selectedRoom && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedRoom.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedRoom.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Capacity: {selectedRoom.capacity} guests</span>
                  <span>Type: {selectedRoom.type}</span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Number of Guests
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                min="1"
                max={selectedRoom?.capacity || 10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
              {selectedRoom && (
                <p className="text-sm text-gray-500 mt-1">
                  Maximum capacity: {selectedRoom.capacity} guests
                </p>
              )}
            </div>

            {selectedRoom && nights > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room</span>
                    <span className="font-semibold">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per night</span>
                    <span className="font-semibold">₱{selectedRoom.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of nights</span>
                    <span className="font-semibold">{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-semibold">{guests}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Cost</span>
                    <div className="flex items-center text-[#4A90E2] font-bold text-2xl">
                      <span className="mr-1">₱</span>
                      <span>{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleProceed}
              disabled={!selectedRoom || nights <= 0}
              className="w-full bg-[#4A90E2] text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Guest Information
            </button>
          </div>
        </div>
      </div>

      {/* Standardized Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tomitel Hotel</h3>
              <p className="text-gray-400">
                Experience luxury and comfort at its finest. Your perfect stay begins here.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/rooms" className="text-gray-400 hover:text-white transition-colors">Rooms</Link></li>
                <li><Link to="/booking" className="text-gray-400 hover:text-white transition-colors">Booking</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nottingham, Taytay, Rizal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 234 567 8900</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@tomitel.com</span>
                </li>
                <li className="pt-2 text-xs opacity-75">
                  Reception: 24/7 | Check-in: 1:00 PM | Check-out: 12:00 PM
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Tomitel Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}