import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/reset-password', { token, password });
      setMsg('Password updated. You can now login.');
      setTimeout(()=>navigate('/login'), 1500);
    } catch {
      setMsg('This link is invalid or expired.');
    }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-white/60 text-sm md:text-base">Enter your new password</p>
      </div>
      {msg && (
        <div className={`mb-4 p-3 rounded-lg border text-sm md:text-base ${
          msg.includes('updated') 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {msg}
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <PasswordInput 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="New password" 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/50 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-bca-gold/50 focus:border-bca-gold/50 transition-all duration-200"
          />
        </div>
        <button className="w-full px-4 py-3 rounded-xl bg-bca-gold text-black font-semibold text-sm md:text-base hover:bg-bca-gold/90 focus:outline-none focus:ring-2 focus:ring-bca-gold/50 transition-all duration-200 shadow-lg">
          Update Password
        </button>
      </form>
    </div>
  );
}
