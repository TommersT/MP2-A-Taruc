import { Hotel, ShieldCheck, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Background Image Header */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">About Tomitel Hotel</h1>
          <p className="text-xl max-w-2xl mx-auto">Discover our story and commitment to providing exceptional hospitality in Rizal.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16 flex-grow">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Tomitel, we aim to redefine the standard of comfort and luxury for travelers in Taytay, Rizal. Our purpose is to provide a seamless hospitality experience, blending modern technology with traditional Filipino warmth.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are here for business or a relaxing staycation, we ensure that every guest experiences the highest level of service and convenience through our integrated booking platform.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Hotel className="h-10 w-10 text-[#4A90E2] mx-auto mb-2" />
                <h4 className="font-bold">Premium Rooms</h4>
              </div>
              <div className="text-center">
                <ShieldCheck className="h-10 w-10 text-[#50E3C2] mx-auto mb-2" />
                <h4 className="font-bold">Secure Booking</h4>
              </div>
              <div className="text-center">
                <MapPin className="h-10 w-10 text-red-500 mx-auto mb-2" />
                <h4 className="font-bold">Prime Location</h4>
              </div>
              <div className="text-center">
                <Clock className="h-10 w-10 text-[#F5A623] mx-auto mb-2" />
                <h4 className="font-bold">24/7 Service</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4A90E2] mb-3">Effortless Stay</h3>
              <p className="text-gray-600 text-sm">From digital check-ins to specialized guest requests, we prioritize your convenience above all else.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4A90E2] mb-3">Modern Amenities</h3>
              <p className="text-gray-600 text-sm">Every room is equipped with high-speed Wi-Fi, premium bedding, and all the essentials for a perfect stay.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4A90E2] mb-3">Local Expertise</h3>
              <p className="text-gray-600 text-sm">Located in the "Garments Capital of the Philippines," we offer the perfect base for exploring the vibrant culture of Taytay.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Updated Footer to match HomePage */}
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