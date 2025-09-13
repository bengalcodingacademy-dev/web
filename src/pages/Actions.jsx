import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Actions() {
  const [pending, setPending] = useState([]);
  useEffect(()=>{
    api.get('/purchases/me').then(r=>{
      setPending(r.data.filter(p=>p.status==='PENDING'));
    });
  },[]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Actions</h1>
      <div className="text-white/70 mb-4">These items are awaiting admin review. You will be notified once approved or declined.</div>
      <div className="space-y-3">
        {pending.map(p => (
          <div className="rounded-xl border border-white/10 p-4" key={p.id}>
            <div className="font-semibold">{p.course.title}</div>
            <div className="text-white/70 text-sm">UPI: {p.upiMobile} • TrxID: {p.upiTxnId}</div>
            <div className="text-bca-cyan text-sm mt-1">Status: {p.status}</div>
          </div>
        ))}
        {pending.length===0 && <div className="text-white/60">No pending actions.</div>}
      </div>
    </div>
  );
}
