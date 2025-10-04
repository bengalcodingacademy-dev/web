import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import PasswordInput from './PasswordInput';

// Custom Date Picker Component
function DatePicker({ value, onChange, placeholder, disabled = false }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Initialize from value if provided
  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setDay(date.getDate().toString());
        setMonth((date.getMonth() + 1).toString());
        setYear(date.getFullYear().toString());
      }
    }
  }, [value]);

  // Update parent when any field changes
  React.useEffect(() => {
    if (day && month && year) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        onChange(date.toISOString());
      }
    } else {
      onChange("");
    }
  }, [day, month, year, onChange]);

  // Generate options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="space-y-2">
      <label className="block text-xs text-white/60 mb-1">{placeholder}</label>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs text-white/60 mb-1">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d} className="bg-gray-800">
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-white/60 mb-1">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value} className="bg-gray-800">
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-white/60 mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y} className="bg-gray-800">
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPopup({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('form');
  const [emailCode, setEmailCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoading) return; // Prevent multiple submissions

    if (name.trim().length < 2) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (!phone || phone.length < 10) return setError('Please enter a valid phone number.');
    if (!dateOfBirth) return setError('Please select your date of birth (day, month, and year).');
    if (password.length < 8) return setError('Create a strong password with at least 8 characters.');
    
    // Validate date format
    const dateObj = new Date(dateOfBirth);
    if (isNaN(dateObj.getTime()))
      return setError("Please select a valid date of birth.");

    // Check if user is at least 13 years old
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDiff = today.getMonth() - dateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateObj.getDate())
    ) {
      age--;
    }
    if (age < 13)
      return setError("You must be at least 13 years old to register.");

    setIsLoading(true);

    try {
      await api.post('/auth/register', { name, email, phone, password, dateOfBirth: dateObj.toISOString() });
      // Add a small delay to show the loading state
      setTimeout(() => {
        setStep('verify');
        setIsLoading(false);
      }, 1500);
    } catch (e) { 
      console.error('Registration error:', e.message || 'Unknown error');
      console.error('Error response data:', e.response?.data);
      
      let errorMessage = 'We couldn\'t create your account. Please try again.';
      
      if (e.response?.data?.error?.message) {
        errorMessage = String(e.response.data.error.message);
      } else if (e.response?.data?.message) {
        errorMessage = String(e.response.data.message);
      } else if (e.response?.data?.error) {
        errorMessage = String(e.response.data.error);
      } else if (e.message) {
        errorMessage = String(e.message);
      }

      console.log('Final error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoading) return;

    if (!emailCode || emailCode.length !== 6) {
      return setError('Please enter the 6-digit verification code.');
    }

    setIsLoading(true);

    try {
      await api.post('/auth/verify-email', { email, code: emailCode });
      setIsEmailVerified(true);
      setStep('success');
      // Call onSuccess callback after successful registration
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.error('Email verification error:', e.message || 'Unknown error');
      let errorMessage = 'Invalid verification code. Please try again.';
      
      if (e.response?.data?.error?.message) {
        errorMessage = String(e.response.data.error.message);
      } else if (e.response?.data?.message) {
        errorMessage = String(e.response.data.message);
      } else if (e.response?.data?.error) {
        errorMessage = String(e.response.data.error);
      } else if (e.message) {
        errorMessage = String(e.message);
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form state when closing
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setDateOfBirth('');
    setError('');
    setStep('form');
    setEmailCode('');
    setIsLoading(false);
    setIsEmailVerified(false);
    onClose();
  };

  const handleLoginClick = () => {
    onClose(); // Close the popup first
    navigate('/login'); // Navigate to login page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-bca-gray-900 to-bca-black rounded-2xl border border-bca-cyan/20 shadow-[0_0_50px_rgba(0,189,255,0.3)] w-full max-w-md">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-bca-cyan/20">
          <h2 className="text-xl font-bold text-white">Join Bengal Coding Academy</h2>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {step === 'form' && (
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="block text-xs text-white/60 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <DatePicker
                value={dateOfBirth}
                onChange={setDateOfBirth}
                placeholder="Date of Birth"
              />

              <div>
                <label className="block text-xs text-white/60 mb-1">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-gradient-to-r from-bca-gold to-bca-cyan text-black font-bold rounded-lg hover:from-bca-gold/90 hover:to-bca-cyan/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              {/* Login Link */}
              <div className="text-center mt-2">
                <p className="text-white/70 text-xs">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={handleLoginClick}
                    className="text-bca-cyan hover:text-bca-gold transition-colors duration-200 font-semibold underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={verifyEmail} className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Verify Your Email</h3>
                <p className="text-white/80 text-sm">
                  We've sent a 6-digit verification code to <span className="text-bca-cyan font-semibold">{email}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Verification Code</label>
                <input
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-bca-gold to-bca-cyan text-black font-bold rounded-xl hover:from-bca-gold/90 hover:to-bca-cyan/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Welcome to BCA!</h3>
              <p className="text-white/80 text-sm">
                Your account has been created successfully. You can now explore our courses and start your coding journey!
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3 bg-gradient-to-r from-bca-gold to-bca-cyan text-black font-bold rounded-xl hover:from-bca-gold/90 hover:to-bca-cyan/90 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
