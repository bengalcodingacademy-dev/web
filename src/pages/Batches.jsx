import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { CourseCard } from './components/CourseCard';
import { SkeletonCourseCard } from '../components/Skeleton';

export default function Batches() {
  const [q, setQ] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);
  
  const filtered = useMemo(() => courses.filter(c => (c.title + ' ' + c.shortDesc).toLowerCase().includes(q.toLowerCase())), [q, courses]);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-4">
        <input 
          value={q} 
          onChange={e=>setQ(e.target.value)} 
          placeholder="Search batches" 
          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-bca-gray-400 focus:outline-none focus:border-bca-gold" 
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCourseCard key={i} />)
        ) : (
          filtered.map(c => <CourseCard key={c.id} c={c} />)
        )}
      </div>
      {!loading && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-bca-gray-400 text-lg">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}
