import { Link, useNavigate } from 'react-router-dom';
import { Hotel, User, LogOut, Calendar, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* flex-row-reverse to move Logo to the right */}
        <div className="flex flex-row-reverse justify-between items-center h-16">
          
          {/* Logo Section (Now on the Right) */}
          <Link to="/" className="flex items-center space-x-2 ml-4">
            <span className="text-2xl font-bold text-gray-900">Tomitel</span>
            <Hotel className="h-8 w-8 text-[#4A90E2]" />
          </Link>

          {/* Navigation Section (Now on the Left/Center) */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-[#4A90E2] font-medium transition-colors">Home</Link>
              <Link to="/rooms" className="text-gray-700 hover:text-[#4A90E2] font-medium transition-colors">Rooms</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#4A90E2] font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#4A90E2] font-medium transition-colors">Contact</Link>
              {user && (
                <Link to="/booking" className="flex items-center gap-1 text-gray-700 hover:text-[#4A90E2] font-medium transition-colors">
                  <Calendar className="h-4 w-4" />
                  Bookings
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="text-[#F5A623] font-bold hover:text-[#d48e1a]">Admin Panel</Link>
              )}
            </div>

            <div className="flex items-center space-x-3 border-l pl-4">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-[#4A90E2]">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <button onClick={handleSignOut} className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-[#4A90E2]">Login</Link>
                  <Link to="/register" className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3a7bc8] transition-colors shadow-sm">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}