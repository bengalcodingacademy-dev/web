import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

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
      <h1 className="text-2xl font-semibold mb-4">Reset password</h1>
      {msg && <div className="mb-3 text-bca-cyan">{msg}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input type="password" className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 rounded-xl bg-bca-gold text-black">Update password</button>
      </form>
    </div>
  );
}
