import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Home, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase, Booking, Room, Profile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'rooms' | 'users'>('overview');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
      return;
    }
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin, authLoading, navigate]);

  const loadData = async () => {
    const [bookingsRes, roomsRes, usersRes] = await Promise.all([
      supabase.from('bookings').select('*, rooms(*)').order('created_at', { ascending: false }),
      supabase.from('rooms').select('*').order('price', { ascending: true }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    ]);

    if (bookingsRes.data) setBookings(bookingsRes.data);
    if (roomsRes.data) setRooms(roomsRes.data);
    if (usersRes.data) setUsers(usersRes.data);

    setLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (!error) {
      loadData();
    }
  };

  const updateRoomAvailability = async (roomId: string, available: boolean) => {
    const { error } = await supabase
      .from('rooms')
      .update({ available })
      .eq('id', roomId);

    if (!error) {
      loadData();
    }
  };

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    totalRevenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + Number(b.total_cost), 0),
    availableRooms: rooms.filter(r => r.available).length,
    totalRooms: rooms.length,
    totalUsers: users.length,
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#4A90E2] rounded-full p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#50E3C2] rounded-full p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#F5A623] rounded-full p-3">
                <Home className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Available Rooms</p>
            <p className="text-3xl font-bold text-gray-900">{stats.availableRooms}/{stats.totalRooms}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#7B7B7B] rounded-full p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Registered Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'overview'
                    ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'bookings'
                    ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('rooms')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'rooms'
                    ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Rooms ({rooms.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'users'
                    ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Users ({users.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#F5A623] bg-opacity-10 border border-[#F5A623] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-[#F5A623]" />
                      <span className="font-semibold text-[#F5A623]">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                  </div>
                  <div className="p-4 bg-[#50E3C2] bg-opacity-10 border border-[#50E3C2] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-[#50E3C2]" />
                      <span className="font-semibold text-[#50E3C2]">Confirmed</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.confirmedBookings}</p>
                  </div>
                  <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-600">Cancelled</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {bookings.filter(b => b.status === 'cancelled').length}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{booking.guest_name}</p>
                          <p className="text-sm text-gray-600">{booking.rooms?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${booking.total_cost}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-[#50E3C2] text-white' :
                            booking.status === 'pending' ? 'bg-[#F5A623] text-white' :
                            'bg-[#7B7B7B] text-white'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Reference</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Guest</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Room</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Check-in</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{booking.booking_reference}</td>
                        <td className="px-4 py-3 text-sm">{booking.guest_name}</td>
                        <td className="px-4 py-3 text-sm">{booking.rooms?.name}</td>
                        <td className="px-4 py-3 text-sm">{new Date(booking.check_in).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm font-semibold">${booking.total_cost}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' ? 'bg-[#50E3C2] text-white' :
                            booking.status === 'pending' ? 'bg-[#F5A623] text-white' :
                            'bg-[#7B7B7B] text-white'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="text-[#50E3C2] hover:underline"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="text-red-600 hover:underline"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="grid md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <img
                        src={room.image_url}
                        alt={room.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{room.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{room.type}</p>
                        <p className="text-[#4A90E2] font-bold mb-2">${room.price}/night</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            room.available ? 'bg-[#50E3C2] text-white' : 'bg-[#7B7B7B] text-white'
                          }`}>
                            {room.available ? 'Available' : 'Unavailable'}
                          </span>
                          <button
                            onClick={() => updateRoomAvailability(room.id, !room.available)}
                            className="text-sm text-[#4A90E2] hover:underline"
                          >
                            {room.available ? 'Mark Unavailable' : 'Mark Available'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{user.full_name || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm">{user.email}</td>
                        <td className="px-4 py-3 text-sm">{user.phone || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-[#F5A623] text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
