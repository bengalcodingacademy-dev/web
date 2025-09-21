import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

// Custom Date Picker Component
function DatePicker({ value, onChange, placeholder, disabled = false }) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

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
      onChange('');
    }
  }, [day, month, year, onChange]);

  // Generate options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-3">
      {/* Header with clear indication */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-bca-gold rounded-full"></div>
        <span className="text-white/80 text-sm font-medium">Select your birth date</span>
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
            {days.map(d => (
              <option key={d} value={d} className="bg-gray-800">{d}</option>
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
            {months.map(m => (
              <option key={m.value} value={m.value} className="bg-gray-800">{m.label}</option>
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
            {years.map(y => (
              <option key={y} value={y} className="bg-gray-800">{y}</option>
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
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('form');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const submit = async (e) => {
    e.preventDefault(); 
    setError('');
    
    if (isLoading) return; // Prevent multiple submissions
    
    if (name.trim().length < 2) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (!dateOfBirth) return setError('Please select your date of birth (day, month, and year).');
    if (password.length < 8) return setError('Create a strong password with at least 8 characters.');
    
    // Validate date format
    const dateObj = new Date(dateOfBirth);
    if (isNaN(dateObj.getTime())) return setError('Please select a valid date of birth.');
    
    // Check if user is at least 13 years old
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDiff = today.getMonth() - dateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
      age--;
    }
    if (age < 13) return setError('You must be at least 13 years old to register.');
    
    setIsLoading(true);
    
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      await api.post('/auth/register', 
        { name, email, password, dateOfBirth: dateObj.toISOString() },
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      // NO DELAY - Go directly to verification
      setStep('verify');
    } catch (e) { 
      console.error('Registration error:', e);
      let errorMessage = 'We couldn\'t create your account. Please try again.';
      
      if (e.name === 'AbortError') {
        errorMessage = 'Registration timed out. Please check your internet connection and try again.';
      } else if (e.response?.data?.error) {
        errorMessage = e.response.data.error;
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (e) => {
    e.preventDefault(); 
    setError('');
    setIsVerifying(true);
    
    try {
      await api.post('/auth/verify-email', { email, code });
      navigate('/login');
    } catch (error) {
      setError('That code didn\'t work. Please check your email and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    if (resendCooldown > 0 || isResending) return;
    
    setIsResending(true);
    setError('');
    
    try {
      // Resend the registration request to get a new OTP
      await api.post('/auth/register', { name, email, password, dateOfBirth: new Date(dateOfBirth).toISOString() });
      
      // Start cooldown timer
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (step === 'verify') {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-bca-gold to-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-white/60 text-sm md:text-base">Almost there! Check your inbox</p>
        </div>

        {/* Email Display */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-bca-gold/10 to-yellow-400/10 border border-bca-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bca-gold/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-sm">Verification code sent to</p>
              <p className="text-bca-gold font-medium">{email}</p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={verify} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Verification Code
            </label>
            <input 
              disabled={isVerifying}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
              placeholder="000000" 
              value={code} 
              onChange={e=>setCode(e.target.value)}
              maxLength={6}
              autoComplete="one-time-code"
            />
            <p className="text-white/50 text-xs text-center">Enter the 6-digit code from your email</p>
          </div>
          
          <button 
            type="submit"
            disabled={isVerifying || code.length !== 6}
            className={`w-full px-4 py-3 rounded-xl font-semibold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 transition-all duration-200 shadow-lg ${
              isVerifying || code.length !== 6
                ? 'bg-bca-gold/50 text-black/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-bca-gold to-yellow-400 text-black hover:shadow-bca-gold/25 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isVerifying ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              'Verify Email Address'
            )}
          </button>
        </form>

        {/* Help Section */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-bca-gold mt-0.5">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-white/70 flex-1">
              <p className="font-medium text-white mb-1">Didn't receive the email?</p>
              <p className="mb-3">Check your spam folder or wait a few minutes. The code expires in 15 minutes.</p>
              
              <button
                onClick={resendCode}
                disabled={resendCooldown > 0 || isResending}
                className={`text-sm px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  resendCooldown > 0 || isResending
                    ? 'border-white/20 text-white/40 cursor-not-allowed'
                    : 'border-bca-gold/50 text-bca-gold hover:bg-bca-gold/10 hover:border-bca-gold'
                }`}
              >
                {isResending ? (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 border border-bca-gold/30 border-t-bca-gold rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  'Resend Code'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-white/60 text-sm md:text-base">Join Bengal Coding Academy</p>
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
            onChange={e=>setName(e.target.value)} 
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
            onChange={e=>setEmail(e.target.value)} 
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
            onChange={e=>setPassword(e.target.value)} 
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
              ? 'bg-bca-gold/50 text-black/50 cursor-not-allowed' 
              : 'bg-bca-gold text-black hover:bg-bca-gold/90'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}
