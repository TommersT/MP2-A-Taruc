import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';

export default function GuestInfoPage() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const { user, profile } = useAuth();

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!bookingData.room) {
      navigate('/booking');
      return;
    }

    if (profile) {
      setGuestName(profile.full_name || '');
      setGuestEmail(profile.email || '');
      setGuestPhone(profile.phone || '');
    }
  }, [user, profile, bookingData, navigate]);

  const validateForm = () => {
    if (!guestName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!guestEmail.trim() || !/\S+@\S+\.\S+/.test(guestEmail)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!guestPhone.trim() || guestPhone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    setError('');
    return true;
  };

  const handleProceed = () => {
    if (!validateForm()) return;

    updateBookingData({
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialRequests: specialRequests.trim(),
    });

    navigate('/payment');
  };

  const nights = Math.ceil(
    (new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/booking')}
          className="flex items-center gap-2 text-[#4A90E2] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Booking
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Guest Information</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or requirements..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                  />
                </div>

                <p className="text-sm text-gray-500">* Required fields</p>

                <button
                  onClick={handleProceed}
                  className="w-full bg-[#4A90E2] text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
              <div className="space-y-3 text-sm">
                {bookingData.room && (
                  <>
                    <div className="pb-3 border-b">
                      <img
                        src={bookingData.room.image_url}
                        alt={bookingData.room.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <p className="font-semibold">{bookingData.room.name}</p>
                      <p className="text-gray-600">{bookingData.room.type}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-semibold">{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-semibold">{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights</span>
                      <span className="font-semibold">{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-semibold">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-gray-600">Price per night</span>
                      <span className="font-semibold">${bookingData.room.price}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-[#4A90E2] text-xl">${bookingData.totalCost}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
