import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Wifi, Coffee, Shield, MapPin, Phone, Mail } from 'lucide-react';
import { supabase, Room } from '../lib/supabase';
import RoomCard from '../components/RoomCard';

export default function HomePage() {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedRooms();
  }, []);

  const loadFeaturedRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('available', true)
      .limit(3);

    if (data) {
      setFeaturedRooms(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image Background */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Welcome to Tomitel</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Experience luxury and comfort in our premium hotel rooms. Comfort, convenience, and elegance await.
          </p>
          <Link
            to="/rooms"
            className="inline-block bg-white text-[#4A90E2] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-1"
          >
            Explore Rooms
          </Link>
        </div>
      </section>

      {/* Why Choose Us - Increased White Space */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Tomitel?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and amenities to make your stay unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#4A90E2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Top-rated rooms with luxury amenities</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#50E3C2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Wi-Fi</h3>
              <p className="text-gray-600 text-sm">High-speed internet in all rooms</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#F5A623] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Breakfast Included</h3>
              <p className="text-gray-600 text-sm">Complimentary breakfast buffet</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#7B7B7B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Security</h3>
              <p className="text-gray-600 text-sm">Safe and secure environment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms - Increased White Space */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Rooms</h2>
            <p className="text-gray-600">Check out our most popular accommodations</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2] mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/rooms"
              className="inline-block bg-[#4A90E2] text-white px-8 py-3 rounded-lg hover:bg-[#3a7bc8] transition-colors"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* About - Increased White Space */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Tomitel</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Tomitel is a premier hotel offering world-class accommodations and exceptional service.
                Located in Nottingham, Taytay, Rizal, we provide easy access to major attractions while
                maintaining a peaceful retreat atmosphere.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our rooms are designed with your comfort in mind, featuring modern amenities and
                elegant decor. Whether you're traveling for business or leisure, Tomitel is your
                home away from home.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#4A90E2] text-white px-6 py-3 rounded-lg hover:bg-[#3a7bc8] transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Hotel Room"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Hotel Interior"
                className="rounded-lg shadow-md w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Hotel Amenities"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Hotel View"
                className="rounded-lg shadow-md w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Updated Footer */}
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