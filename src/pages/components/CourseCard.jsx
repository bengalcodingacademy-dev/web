import { Link } from 'react-router-dom';

export function CourseCard({ c }) {
  const price = c.priceCents || 0;
  const original = Math.round(price * 1.8);
  const discount = original > 0 ? Math.round((1 - price / original) * 100) : 0;
  return (
    <Link to={`/course/${c.slug}`} className="rounded-2xl border border-white/10 bg-black/40 hover:border-[#00a1ff] transition-colors overflow-hidden">
      {c.imageUrl && (
        <img src={c.imageUrl} alt={c.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-4">
        <div className="font-semibold leading-snug">{c.title}</div>
        <div className="text-white/70 text-sm mt-1 line-clamp-2">{c.shortDesc}</div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[#fdb000]">₹{(price/100).toFixed(0)}</span>
          <span className="text-white/40 line-through">₹{(original/100).toFixed(0)}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#00a1ff]/20 text-[#00a1ff]">{discount}% off</span>
        </div>
      </div>
    </Link>
  );
}
