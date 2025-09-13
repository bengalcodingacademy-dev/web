import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/authContext';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState('');
  const [txn, setTxn] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => { api.get(`/courses/${slug}`).then(r => setCourse(r.data)); }, [slug]);
  if (!course) return <div className="max-w-6xl mx-auto px-4 py-10">Loading...</div>;

  const startPayment = () => {
    if (!user) return navigate('/login?next=' + encodeURIComponent(`/course/${slug}`));
    setOpen(true);
  };

  const submitUPI = async () => {
    setError(''); setNotice('');
    if (!agree) return setError('Please agree to the terms and policies.');
    if (!/^\+?\d{8,15}$/.test(mobile)) return setError('Enter your UPI-registered mobile number (8-15 digits).');
    if (txn.length < 6) return setError('Enter a valid transaction ID.');
    await api.post('/purchases', { courseId: course.id, upiMobile: mobile, upiTxnId: txn });
    setNotice('Payment submitted. Awaiting admin approval. You will be notified.');
    setOpen(false);
    navigate('/purchases');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <div className="text-white/80 mt-2">{course.longDesc}</div>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-bca-gold text-xl">₹{(course.priceCents/100).toFixed(2)}</span>
        <button onClick={startPayment} className="px-4 py-2 rounded-xl bg-bca-gold text-black">Buy Now</button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-xl bg-bca-black border border-white/10 p-6">
            <div className="text-xl font-semibold mb-4">Select your payment system</div>
            <div className="grid gap-3 text-sm">
              <label className="flex items-center gap-2"><input type="radio" checked readOnly /> UPI</label>
              <div className="text-white/80">
                By paying with UPI (Google Pay, PhonePe, Paytm), submit your mobile and TrxID below. Admin will verify within 48 hours.
              </div>
              <label className="text-xs uppercase tracking-wide text-white/60">UPI No.</label>
              <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Enter your UPI-registered phone number" className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" />
              <label className="text-xs uppercase tracking-wide text-white/60">TrxID</label>
              <input value={txn} onChange={e=>setTxn(e.target.value)} placeholder="Enter your UPI Transaction ID" className="px-3 py-2 rounded-xl bg-black/50 border border-white/10" />
              <label className="flex items-center gap-2 mt-2"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} /> I agree to the terms and conditions, refund policy, and privacy policy.</label>
              {error && <div className="text-bca-red text-sm">{error}</div>}
              {notice && <div className="text-bca-cyan text-sm">{notice}</div>}
              <div className="flex justify-end gap-3 mt-2">
                <button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-xl border border-white/10">Cancel</button>
                <button onClick={submitUPI} className="px-4 py-2 rounded-xl bg-bca-gold text-black">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
