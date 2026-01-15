import { Link } from 'react-router-dom';
import { Users, DollarSign } from 'lucide-react';
import { Room } from '../lib/supabase';

type RoomCardProps = {
  room: Room;
};

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.image_url}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            room.available ? 'bg-[#50E3C2] text-white' : 'bg-[#7B7B7B] text-white'
          }`}>
            {room.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
          <span className="px-3 py-1 bg-[#F5A623] text-white text-xs font-semibold rounded-full">
            {room.type}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">Up to {room.capacity} guests</span>
          </div>
          <div className="flex items-center text-[#4A90E2] font-bold text-lg">
            <DollarSign className="h-5 w-5" />
            <span>{room.price}</span>
            <span className="text-sm text-gray-500 ml-1">/night</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/rooms/${room.id}`}
            className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Details
          </Link>
          {room.available && (
            <Link
              to={`/booking?roomId=${room.id}`}
              className="flex-1 text-center bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3a7bc8] transition-colors"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
