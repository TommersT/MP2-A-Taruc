import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// Ensure your logo image is placed in src/assets/logo.png
import logo from '../assets/logo.png'; 

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
        {/* 3-Zone Layout Container */}
        <div className="grid grid-cols-3 items-center h-24">
          
          {/* LEFT ZONE: Logo + Name (Vertical Alignment) */}
          <div className="flex justify-start">
            <Link to="/" className="flex flex-col items-start space-y-1 group">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-14 w-auto rounded-xl object-contain shadow-sm transition-transform group-hover:scale-105" 
              />
              <span className="text-sm font-black tracking-tighter text-[#4A90E2] uppercase leading-none">
                
              </span>
            </Link>
          </div>

          {/* CENTER ZONE: Navigation Links (Truly Centered) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link to="/" className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors font-bold">
              Home
            </Link>
            <Link to="/rooms" className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors font-bold">
              Rooms
            </Link>
            <Link to="/about" className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors font-bold">
              About
            </Link>
            {user && (
              <Link to="/booking" className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors flex items-center gap-1 font-bold">
                <Calendar className="h-5 w-5" /> Bookings
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors font-bold">
                Admin
              </Link>
            )}
            <Link to="/contact" className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors font-bold">
              Contact
            </Link>
          </div>

          {/* RIGHT ZONE: Auth Actions */}
          <div className="flex justify-end items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-lg text-gray-700 hover:text-[#4A90E2] transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline font-bold">Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-lg text-gray-700 hover:text-red-600 transition-colors font-bold"
                >
                  <LogOut className="h-6 w-6" />
                  <span className="hidden md:inline font-bold">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg text-gray-700 hover:text-[#4A90E2] transition-colors font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-lg bg-[#4A90E2] text-white px-6 py-3 rounded-xl hover:bg-[#3a7bc8] transition-all font-bold shadow-md"
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