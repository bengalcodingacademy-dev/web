import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [coursesRes, testimonialsRes, webinarsRes] = await Promise.all([
          api.get('/courses'),
          api.get('/testimonials'),
          api.get('/webinars')
        ]);
        setCourses(coursesRes.data);
        setTestimonials(testimonialsRes.data);
        setWebinars(webinarsRes.data);
      } catch (error) {
        console.error('Error loading landing data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle scroll to section based on URL hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location.hash]);
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#17002a] to-black" />
        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-20 grid md:grid-cols-2 items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="mb-4 md:mb-6">
              <img src="/bca-logo.jpg" alt="BCA" className="h-16 w-16 md:h-24 md:w-24 rounded shadow-[0_0_50px_10px_#00a1ff] mx-auto md:mx-0" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Become a job-ready developer
            </h1>
            <p className="mt-3 md:mt-4 text-white/80 max-w-2xl mx-auto md:mx-0 text-sm md:text-base">Industry-ready courses, webinars, and guided roadmaps. Learn by building real projects.</p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/batches" className="px-4 md:px-5 py-2 md:py-3 rounded-xl bg-[#fdb000] text-black shadow-[0_0_40px_#fdb000] text-sm md:text-base text-center">Explore Batches</Link>
              <Link to="/webinars" className="px-4 md:px-5 py-2 md:py-3 rounded-xl border border-white/20 text-white text-sm md:text-base text-center">Free Webinars</Link>
            </div>
          </div>
          <div className="flex justify-center order-first md:order-last">
            <img src="/illustrator.png" alt="learn" className="max-w-xs sm:max-w-sm w-full drop-shadow-[0_0_40px_#00a1ff]" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((f,i)=> (
          <div key={i} className="rounded-2xl p-4 md:p-6 border border-white/10 bg-gradient-to-br from-[#1a0b2e] to-[#0b0b0b]">
            <div className="text-xl md:text-2xl mb-2 md:mb-3">{f.icon}</div>
            <div className="text-lg md:text-xl font-semibold mb-2" style={{color:'#00a1ff'}}>{f.title}</div>
            <div className="text-white/80 text-xs md:text-sm">{f.body}</div>
          </div>
        ))}
      </section>

      {/* Upcoming Webinars Section */}
      {webinars.length > 0 && (
        <section id="webinars" className="max-w-6xl mx-auto px-4 py-8 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {webinars.slice(0, 3).map((webinar, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-4 md:p-6 bg-gradient-to-br from-[#1a0b2e] to-[#0b0b0b]">
                {webinar.imageUrl && (
                  <img
                    src={webinar.imageUrl}
                    alt={webinar.title}
                    className="w-full h-32 md:h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="text-lg md:text-xl font-semibold mb-2" style={{color:'#00a1ff'}}>
                  {webinar.title}
                </div>
                {webinar.description && (
                  <div className="text-white/80 text-sm md:text-base mb-3">
                    {webinar.description}
                  </div>
                )}
                <div className="text-bca-cyan text-sm mb-2">
                  📅 {new Date(webinar.startTime).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                {webinar.presenter && (
                  <div className="text-bca-gray-400 text-sm mb-3">
                    👨‍🏫 {webinar.presenter}
                  </div>
                )}
                {webinar.joinLink && (
                  <a
                    href={webinar.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-bca-gold text-black rounded-lg hover:bg-bca-gold/80 transition-colors text-sm font-medium"
                  >
                    Join Webinar
                  </a>
                )}
              </div>
            ))}
          </div>
          {webinars.length > 3 && (
            <div className="text-center mt-6">
              <Link to="/webinars" className="text-bca-cyan hover:text-bca-gold transition-colors">
                View All Webinars →
              </Link>
            </div>
          )}
        </section>
      )}

      <section id="courses" className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCourseCard key={i} />)
          ) : (
            courses.slice(0,3).map(c => <CourseCard key={c.id} c={c} />)
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">What learners say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-2 md:gap-3">
          {faqs.map((f,i)=> (
            <details key={i} className="rounded-xl border border-white/10 p-3 md:p-4">
              <summary className="cursor-pointer select-none text-white text-sm md:text-base">{f.q}</summary>
              <div className="text-white/70 mt-2 text-xs md:text-sm">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Roadmaps</h2>
        <div className="grid gap-4 md:gap-6">
          {courses.map(c => (
            <div key={c.id} className="rounded-xl border border-white/10 p-3 md:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-base md:text-lg font-semibold">{c.title}</div>
                <Link to={`/course/${c.slug}`} className="text-sm md:text-base" style={{color:'#00a1ff'}}>View</Link>
              </div>
              <div className="mt-3 md:mt-4 overflow-x-auto">
                <div className="flex items-center gap-2 md:gap-3">
                  {Array.isArray(c.roadmapJson?.steps) ? c.roadmapJson.steps.map((s,idx)=> (
                    <div key={idx} className="min-w-[140px] md:min-w-[180px] rounded-xl border border-white/10 p-2 md:p-3 text-xs md:text-sm">
                      <div className="text-white/80">{s.title || `Step ${idx+1}`}</div>
                      <div className="text-white/60">{s.outcome || ''}</div>
                    </div>
                  )) : <div className="text-white/60 text-xs md:text-sm">Roadmap coming soon.</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

