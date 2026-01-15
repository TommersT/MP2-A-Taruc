import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Booking } from '../lib/supabase';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setBookings(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-[#4A90E2] rounded-full p-8">
                  <User className="h-16 w-16 text-white" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profile?.full_name || 'User'}
                </h2>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  profile?.role === 'admin' ? 'bg-[#F5A623] text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {profile?.role}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">{profile?.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">
                    Joined {new Date(profile?.created_at || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't made any bookings yet</p>
                  <button
                    onClick={() => navigate('/rooms')}
                    className="bg-[#4A90E2] text-white px-6 py-2 rounded-lg hover:bg-[#3a7bc8] transition-colors"
                  >
                    Browse Rooms
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {booking.rooms && (
                          <img
                            src={booking.rooms.image_url}
                            alt={booking.rooms.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.rooms?.name}</h3>
                              <p className="text-sm text-gray-600">Ref: {booking.booking_reference}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed' ? 'bg-[#50E3C2] text-white' :
                              booking.status === 'pending' ? 'bg-[#F5A623] text-white' :
                              'bg-[#7B7B7B] text-white'
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>Check-in: {new Date(booking.check_in).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>Check-out: {new Date(booking.check_out).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">{booking.guests} guest(s)</span>
                            <span className="font-bold text-[#4A90E2] text-lg">${booking.total_cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Statistics</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#4A90E2] mb-1">{bookings.length}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#50E3C2] mb-1">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </p>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#F5A623] mb-1">
                    {bookings.filter(b => b.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
