import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Hotel } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Please fill fields');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hotel" />
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="bg-white/90 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Hotel className="h-10 w-10 text-[#4A90E2]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-200">Sign in to your Tomitel account</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#4A90E2]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#4A90E2]" />
            </div>
            <button disabled={loading} className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-bold hover:bg-[#3a7bc8] transition-all">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* DEMO ACCOUNTS SECTION */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 text-center">Demo Accounts</h4>
            <div className="text-[11px] font-mono bg-gray-50 p-3 rounded-lg space-y-1">
              <p className="text-gray-600">User: <span className="text-blue-600 font-bold">user@tomitel.com</span> / user123</p>
              <p className="text-gray-600">Admin: <span className="text-amber-600 font-bold">admin@tomitel.com</span> / admin123</p>
            </div>
          </div>
          
          <p className="text-center mt-6 text-gray-600">Don't have an account? <Link to="/register" className="text-[#4A90E2] font-bold">Register Here</Link></p>
        </div>
      </div>
    </div>
  );
}