import { useState } from 'react';
import { api } from '../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/forgot-password', { email });
    setMsg('If your email exists, we sent reset instructions. Check your inbox.');
  };
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
      {msg && <div className="mb-3 text-bca-cyan">{msg}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="px-4 py-2 rounded-xl bg-bca-gold text-black">Send reset link</button>
      </form>
    </div>
  );
}
