import { Link, useNavigate } from 'react-router-dom';
import { Hotel, User, LogOut } from 'lucide-react';
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
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-[#4A90E2]" />
            <span className="text-2xl font-bold text-gray-900">Tomitel</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#4A90E2] transition-colors">
              Home
            </Link>
            <Link to="/rooms" className="text-gray-700 hover:text-[#4A90E2] transition-colors">
              Rooms
            </Link>
            {user && (
              <Link to="/booking" className="text-gray-700 hover:text-[#4A90E2] transition-colors">
                Book Now
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-[#4A90E2] transition-colors">
                Admin
              </Link>
            )}
            <Link to="/contact" className="text-gray-700 hover:text-[#4A90E2] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#4A90E2] transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#4A90E2] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3a7bc8] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
