import { createContext, useContext, useState, ReactNode } from 'react';
import { Room } from '../lib/supabase';

type BookingData = {
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalCost: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  paymentMethod: string;
};

type BookingContextType = {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  clearBookingData: () => void;
};

const initialBookingData: BookingData = {
  room: null,
  checkIn: '',
  checkOut: '',
  guests: 1,
  totalCost: 0,
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  specialRequests: '',
  paymentMethod: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const clearBookingData = () => {
    setBookingData(initialBookingData);
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, clearBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
