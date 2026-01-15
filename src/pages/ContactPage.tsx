import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">We're here to help and answer any questions you may have</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
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
                  <p className="text-gray-600">123 Hotel Street, Downtown</p>
                  <p className="text-gray-600">City, State 12345</p>
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
                  <p className="text-gray-600">Check-in: 2:00 PM</p>
                  <p className="text-gray-600">Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#4A90E2] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Map integration would go here</p>
              <p className="text-sm text-gray-500 mt-2">123 Hotel Street, Downtown, City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
