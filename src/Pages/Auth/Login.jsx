import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Calendar, HeartPulse, CheckCircle2 } from 'lucide-react';
import api from '../../api/api';
import logo from '../../assets/vsh-logo-black.svg';
import bgImage from '../../assets/home-hero.webp';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const successMsg = location.state?.message || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const userData = response.data.data;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));

        // If remember me is checked, store email
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-nunito relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(28, 10, 52, 0.88) 0%, rgba(74, 36, 122, 0.82) 45%, rgba(13, 4, 26, 0.94) 100%), url(${bgImage})`
      }}
    >
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Container */}
      <div className="w-full max-w-5xl bg-white/98 backdrop-blur-xl rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-white/30 min-h-[640px] relative z-10">
        
        {/* Left Side: Brand Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#4A247A] via-[#6B3FA0] to-[#2B124C] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-400/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Brand Header */}
          <div className="relative z-10">
            <Link to="/home" className="inline-block bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 mb-8 hover:bg-white/25 transition-all">
              <img src={logo} alt="Vayushri Hospital" className="h-9 w-auto brightness-0 invert" />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patient & Staff Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight font-inter">
              Welcome Back to <span className="text-amber-300 font-extrabold">Vayushri</span>
            </h1>
            <p className="mt-3 text-purple-100 text-sm sm:text-base leading-relaxed">
              Access your health record, view lab reports, manage appointment schedules, and stay connected with your care team.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">100% Secure & Encrypted Access</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-300">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">Instant Consultation Booking</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-300">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">Personalized Fertility Care</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 text-xs text-purple-200/80 border-t border-white/15 pt-4">
            Need urgent assistance? Call us at <a href="tel:+917708555635" className="text-amber-300 font-bold hover:underline">+91 77085 55635</a>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 font-inter">Sign In</h2>
              <p className="text-gray-500 text-sm mt-1.5">Enter your account credentials to continue</p>
            </div>

            {/* Redirect Success Message */}
            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Address Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email address"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]/30 focus:border-[#6B3FA0] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Password
                  </label>
                  <Link to="/forgotpassword" className="text-xs font-semibold text-[#6B3FA0] hover:text-[#4A247A] transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full pl-11 pr-11 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]/30 focus:border-[#6B3FA0] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#6B3FA0] rounded border-gray-300 focus:ring-[#6B3FA0] accent-[#6B3FA0]"
                  />
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">Remember email</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#6B3FA0] to-[#7A48B7] hover:opacity-95 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[#6B3FA0]/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base mt-2 transform active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Link to Signup */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Don't have an account yet?{' '}
                  <Link to="/signup" className="font-bold text-[#6B3FA0] hover:text-[#4A247A] transition-colors">
                    Create account
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Sparkles component
const Sparkles = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default Login;