import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section with Hospitality Image - Centered Text */}
      <div className="relative py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Hotel Lobby" 
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">We're here to help and answer any questions you may have</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto w-full px-8 md:px-16 py-20 flex-grow">
        <div className="grid md:grid-cols-5 gap-16 items-start">
          
          {/* Get in Touch Section */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have questions about our rooms, services, or need assistance with your booking?
                Feel free to reach out to us through any of the channels below.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-[#4A90E2] rounded-full p-4 shadow-sm">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 text-lg">Nottingham, Taytay, Rizal</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[#50E3C2] rounded-full p-4 shadow-sm">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-lg">+1 (234) 567-8900</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[#F5A623] rounded-full p-4 shadow-sm">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-lg">info@tomitel.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[#7B7B7B] rounded-full p-4 shadow-sm">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600 text-lg">Reception: 24/7</p>
                  <p className="text-gray-600 text-lg">Check-in: 1:00 PM | Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send Us a Message Card */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Full Name</label>
                  <input type="text" placeholder="Enter name" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A90E2] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="Enter email" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A90E2] outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Message</label>
                <textarea rows={8} placeholder="How can we help you?" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A90E2] outline-none transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#4A90E2] text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-[#3a7bc8] hover:shadow-lg transition-all transform hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FULL WIDTH MAP SECTION */}
      <div className="w-full h-[600px] bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5641590668706!2d121.12155427541836!3d14.566898685915442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7a1a0960fa9%3A0x97791fb6f4dc6aea!2sNottingham%20Villas%20Taytay!5e0!3m2!1sen!2sph!4v1768469779489!5m2!1sen!2sph" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Tomitel Location Map"
        ></iframe>
      </div>

      {/* Standardized Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
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
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nottingham, Taytay, Rizal</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 234 567 8900</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
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