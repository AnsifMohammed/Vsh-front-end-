import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, KeyRound, CheckCircle2, HelpCircle, RefreshCw } from 'lucide-react';
import api from '../../api/api';
import logo from '../../assets/vsh-logo-black.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/forgot-password', { email });

      if (response.data.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to send reset link. Please verify your email and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-nunito">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-gray-100 min-h-[600px]">
        
        {/* Left Side: Brand Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#4A247A] via-[#6B3FA0] to-[#2B124C] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Background Blurs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-400/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Brand Header */}
          <div className="relative z-10">
            <Link to="/home" className="inline-block bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 mb-8 hover:bg-white/25 transition-all">
              <img src={logo} alt="Vayushri Hospital" className="h-9 w-auto brightness-0 invert" />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Password Recovery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight font-inter">
              We'll Help You <span className="text-amber-300 font-extrabold">Regain Access</span>
            </h1>
            <p className="mt-3 text-purple-100 text-sm sm:text-base leading-relaxed">
              Don't worry, it happens. Enter your registered email address to receive a secure link to reset your account password.
            </p>
          </div>

          {/* Security Features */}
          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">Encrypted Password Reset Link</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-300">
                <KeyRound className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">Reset Link Valid for 24 Hours</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="relative z-10 text-xs text-purple-200/80 border-t border-white/15 pt-4">
            Remembered your password? <Link to="/login" className="text-amber-300 font-bold hover:underline">Sign In Now</Link>
          </div>
        </div>

        {/* Right Side: Form / Success Panel */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            
            {!isSubmitted ? (
              <>
                {/* Form Header */}
                <div className="mb-8">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-[#6B3FA0] mb-4 border border-purple-100">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 font-inter">Forgot Password?</h2>
                  <p className="text-gray-500 text-sm mt-1.5">Enter your email address to receive password reset instructions</p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Reset Request Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        placeholder="Enter registered email address"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]/30 focus:border-[#6B3FA0] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#6B3FA0] to-[#7A48B7] hover:opacity-95 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[#6B3FA0]/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base mt-2 transform active:scale-[0.99]"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Instructions...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#6B3FA0] transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Sign In</span>
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation Screen */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-5 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-inter mb-2">Check Your Email</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  We've sent password reset instructions to:<br />
                  <strong className="text-gray-900 font-semibold">{email}</strong>
                </p>

                {/* Instruction Card */}
                <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#6B3FA0] flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-purple-950 space-y-1">
                      <p className="font-bold">Next Steps:</p>
                      <ul className="list-disc list-inside space-y-1 text-purple-900/80">
                        <li>Check your inbox (and spam/junk folder)</li>
                        <li>Click the reset link contained in the email</li>
                        <li>Set your new secure password</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full bg-gradient-to-r from-[#6B3FA0] to-[#7A48B7] hover:opacity-95 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-[#6B3FA0]/25 transition-all text-sm"
                  >
                    Back to Sign In
                  </Link>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 px-6 rounded-xl border border-gray-200 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Resend Email</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;