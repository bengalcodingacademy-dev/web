import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

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
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
      {error && <div className="mb-3 text-bca-red">{error}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="date" className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Date of birth" value={dateOfBirth} onChange={e=>setDateOfBirth(e.target.value)} />
        <input type="password" className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 rounded-xl bg-bca-gold text-black">Create account</button>
      </form>
    </div>
  );
}
