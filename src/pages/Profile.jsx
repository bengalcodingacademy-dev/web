import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';

export default function Profile() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get('/me/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
  }, []);
  
  const uploadAvatar = async () => {
    if (!file || !summary) return;
    try {
      const key = `users/${summary.id}-${file.name}`;
      const presign = await api.post('/admin/uploads/presign', { key, contentType: file.type });
      await fetch(presign.data.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
      await api.post('/me/photo', { photoUrl: presign.data.publicUrl });
      const refreshed = await api.get('/me/summary');
      setSummary(refreshed.data);
      setFile(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6">
          <Shimmer type="card" height="120px" />
          <div className="grid sm:grid-cols-3 gap-4">
            <Shimmer type="stats" />
            <Shimmer type="stats" />
            <Shimmer type="stats" />
          </div>
          <Shimmer type="card" height="100px" />
          <Shimmer type="card" height="150px" />
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid gap-4">
      <div className="flex items-center gap-4">
        {summary.photoUrl ? <img src={summary.photoUrl} className="h-16 w-16 rounded-full object-cover" /> : <div className="h-16 w-16 rounded-full bg-white/10" />}
        <div>
          <div className="text-xl">{summary.name}</div>
          <div className="text-white/70 text-sm">{summary.email}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button onClick={uploadAvatar} className="px-3 py-1.5 rounded-xl bg-bca-gold text-black">Upload photo</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 p-4"><div className="text-white/60 text-sm">Role</div><div className="text-lg">{summary.role}</div></div>
        <div className="rounded-xl border border-white/10 p-4"><div className="text-white/60 text-sm">Age</div><div className="text-lg">{summary.age ?? '-'}</div></div>
        <div className="rounded-xl border border-white/10 p-4"><div className="text-white/60 text-sm">Status</div><div className="text-lg">{summary.status}</div></div>
      </div>
      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-white/60 text-sm">Total Paid</div>
        <div className="text-bca-gold text-xl">₹{(summary.totalPaidCents/100).toFixed(2)}</div>
      </div>
      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-white/60 text-sm mb-2">Courses Purchased</div>
        <ul className="list-disc list-inside text-white/80">
          {summary.courses.map(c => <li key={c.id}>{c.title}</li>)}
          {summary.courses.length===0 && <li className="text-white/60">No courses yet</li>}
        </ul>
      </div>
    </div>
  );
}
