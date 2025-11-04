import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, TrendingUp, Cloud, Users } from 'lucide-react';
import Dashbaord from '../assets/Images/Dashboard.png';

const Signup = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'farmer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.fullName, formData.role);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Agro<span className="text-primary-600">Track</span>
            </h1>
            <p className="text-gray-600 mt-2">Smart Agriculture Market Tracker</p>
          </div>

          {/* Login/Signup Toggle */}
          <div className="flex border p-2 border-gray-300 rounded-lg mb-8 p-1 cursor-pointer">
            <Link 
              to="/login" 
              className="flex-1 py-3 bg-white text-gray-700 rounded-lg font-medium text-center hover:bg-gray-100"
            >
              Login
            </Link>
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium ">
              Sign up
            </button>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roles
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Already have account */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-800 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className="bg-green-900 hidden lg:flex w-1/2 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-5xl font-bold mb-12 leading-tight">
            Smart Insight for Every Farmer!
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg leading-relaxed">
                Stay updated with daily fruit & vegetable prices across cities.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg leading-relaxed">
                Get real-time weather conditions and forecasts for your region.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg leading-relaxed">
                Connect, post, and share ideas in our dedicated farmer forum.
              </p>
            </div>
          </div>

          {/* Illustration Placeholder */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-64 flex items-center justify-center">
              <img src={Dashbaord} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;