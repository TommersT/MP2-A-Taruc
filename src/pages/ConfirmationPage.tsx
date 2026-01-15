import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Calendar, Users, Mail, Phone, DollarSign } from 'lucide-react';
import { supabase, Booking } from '../lib/supabase';
import { useBooking } from '../contexts/BookingContext';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const { clearBookingData } = useBooking();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      loadBooking(ref);
      clearBookingData();
    }
  }, [searchParams]);

  const loadBooking = async (reference: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(*)')
      .eq('booking_reference', reference)
      .maybeSingle();

    if (data) {
      setBooking(data);
    }
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateNights = () => {
    if (!booking) return 0;
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2]"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h2>
          <Link to="/" className="text-[#4A90E2] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-[#50E3C2] rounded-full p-4">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Thank you for choosing Tomitel Hotel</p>
          </div>

          <div className="bg-[#4A90E2] text-white p-6 rounded-lg mb-6">
            <p className="text-sm mb-1">Booking Reference</p>
            <p className="text-2xl font-bold">{booking.booking_reference}</p>
            <p className="text-sm mt-2 opacity-90">Please keep this reference number for your records</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {booking.rooms && (
                  <div className="pb-4 border-b">
                    <p className="text-sm text-gray-600 mb-1">Room</p>
                    <p className="font-semibold text-lg">{booking.rooms.name}</p>
                    <p className="text-gray-600">{booking.rooms.type}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Check-in</span>
                    </div>
                    <p className="font-semibold">{new Date(booking.check_in).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Check-out</span>
                    </div>
                    <p className="font-semibold">{new Date(booking.check_out).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Number of Guests</span>
                    </div>
                    <p className="font-semibold">{booking.guests}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Number of Nights</p>
                    <p className="font-semibold">{calculateNights()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold">{booking.guest_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{booking.guest_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{booking.guest_phone}</span>
                </div>
                {booking.special_requests && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                    <p className="text-gray-700">{booking.special_requests}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold">{booking.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === 'confirmed' ? 'bg-[#50E3C2] text-white' :
                    booking.status === 'pending' ? 'bg-[#F5A623] text-white' :
                    'bg-[#7B7B7B] text-white'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                  <div className="flex items-center text-[#4A90E2] font-bold text-2xl">
                    <DollarSign className="h-6 w-6" />
                    <span>{booking.total_cost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="h-5 w-5" />
              Print / Download
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 bg-[#4A90E2] text-white px-6 py-3 rounded-lg hover:bg-[#3a7bc8] transition-colors"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg print:border-gray-300 print:bg-white">
            <p className="text-sm text-blue-800 print:text-gray-700">
              A confirmation email has been sent to {booking.guest_email}. Please arrive at the hotel
              reception with a valid ID to complete your check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
