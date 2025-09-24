import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import PasswordInput from '../components/PasswordInput';
import PhoneEmailWidget from '../components/PhoneEmailWidget';
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-3">
      {/* Header with clear indication */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-bca-gold rounded-full"></div>
        <span className="text-white/80 text-sm font-medium">
          Select your birth date
        </span>
      </div>

      {/* Date selection dropdowns */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs text-white/60 mb-1">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select day</option>
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
            <option value="">Select month</option>
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

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('form');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

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
      console.error('Registration error:', e);
      const errorMessage = e.response?.data?.error || e.message || 'We couldn\'t create your account. Please try again.';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault(); 
    setError('');
    try {
      await api.post('/auth/verify-email', { email, code: emailCode });
      setIsEmailVerified(true);
      setEmailCode('');
    } catch {
      setError('That email code didn\'t work. Please check your email and try again.');
    }
  };

  const verifyPhone = async (e) => {
    e.preventDefault(); 
    setError('');
    try {
      await api.post('/auth/verify-phone', { phone, code: phoneCode });
      setIsPhoneVerified(true);
      setPhoneCode('');
    } catch {
      setError('That phone code didn\'t work. Please check your phone and try again.');
    }
  };

  const handlePhoneVerified = (data) => {
    console.log('Phone verified:', data);
    setIsPhoneVerified(true);
    setError('');
  };

  if (step === 'loading') {

    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-bca-gold/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-bca-gold border-t-transparent animate-spin"></div>
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              Creating your account...
            </h1>
            <p className="text-white/70 text-sm">
              Please wait while we set up your account
            </p>
          </div>

          {/* Shimmer effect */}
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Verify Your Account</h1>
          <p className="text-white/60 text-sm md:text-base">Complete verification to activate your account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Email Verification */}
        <div className="mb-6 p-4 rounded-xl bg-black/30 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isEmailVerified ? 'bg-green-500' : 'bg-bca-gold/20'}`}>
              {isEmailVerified ? (
                <span className="text-green-400 text-lg">✓</span>
              ) : (
                <span className="text-bca-gold text-lg">1</span>
              )}
            </div>
            <div>
              <h3 className="text-white font-medium">Email Verification</h3>
              <p className="text-white/60 text-sm">We sent a code to {email}</p>
            </div>
          </div>
          
          {!isEmailVerified && (
            <form onSubmit={verifyEmail} className="flex flex-col gap-3">
              <input 
                className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50" 
                placeholder="6-digit email code" 
                value={emailCode} 
                onChange={e=>setEmailCode(e.target.value)} 
              />
              <button className="px-4 py-2 rounded-xl bg-bca-gold text-black hover:bg-bca-gold/90 transition-colors">
                Verify Email
              </button>
            </form>
          )}
        </div>

        {/* Phone Verification */}
        <div className="mb-6 p-4 rounded-xl bg-black/30 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPhoneVerified ? 'bg-green-500' : 'bg-bca-gold/20'}`}>
              {isPhoneVerified ? (
                <span className="text-green-400 text-lg">✓</span>
              ) : (
                <span className="text-bca-gold text-lg">2</span>
              )}
            </div>
            <div>
              <h3 className="text-white font-medium">Phone Verification</h3>
              <p className="text-white/60 text-sm">We'll send an OTP to {phone}</p>
            </div>
          </div>
          
          {!isPhoneVerified && (
            <div className="space-y-3">
              <PhoneEmailWidget 
                email={email}
                onPhoneVerified={handlePhoneVerified}
              />
              
              {/* Fallback manual OTP option */}
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-white/60">Or verify manually</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={verifyPhone} className="flex flex-col gap-3">
                <input 
                  className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50" 
                  placeholder="6-digit phone OTP (use 123456 in development)" 
                  value={phoneCode} 
                  onChange={e=>setPhoneCode(e.target.value)} 
                />
                <button className="px-4 py-2 rounded-xl bg-bca-gold text-black hover:bg-bca-gold/90 transition-colors">
                  Verify Phone Manually
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Complete Registration Button */}
        {isEmailVerified && isPhoneVerified && (
          <div className="text-center">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
            >
              Continue to Login
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Create Account
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Join Bengal Coding Academy
        </p>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm md:text-base">
          {error}
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Email Address
          </label>
          <input
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Phone Number
          </label>
          <input 
            disabled={isLoading}
            type="tel"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
            placeholder="Enter your phone number (e.g., +91 9876543210)" 
            value={phone} 
            onChange={e=>setPhone(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Date of Birth
          </label>
          <DatePicker
            value={dateOfBirth}
            onChange={setDateOfBirth}
            placeholder="Date of Birth"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-3 rounded-xl font-semibold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 transition-all duration-200 shadow-lg ${
            isLoading
              ? "bg-bca-gold/50 text-black/50 cursor-not-allowed"
              : "bg-bca-gold text-black hover:bg-bca-gold/90"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}
