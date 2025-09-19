import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Shimmer from './Shimmer';

export default function AnnouncementBar() {
  const [ann, setAnn] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api.get('/announcements')
      .then(r => setAnn(r.data[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) {
    return (
      <div className="bg-black/60 border-b border-white/10 text-white px-4 py-2 text-sm text-center">
        <Shimmer type="text" height="20px" width="300px" className="mx-auto" />
      </div>
    );
  }
  
  if (!ann) return null;
  
  return (
    <div className="bg-black/60 border-b border-white/10 text-white px-4 py-2 text-sm text-center">
      <strong className="text-bca-gold">{ann.title}: </strong>
      <span className="text-white/80">{ann.body}</span>
    </div>
  );
}
