import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { CourseCard } from './components/CourseCard';
import { SkeletonCourseCard } from '../components/Skeleton';

const faqs = [
  { q: 'How do I pay with UPI?', a: 'Buy Now on a course, enter your UPI mobile and transaction ID, and wait for admin approval.' },
  { q: 'Do I need prior experience?', a: 'No. Our batches start from fundamentals and grow to advanced topics.' },
  { q: 'Will I get recordings?', a: 'Yes, sessions and materials are shared for revision.' }
];

const features = [
  { icon: '▶', title: '1000+ Videos', body: 'High-quality lessons from fundamentals to advanced with real projects.' },
  { icon: '💡', title: '85+ Projects', body: 'Hands-on labs and guided tasks to build a strong portfolio.' },
  { icon: '</>', title: 'Assignments', body: 'Regular assignments and feedback to ensure mastery.' }
];

export default function Landing() {
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [coursesRes, testimonialsRes] = await Promise.all([
          api.get('/courses'),
          api.get('/testimonials')
        ]);
        setCourses(coursesRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error('Error loading landing data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#17002a] to-black" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 items-center gap-8">
          <div>
            <div className="mb-6">
              <img src="/bca-logo.jpg" alt="BCA" className="h-24 w-24 rounded shadow-[0_0_50px_10px_#00a1ff]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Become a job-ready developer
            </h1>
            <p className="mt-4 text-white/80 max-w-2xl">Industry-ready courses, webinars, and guided roadmaps. Learn by building real projects.</p>
            <div className="mt-8 flex gap-3">
              <Link to="/batches" className="px-5 py-3 rounded-xl bg-[#fdb000] text-black shadow-[0_0_40px_#fdb000]">Explore Batches</Link>
              <Link to="/webinars" className="px-5 py-3 rounded-xl border border-white/20 text-white">Free Webinars</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="/illustrator.png" alt="learn" className="max-w-sm w-full drop-shadow-[0_0_40px_#00a1ff]" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-6">
        {features.map((f,i)=> (
          <div key={i} className="rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#1a0b2e] to-[#0b0b0b]">
            <div className="text-2xl mb-3">{f.icon}</div>
            <div className="text-xl font-semibold mb-2" style={{color:'#00a1ff'}}>{f.title}</div>
            <div className="text-white/80 text-sm">{f.body}</div>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCourseCard key={i} />)
          ) : (
            courses.slice(0,3).map(c => <CourseCard key={c.id} c={c} />)
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold mb-6">What learners say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-5 animate-pulse">
                <div className="h-4 bg-bca-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-bca-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-bca-gray-700 rounded w-2/3"></div>
              </div>
            ))
          ) : testimonials.length > 0 ? (
            testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-5">
                <div className="flex items-center gap-3 mb-3">
                  {t.studentImage ? (
                    <img
                      src={t.studentImage}
                      alt={t.studentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-bca-gray-700 flex items-center justify-center">
                      <span className="text-bca-gray-300 font-bold">
                        {t.studentName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold">{t.studentName}</div>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <span
                          key={idx}
                          className={`text-sm ${idx < t.rating ? 'text-bca-gold' : 'text-bca-gray-600'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-white/80 italic">"{t.comment}"</div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-bca-gray-400">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-3">
          {faqs.map((f,i)=> (
            <details key={i} className="rounded-xl border border-white/10 p-4">
              <summary className="cursor-pointer select-none text-white">{f.q}</summary>
              <div className="text-white/70 mt-2">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold mb-6">Roadmaps</h2>
        <div className="grid gap-6">
          {courses.map(c => (
            <div key={c.id} className="rounded-xl border border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{c.title}</div>
                <Link to={`/course/${c.slug}`} className="" style={{color:'#00a1ff'}}>View</Link>
              </div>
              <div className="mt-4 overflow-x-auto">
                <div className="flex items-center gap-3">
                  {Array.isArray(c.roadmapJson?.steps) ? c.roadmapJson.steps.map((s,idx)=> (
                    <div key={idx} className="min-w-[180px] rounded-xl border border-white/10 p-3 text-sm">
                      <div className="text-white/80">{s.title || `Step ${idx+1}`}</div>
                      <div className="text-white/60">{s.outcome || ''}</div>
                    </div>
                  )) : <div className="text-white/60">Roadmap coming soon.</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

