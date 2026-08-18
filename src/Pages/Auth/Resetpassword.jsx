import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, KeyRound, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../api/api';
import logo from '../../assets/vsh-logo-black.svg';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Invalid or missing reset token');
        setVerifying(false);
        return;
      }

      try {
        const response = await api.get(`/auth/verify-reset-token/${token}`);
        if (response.data.success) {
          setTokenValid(true);
          setUserEmail(response.data.data.email);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid or expired reset token');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword: password,
        confirmPassword
      });

      if (response.data.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while verifying token
  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-nunito">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-[#6B3FA0]/20 border-t-[#6B3FA0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium text-sm">Verifying password reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!tokenValid && !verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-nunito">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-inter mb-2">Invalid or Expired Link</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{error}</p>
          <Link
            to="/forgotpassword"
            className="inline-block w-full bg-gradient-to-r from-[#6B3FA0] to-[#7A48B7] hover:opacity-95 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-[#6B3FA0]/25 transition-all text-sm"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Account Security</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight font-inter">
              Create Your <span className="text-amber-300 font-extrabold">New Password</span>
            </h1>
            <p className="mt-3 text-purple-100 text-sm sm:text-base leading-relaxed">
              Choose a strong password to protect your personal account and health records.
            </p>
          </div>

          {/* Requirements list */}
          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-amber-300 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm font-medium text-white/90">At least 8 characters long</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-amber-300 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm font-medium text-white/90">Mix of letters, numbers & symbols</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="relative z-10 text-xs text-purple-200/80 border-t border-white/15 pt-4">
            Need help? Contact support at <a href="mailto:vyushriivfhospital@gmail.com" className="text-amber-300 font-bold hover:underline">vyushriivfhospital@gmail.com</a>
          </div>
        </div>

        {/* Right Side: Form / Success Panel */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            
            {!isSubmitted ? (
              <>
                {/* Form Header */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-[#6B3FA0] mb-4 border border-purple-100">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 font-inter">Set New Password</h2>
                  <p className="text-gray-500 text-sm mt-1">Create a strong, unique password for your account</p>
                  {userEmail && (
                    <p className="text-xs font-semibold text-[#6B3FA0] mt-2 bg-purple-50 px-3 py-1.5 rounded-lg inline-block">
                      Resetting for: {userEmail}
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        minLength={8}
                        placeholder="New Password"
                        className="w-full pl-11 pr-11 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]/30 focus:border-[#6B3FA0] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Strength Indicator */}
                    {password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-600">
                            {getStrengthText()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm New Password"
                        className="w-full pl-11 pr-11 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]/30 focus:border-[#6B3FA0] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Match indicator */}
                    {confirmPassword && (
                      <p className={`text-xs mt-1.5 font-medium ${password === confirmPassword ? 'text-emerald-600' : 'text-red-600'}`}>
                        {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!password || !confirmPassword || password !== confirmPassword || password.length < 8 || loading}
                    className="w-full bg-gradient-to-r from-[#6B3FA0] to-[#7A48B7] hover:opacity-95 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[#6B3FA0]/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base mt-4 transform active:scale-[0.99]"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Resetting Password...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-3 border-t border-gray-100">
                    <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-[#6B3FA0]">
                      Back to Sign In
                    </Link>
                  </div>

                </form>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-inter mb-2">Password Reset Successful!</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Your password has been updated successfully. You can now sign in with your new password.
                </p>
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-[#6B3FA0] to-[#7A48B7] hover:opacity-95 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[#6B3FA0]/25 transition-all text-sm"
                >
                  Continue to Sign In
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;