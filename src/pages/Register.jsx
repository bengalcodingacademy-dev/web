import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('form');
  const [code, setCode] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError('');
    if (name.trim().length < 2) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (!dateOfBirth) return setError('Please select your date of birth.');
    if (password.length < 8) return setError('Create a strong password with at least 8 characters.');
    try {
      await api.post('/auth/register', { name, email, password, dateOfBirth: new Date(dateOfBirth).toISOString() });
      setStep('verify');
    } catch (e) { setError('We couldn’t create your account. This email might be in use.'); }
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
        <div>
          <input 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200" 
            placeholder="Full name" 
            value={name} 
            onChange={e=>setName(e.target.value)} 
          />
        </div>
        <div>
          <input 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200" 
            placeholder="Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="date" 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200" 
            placeholder="Date of birth" 
            value={dateOfBirth} 
            onChange={e=>setDateOfBirth(e.target.value)} 
          />
        </div>
        <div>
          <PasswordInput 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
          />
        </div>
        <button className="w-full px-4 py-3 rounded-xl bg-bca-gold text-black font-semibold text-sm md:text-base hover:bg-bca-gold/90 focus:outline-none focus:ring-2 focus:ring-bca-gold/50 transition-all duration-200 shadow-lg">
          Create Account
        </button>
      </form>
    </div>
  );
}
