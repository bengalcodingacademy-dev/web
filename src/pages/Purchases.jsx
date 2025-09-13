import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Purchases() {
  const [list, setList] = useState([]);
  useEffect(()=>{ api.get('/purchases/me').then(r=>setList(r.data)); },[]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Your Purchases</h1>
      <div className="space-y-3">
        {list.map(p => (
          <div className="rounded-xl border border-white/10 p-4" key={p.id}>
            <div className="font-semibold">{p.course.title}</div>
            <div className="text-white/70 text-sm">₹{(p.amountCents/100).toFixed(2)} • {new Date(p.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
