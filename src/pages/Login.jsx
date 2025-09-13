import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/authContext';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setError('');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (password.length < 8) return setError('Your password must be at least 8 characters.');
    try {
      const r = await api.post('/auth/login', { email, password });
      login(r.data);
      navigate(params.get('next') || '/dashboard');
    } catch (e) { setError('We couldn’t log you in. Please check your email and password.'); }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <div className="mb-3 text-bca-red">{error}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 rounded-xl bg-bca-gold text-black">Login</button>
      </form>
      <div className="mt-3 text-sm"><Link className="text-bca-cyan" to="/forgot-password">Forgot your password?</Link></div>
    </div>
  );
}
