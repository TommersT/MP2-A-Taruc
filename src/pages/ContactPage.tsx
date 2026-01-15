import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">We're here to help and answer any questions you may have</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 flex-grow">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our rooms, services, or need assistance with your booking?
              Feel free to reach out to us through any of the channels below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#4A90E2] rounded-full p-3">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">Nottingham, Taytay, Rizal</p>
                  <p className="text-gray-600">Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#50E3C2] rounded-full p-3">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (234) 567-8900</p>
                  <p className="text-gray-600">+1 (234) 567-8901</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#F5A623] rounded-full p-3">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@tomitel.com</p>
                  <p className="text-gray-600">reservations@tomitel.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#7B7B7B] rounded-full p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">Reception: 24/7</p>
                  <p className="text-gray-600">Check-in: 1:00 PM</p>
                  <p className="text-gray-600">Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <h3 className="font-bold text-gray-900 mb-4">Our Location</h3>
               <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white h-80 w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.940561570188!2d121.14188597576571!3d14.545389678417743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c77d46000001%3A0xe5a3666b68512392!2sNottingham%20Taytay!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Tomitel Location Map"
                ></iframe>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 self-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" placeholder="Enter your name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={6} placeholder="Type your message here..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2]" />
              </div>
              <button type="submit" className="w-full bg-[#4A90E2] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tomitel Hotel</h3>
              <p className="text-gray-400">Nottingham, Taytay, Rizal</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/rooms" className="text-gray-400 hover:text-white">Rooms</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hours</h3>
              <p className="text-gray-400">Reception: 24/7</p>
              <p className="text-gray-400">Check-in: 1 PM</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}