import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { CourseCard } from './components/CourseCard';
import Shimmer from '../components/Shimmer';

export default function Batches() {
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
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          <Shimmer type="course-card" count={6} />
        ) : (
          courses.map(c => <CourseCard key={c.id} c={c} />)
        )}
      </div>
      {!loading && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-bca-gray-400 text-lg">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
}
