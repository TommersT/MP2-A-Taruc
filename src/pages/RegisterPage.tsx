import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isAdminRegister, setIsAdminRegister] = useState(false);

  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    setLoading(true);

    const { error: signUpError } = await signUp(
      formData.email, 
      formData.password, 
      formData.fullName, 
      formData.phone,
      isAdminRegister ? 'admin' : 'user'
    );

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hotel" />
        <div className="absolute inset-0 bg-[#4A90E2] opacity-40 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-lg w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <Hotel className="h-12 w-12 text-[#4A90E2] mx-auto mb-2" />
            <h1 className="text-3xl font-bold text-gray-900">Join Tomitel</h1>
            <p className="text-gray-600">Create your account to start booking</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
            <input placeholder="Email" type="email" className="w-full px-4 py-3 border rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <input placeholder="Phone" className="w-full px-4 py-3 border rounded-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Password" type="password" className="w-full px-4 py-3 border rounded-lg" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
              <input placeholder="Confirm" type="password" className="w-full px-4 py-3 border rounded-lg" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required />
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" id="admin" checked={isAdminRegister} onChange={() => setIsAdminRegister(!isAdminRegister)} />
              <label htmlFor="admin" className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer">Register as Admin <ShieldAlert size={14} /></label>
            </div>

            <button disabled={loading} className="w-full bg-[#4A90E2] text-white py-4 rounded-lg font-bold hover:bg-[#3a7bc8] transition-all">
              {loading ? 'Creating...' : 'Register'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-600">Already have an account? <Link to="/login" className="text-[#4A90E2] font-bold">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}