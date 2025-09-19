import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';

export default function Webinars() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadWebinars = async () => {
      try {
        setLoading(true);
        const response = await api.get('/webinars');
        setItems(response.data);
      } catch (error) {
        console.error('Error loading webinars:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWebinars();
  }, []);
  
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-4">
        <Shimmer type="card" count={3} />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-4">
      {items.map(w => (
        <div key={w.id} className="rounded-xl border border-white/10 p-4">
          <div className="font-semibold">{w.title}</div>
          <div className="text-white/70">{w.description}</div>
          <div className="text-bca-cyan text-sm mt-1">{new Date(w.startTime).toLocaleString()}</div>
          {w.joinLink && <a className="text-bca-gold text-sm" href={w.joinLink} target="_blank">Join</a>}
        </div>
      ))}
      {items.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-bca-gray-400 text-lg">No webinars scheduled.</p>
        </div>
      )}
    </div>
  );
}
