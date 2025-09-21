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
    setStep('loading');
    
    try {
      await api.post('/auth/register', { name, email, password, dateOfBirth: dateObj.toISOString() });
      // Add a small delay to show the loading state
      setTimeout(() => {
        setStep('verify');
        setIsLoading(false);
      }, 1500);
    } catch (e) { 
      console.error('Registration error:', e);
      const errorMessage = e.response?.data?.error || e.message || 'We couldn\'t create your account. Please try again.';
      setError(errorMessage);
      setStep('form');
      setIsLoading(false);
    }
  };

  const verify = async (e) => {
    e.preventDefault(); setError('');
    try {
      await api.post('/auth/verify-email', { email, code });
      navigate('/login');
    } catch {
      setError('That code didn’t work. Please check your email and try again.');
    }
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
            <h1 className="text-2xl font-semibold mb-2">Creating your account...</h1>
            <p className="text-white/70 text-sm">Please wait while we set up your account</p>
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

  if (step === 'verify') {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>
        <p className="text-white/70 mb-4">We sent a 6-digit code to {email}. Enter it below to verify.</p>
        {error && <div className="mb-3 text-bca-red">{error}</div>}
        <form onSubmit={verify} className="flex flex-col gap-3">
          <input className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="6-digit code" value={code} onChange={e=>setCode(e.target.value)} />
          <button className="px-4 py-2 rounded-xl bg-bca-gold text-black">Verify</button>
        </form>
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
