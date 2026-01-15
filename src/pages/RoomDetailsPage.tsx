import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, Check, ArrowLeft } from 'lucide-react';
import { supabase, Room } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadRoom();
    }
  }, [id]);

  const loadRoom = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data) {
      setRoom(data);
    }
    setLoading(false);
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: `/rooms/${id}` } });
      return;
    }
    navigate(`/booking?roomId=${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h2>
          <Link to="/rooms" className="text-[#4A90E2] hover:underline">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-[#4A90E2] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Rooms
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={room.image_url}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                room.available ? 'bg-[#50E3C2] text-white' : 'bg-[#7B7B7B] text-white'
              }`}>
                {room.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{room.name}</h1>
                <span className="inline-block px-4 py-1 bg-[#F5A623] text-white text-sm font-semibold rounded-full">
                  {room.type}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center text-[#4A90E2] font-bold text-3xl">
                  <span className="mr-1">₱</span>
                  <span>{room.price.toLocaleString()}</span>
                </div>
                <span className="text-gray-500">per night</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{room.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="h-5 w-5 text-[#4A90E2]" />
                    <span>Capacity: Up to {room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 text-[#50E3C2]" />
                    <span>Room Type: {room.type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <Check className="h-5 w-5 text-[#50E3C2]" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Price Breakdown</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700">Base price per night</span>
                  <span className="font-semibold">₱{room.price.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600">
                    * Final price will be calculated based on number of nights during booking
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              {room.available ? (
                <button
                  onClick={handleBookNow}
                  className="flex-1 bg-[#4A90E2] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors"
                >
                  Proceed to Booking
                </button>
              ) : (
                <div className="flex-1 bg-gray-300 text-gray-600 px-8 py-4 rounded-lg text-lg font-semibold text-center cursor-not-allowed">
                  Currently Unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}