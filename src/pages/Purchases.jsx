import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';
import { CourseCard } from './components/CourseCard';

const CalendarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setCoursesLoading(true);
        
        // Load both purchases and courses in parallel
        const [purchasesRes, coursesRes] = await Promise.all([
          api.get('/purchases/me'),
          api.get('/courses')
        ]);
        
        setPurchases(purchasesRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        setCoursesLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Shimmer type="stats" height="120px" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Shimmer type="card" />
            <Shimmer type="card" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bca-black">
      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-bca-gray-900 to-bca-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-yellow-500/10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 shadow-lg" style={{ boxShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
                <CalendarIcon className="w-12 h-12 text-purple-400" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-400 to-cyan-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(147,51,234,0.3)' }}>
                My Purchases
              </h1>
            </div>
            <p className="text-bca-gray-300 text-lg md:text-xl">
              Track your course payments and enrollment status
            </p>
          </motion.div>
        </div>
      </section>

      {/* Purchases Section */}
      <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black">
        <div className="max-w-6xl mx-auto px-4">
          {purchases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300" style={{ boxShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
                  <CalendarIcon className="w-16 h-16 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">No Purchases Yet</h3>
              <p className="text-bca-gray-300 mb-6">You haven't made any course purchases yet. Explore our courses below to get started!</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 rounded-xl p-6 border border-bca-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                            {purchase.course.title}
                          </h3>
                          {purchase.isMonthlyPayment && (
                            <p className="text-sm text-bca-gray-400">
                              Month {purchase.monthNumber} of {purchase.totalMonths}
                            </p>
                          )}
                          {!purchase.isMonthlyPayment && (
                            <p className="text-sm text-bca-gray-400">
                              One-time Payment
                            </p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          purchase.status === 'PAID' ? 'bg-green-500/20 text-green-400' :
                          purchase.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {purchase.status === 'PAID' ? 'Approved' : 'Pending Approval'}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-bca-gray-300">Amount</span>
                          <span className="text-bca-gold font-semibold">₹{purchase.amountCents}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-bca-gray-300">Submitted</span>
                          <span className="text-white">
                            {new Date(purchase.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {purchase.status === 'PENDING' && (
                          <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                            <p className="text-yellow-400 text-sm text-center">
                              Payment pending admin approval
                            </p>
                          </div>
                        )}

                        {purchase.status === 'PAID' && (
                          <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                            <p className="text-green-400 text-sm text-center">
                              Payment approved - Course access granted
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Browse Courses Section */}
      <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-bca-gold/20 to-yellow-400/20 border border-bca-gold/30 group-hover:border-bca-gold/50 transition-all duration-300 shadow-lg" style={{ boxShadow: '0 0 30px rgba(253,176,0,0.3)' }}>
                <svg className="w-12 h-12 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-bca-gold to-yellow-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(253,176,0,0.3)' }}>
                Browse All Courses
              </h2>
            </div>
            <p className="text-bca-gray-300 text-lg md:text-xl">
              Discover our comprehensive course catalog and start your learning journey
            </p>
          </motion.div>

          {coursesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Shimmer type="card" count={6} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.map((course, index) => {
                // Check if user has purchased this course
                const isPurchased = purchases.some(purchase => 
                  purchase.course.id === course.id && purchase.status === 'PAID'
                );
                
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <CourseCard c={course} isPurchased={isPurchased} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {!coursesLoading && courses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full bg-gradient-to-br from-bca-gold/20 to-yellow-400/20 border border-bca-gold/30 group-hover:border-bca-gold/50 transition-all duration-300" style={{ boxShadow: '0 0 30px rgba(253,176,0,0.3)' }}>
                  <svg className="w-16 h-16 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-white to-bca-gold bg-clip-text text-transparent">No Courses Available</h3>
              <p className="text-bca-gray-300">New courses are being added regularly. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}