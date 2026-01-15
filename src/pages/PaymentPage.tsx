import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, DollarSign, ArrowLeft } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!bookingData.room || !bookingData.guestName) {
      navigate('/booking');
      return;
    }
  }, [user, bookingData, navigate]);

  const generateBookingReference = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `TOM-${timestamp}-${random}`;
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const bookingReference = generateBookingReference();

      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id,
          room_id: bookingData.room?.id,
          guest_name: bookingData.guestName,
          guest_email: bookingData.guestEmail,
          guest_phone: bookingData.guestPhone,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          guests: bookingData.guests,
          total_cost: bookingData.totalCost,
          special_requests: bookingData.specialRequests || null,
          booking_reference: bookingReference,
          payment_method: paymentMethod,
          status: 'pending',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      updateBookingData({ paymentMethod });
      navigate(`/confirmation?ref=${bookingReference}`);
    } catch (err: any) {
      setError(err.message || 'Failed to process booking. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const nights = Math.ceil(
    (new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/guest-info')}
          className="flex items-center gap-2 text-[#4A90E2] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Guest Information
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Payment</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  This is a simulated payment for demonstration purposes. No actual payment will be processed.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>

              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod('Credit Card')}
                  className={`w-full p-6 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'Credit Card'
                      ? 'border-[#4A90E2] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      paymentMethod === 'Credit Card' ? 'bg-[#4A90E2]' : 'bg-gray-100'
                    }`}>
                      <CreditCard className={`h-6 w-6 ${
                        paymentMethod === 'Credit Card' ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Pay securely with your card</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('Cash')}
                  className={`w-full p-6 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'Cash'
                      ? 'border-[#50E3C2] bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      paymentMethod === 'Cash' ? 'bg-[#50E3C2]' : 'bg-gray-100'
                    }`}>
                      <DollarSign className={`h-6 w-6 ${
                        paymentMethod === 'Cash' ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cash</h3>
                      <p className="text-sm text-gray-600">Pay at the hotel reception</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('GCash')}
                  className={`w-full p-6 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'GCash'
                      ? 'border-[#F5A623] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      paymentMethod === 'GCash' ? 'bg-[#F5A623]' : 'bg-gray-100'
                    }`}>
                      <Wallet className={`h-6 w-6 ${
                        paymentMethod === 'GCash' ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">GCash</h3>
                      <p className="text-sm text-gray-600">Pay using your GCash wallet</p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={!paymentMethod || processing}
                className="w-full mt-8 bg-[#4A90E2] text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : 'Confirm Booking & Pay'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>
              <div className="space-y-3 text-sm">
                {bookingData.room && (
                  <>
                    <div className="pb-3 border-b">
                      <p className="font-semibold">{bookingData.room.name}</p>
                      <p className="text-gray-600">{bookingData.room.type}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guest Name</span>
                      <span className="font-semibold">{bookingData.guestName}</span>
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
                      <span className="text-gray-600">Room Rate</span>
                      <span className="font-semibold">${bookingData.room.price} x {nights}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                      <span className="font-bold text-[#4A90E2] text-2xl">${bookingData.totalCost}</span>
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
