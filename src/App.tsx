import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import BookingPage from './pages/BookingPage';
import GuestInfoPage from './pages/GuestInfoPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rooms" element={<RoomsPage />} />
                    <Route path="/rooms/:id" element={<RoomDetailsPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/guest-info" element={<GuestInfoPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
