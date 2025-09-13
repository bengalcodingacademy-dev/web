import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function AnnouncementBar() {
  const [ann, setAnn] = useState(null);
  useEffect(() => {
    api.get('/announcements').then(r => setAnn(r.data[0] || null)).catch(() => {});
  }, []);
  if (!ann) return null;
  return (
    <div className="bg-black/60 border-b border-white/10 text-white px-4 py-2 text-sm text-center">
      <strong className="text-bca-gold">{ann.title}: </strong>
      <span className="text-white/80">{ann.body}</span>
    </div>
  );
}
