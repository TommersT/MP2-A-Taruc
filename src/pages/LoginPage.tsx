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

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#50E3C2] to-[#F5A623] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4">
              <Hotel className="h-12 w-12 text-[#4A90E2]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white text-lg">Sign in to your Tomitel account</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-1" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A90E2] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#3a7bc8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#4A90E2] font-semibold hover:underline">
                Register Here
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 text-center">
              Demo accounts:
            </p>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p className="text-center">User: user@tomitel.com / Password: user123</p>
              <p className="text-center">Admin: admin@tomitel.com / Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
