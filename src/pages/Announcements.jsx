import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Announcements() {
  const [list, setList] = useState([]);
  useEffect(()=>{ api.get('/announcements').then(r=>setList(r.data)); },[]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-4">
      {list.map(a => (
        <div key={a.id} className="rounded-xl border border-white/10 p-4">
          <div className="font-semibold">{a.title}</div>
          <div className="text-white/70">{a.body}</div>
        </div>
      ))}
    </div>
  );
}
