import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

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
        'Failed to send reset link. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-teal-50 flex items-center justify-center p-4 font-['Crimson_Pro']">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left side - Branding */}
        <div className="bg-gradient-to-br from-rose-100 via-blue-100 to-teal-100 p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800 font-['Playfair_Display']">Vayushri Hospital</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight font-['Playfair_Display']">
                We're Here<br />
                To Help You<br />
                Get Back In
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 font-['Lato']">
                Don't worry, it happens to everyone. We'll send you instructions to reset your password and get you back to managing your health.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-['Lato']">Secure password reset process</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-['Lato']">Reset link valid for 24 hours</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-['Lato']">Your data remains protected</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/30">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 font-['Lato']">Need immediate assistance?</h3>
                    <p className="text-sm text-gray-600 font-['Lato']">
                      Contact our support team at <a href="tel:1-800-HEALTH" className="text-teal-600 font-semibold hover:text-teal-700">1-800-HEALTH</a> or email <a href="mailto:support@healthcare.com" className="text-teal-600 font-semibold hover:text-teal-700">support@healthcare.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Forgot Password form */}
        <div className="p-12 md:p-16 flex flex-col justify-center">
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-['Playfair_Display']">Reset Password</h2>
                <p className="text-gray-600 font-['Lato']">Enter your email address and we'll send you a link to reset your password.</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-700 font-['Lato']">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 font-['Lato']">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white/50 backdrop-blur-sm font-['Lato']"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-['Lato']">
                    Enter the email address associated with your account
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-['Lato']"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                {/* Back to login link */}
                <div className="text-center">
                  <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-teal-600 transition-colors font-['Lato']">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Sign In
                  </Link>
                </div>
              </form>

              {/* Additional help */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3 font-['Lato']">
                  <strong>Remember your password?</strong>
                </p>
                <Link to="/login" className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors font-['Lato']">
                  Return to login page →
                </Link>
              </div>
            </>
          ) : (
            // Success state
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-3 font-['Playfair_Display']">Check Your Email</h2>
              
              <p className="text-gray-600 mb-6 font-['Lato']">
                We've sent password reset instructions to<br />
                <strong className="text-gray-800">{email}</strong>
              </p>

              <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3 text-left">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-teal-800 font-['Lato']">
                    <p className="font-semibold mb-1">What to do next:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Check your inbox (and spam folder)</li>
                      <li>Click the reset link in the email</li>
                      <li>Create your new password</li>
                      <li>Sign in with your new credentials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6 font-['Lato']">
                The link will expire in 24 hours for security reasons.
              </p>

              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-['Lato'] text-center"
                >
                  Back to Sign In
                </Link>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all font-['Lato']"
                >
                  Resend Email
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-['Lato']">
                  Didn't receive the email?<br />
                  Check your spam folder or{' '}
                  <Link to="/contact" className="font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                    contact support
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

 

      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;600;700&family=Crimson_Pro:wght@300;400;600&display=swap');
      `}</style>
    </div>
  );
};

export default ForgotPassword;