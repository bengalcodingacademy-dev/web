import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { SkeletonCard } from '../components/Skeleton';

const BookOpenIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function CourseAccess() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [paymentData, setPaymentData] = useState({ upiMobile: '', upiTxnId: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        const [courseRes, purchasesRes] = await Promise.all([
          api.get(`/courses/id/${courseId}`),
          api.get('/purchases/me')
        ]);
        setCourse(courseRes.data);
        setPurchases(purchasesRes.data);
      } catch (error) {
        console.error('Error loading course data:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadCourseData();
  }, [courseId, navigate]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showPaymentModal && !submitting) {
        setShowPaymentModal(false);
        setPaymentData({ upiMobile: '', upiTxnId: '' });
        setSelectedMonth(null);
      }
    };

    if (showPaymentModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showPaymentModal, submitting]);

  const getAccessibleMonths = () => {
    if (!course || !course.isMonthlyPayment) {
      // For one-time payment courses, check if user has any approved purchase
      const approvedPurchase = purchases.find(p => 
        p.courseId === courseId && p.status === 'PAID'
      );
      return approvedPurchase ? [1] : [];
    }

    // For monthly payment courses, get all approved monthly purchases
    const approvedPurchases = purchases.filter(p => 
      p.courseId === courseId && 
      p.status === 'PAID' && 
      p.isMonthlyPayment
    );
    
    return approvedPurchases.map(p => p.monthNumber).sort((a, b) => a - b);
  };

  const getPendingMonths = () => {
    if (!course || !course.isMonthlyPayment) return [];
    
    // For monthly payment courses, get all pending monthly purchases
    const pendingPurchases = purchases.filter(p => 
      p.courseId === courseId && 
      p.status === 'PENDING' && 
      p.isMonthlyPayment
    );
    
    return pendingPurchases.map(p => p.monthNumber).sort((a, b) => a - b);
  };

  const getNextPayableMonth = () => {
    if (!course || !course.isMonthlyPayment) return null;
    
    const paidMonths = getAccessibleMonths();
    const pendingMonths = getPendingMonths();
    
    // Find the next month that can be paid for
    // It should be the month after the highest paid month, and not already pending
    const highestPaidMonth = paidMonths.length > 0 ? Math.max(...paidMonths) : 0;
    const nextMonth = highestPaidMonth + 1;
    
    // Only return if next month exists and is not already pending
    if (nextMonth <= course.durationMonths && !pendingMonths.includes(nextMonth)) {
      return nextMonth;
    }
    
    return null;
  };

  const handlePayForMonth = (monthNumber) => {
    setSelectedMonth(monthNumber);
    setPaymentData({ upiMobile: '', upiTxnId: '' });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    if (!paymentData.upiMobile || !paymentData.upiTxnId) {
      alert('Please fill in all payment details');
      return;
    }

    if (!course || !selectedMonth) {
      alert('Invalid payment request. Please try again.');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/purchases', {
        courseId: courseId,
        upiMobile: paymentData.upiMobile,
        upiTxnId: paymentData.upiTxnId,
        amountCents: course.monthlyFeeCents,
        isMonthlyPayment: true,
        monthNumber: selectedMonth,
        totalMonths: course.durationMonths
      });
      
      // Reload purchases to show updated status
      const purchasesRes = await api.get('/purchases/me');
      setPurchases(purchasesRes.data);
      
      // Close modal and show success message
      setShowPaymentModal(false);
      setPaymentData({ upiMobile: '', upiTxnId: '' });
      setSelectedMonth(null);
      
      alert('Payment submitted successfully! Awaiting admin approval.');
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getMonthContent = (monthNumber) => {
    const monthContents = {
      1: {
        title: "Month 1: Fundamentals & Setup",
        description: "Learn the basics of MERN stack development, environment setup, and project structure.",
        topics: ["Introduction to MERN", "Environment Setup", "Project Structure", "Basic Concepts"],
        duration: "4 weeks",
        lessons: 12
      },
      2: {
        title: "Month 2: Frontend Development",
        description: "Master React.js fundamentals, components, state management, and modern React patterns.",
        topics: ["React Components", "State Management", "Hooks", "Routing"],
        duration: "4 weeks",
        lessons: 15
      },
      3: {
        title: "Month 3: Backend Development",
        description: "Build robust APIs with Node.js and Express, implement authentication and middleware.",
        topics: ["Node.js Basics", "Express.js", "Authentication", "Middleware"],
        duration: "4 weeks",
        lessons: 18
      },
      4: {
        title: "Month 4: Database Integration",
        description: "Work with MongoDB, design schemas, implement CRUD operations and data relationships.",
        topics: ["MongoDB Basics", "Schema Design", "CRUD Operations", "Data Relationships"],
        duration: "4 weeks",
        lessons: 16
      },
      5: {
        title: "Month 5: Full Stack Integration",
        description: "Connect frontend and backend, implement real-time features, and handle data flow.",
        topics: ["API Integration", "Real-time Features", "Data Flow", "Error Handling"],
        duration: "4 weeks",
        lessons: 20
      },
      6: {
        title: "Month 6: Advanced Topics & Deployment",
        description: "Learn advanced concepts, testing, optimization, and deploy your applications.",
        topics: ["Testing", "Performance Optimization", "Deployment", "Best Practices"],
        duration: "4 weeks",
        lessons: 14
      }
    };

    return monthContents[monthNumber] || {
      title: `Month ${monthNumber}`,
      description: "Advanced course content and practical projects.",
      topics: ["Advanced Topics", "Projects", "Assignments"],
      duration: "4 weeks",
      lessons: 12
    };
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <SkeletonCard />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-bca-gold text-black rounded-lg font-medium hover:bg-bca-gold/80 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const accessibleMonths = getAccessibleMonths();
  const pendingMonths = getPendingMonths();
  const nextPayableMonth = getNextPayableMonth();
  const totalMonths = course.isMonthlyPayment ? course.durationMonths : 1;

  return (
    <div className="min-h-screen bg-bca-black">
      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-bca-gray-900 to-bca-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-yellow-500/10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300 shadow-lg" style={{ boxShadow: '0 0 30px rgba(0,161,255,0.3)' }}>
                <BookOpenIcon className="w-12 h-12 text-cyan-400" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(0,161,255,0.3)' }}>
                {course.title}
              </h1>
            </div>
            <p className="text-bca-gray-300 text-lg md:text-xl mb-4">
              {course.shortDesc}
            </p>
            {course.isMonthlyPayment && (
              <div className="flex items-center justify-center gap-4 text-bca-gray-400">
                <span>Progress: {accessibleMonths.length}/{totalMonths} months</span>
                <div className="w-32 bg-bca-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(accessibleMonths.length / totalMonths) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300" style={{ boxShadow: '0 0 20px rgba(0,161,255,0.2)' }}>
                <BookOpenIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 10px rgba(0,161,255,0.3)' }}>Course Content</h2>
            </div>

            {accessibleMonths.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="p-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300" style={{ boxShadow: '0 0 30px rgba(239,68,68,0.3)' }}>
                    <LockIcon className="w-16 h-16 text-red-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">Access Restricted</h3>
                <p className="text-bca-gray-300 mb-6">You need to purchase this course to access the content.</p>
                <button 
                  onClick={() => navigate(`/course/${course.slug}`)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg inline-flex items-center gap-2" style={{ boxShadow: '0 0 20px rgba(0,161,255,0.3)' }}
                >
                  Purchase Course
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: totalMonths }, (_, index) => {
                  const monthNumber = index + 1;
                  const monthContent = getMonthContent(monthNumber);
                  const isAccessible = accessibleMonths.includes(monthNumber);
                  const hasPendingPayment = pendingMonths.includes(monthNumber);
                  
                  return (
                    <motion.div
                      key={monthNumber}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`rounded-xl p-6 border transition-all duration-300 group relative overflow-hidden backdrop-blur-sm ${
                        isAccessible 
                          ? 'bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 border-bca-gray-700/50 hover:border-cyan-500/50' 
                          : 'bg-gradient-to-br from-bca-gray-800/40 to-bca-gray-900/40 border-bca-gray-700/30 opacity-60'
                      }`}
                    >
                      {isAccessible && (
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                      <div className="relative z-10">
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`p-2 rounded-lg border transition-all duration-300 ${
                            isAccessible 
                              ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/30 group-hover:border-cyan-400/50' 
                              : 'bg-gradient-to-br from-bca-gray-600/20 to-bca-gray-700/20 border-bca-gray-600/30'
                          }`} style={isAccessible ? { boxShadow: '0 0 15px rgba(0,161,255,0.2)' } : {}}>
                            {isAccessible ? (
                              <PlayIcon className="w-6 h-6 text-cyan-400" />
                            ) : (
                              <LockIcon className="w-6 h-6 text-bca-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold transition-colors duration-300 ${
                              isAccessible ? 'text-white group-hover:text-cyan-300' : 'text-bca-gray-400'
                            }`}>
                              {monthContent.title}
                            </h3>
                            <p className={`text-sm mt-1 ${
                              isAccessible ? 'text-bca-gray-300' : 'text-bca-gray-500'
                            }`}>
                              {monthContent.duration} • {monthContent.lessons} lessons
                            </p>
                          </div>
                        </div>

                        <p className={`text-sm mb-4 leading-relaxed ${
                          isAccessible ? 'text-bca-gray-300' : 'text-bca-gray-500'
                        }`}>
                          {monthContent.description}
                        </p>

                        <div className="mb-4">
                          <h4 className={`text-sm font-semibold mb-2 ${
                            isAccessible ? 'text-white' : 'text-bca-gray-400'
                          }`}>
                            Topics Covered:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {monthContent.topics.slice(0, 3).map((topic, idx) => (
                              <span 
                                key={idx}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  isAccessible 
                                    ? 'bg-cyan-500/20 text-cyan-300' 
                                    : 'bg-bca-gray-600/20 text-bca-gray-500'
                                }`}
                              >
                                {topic}
                              </span>
                            ))}
                            {monthContent.topics.length > 3 && (
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                isAccessible 
                                  ? 'bg-cyan-500/20 text-cyan-300' 
                                  : 'bg-bca-gray-600/20 text-bca-gray-500'
                              }`}>
                                +{monthContent.topics.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`font-semibold transition-colors duration-300 ${
                            isAccessible 
                              ? 'text-bca-gold group-hover:text-yellow-300' 
                              : hasPendingPayment 
                                ? 'text-yellow-400' 
                                : 'text-bca-gray-500'
                          }`}>
                            {isAccessible ? 'Access Granted' : hasPendingPayment ? 'Payment Pending' : 'Locked'}
                          </span>
                          {isAccessible ? (
                            <button 
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400"
                              style={{ boxShadow: '0 0 20px rgba(0,161,255,0.3)' }}
                            >
                              Start Learning
                            </button>
                          ) : hasPendingPayment ? (
                            <button 
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 cursor-not-allowed"
                              disabled
                            >
                              Payment Pending
                            </button>
                          ) : monthNumber === nextPayableMonth ? (
                            <button 
                              onClick={() => handlePayForMonth(monthNumber)}
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg bg-gradient-to-r from-bca-gold to-yellow-500 text-black hover:from-yellow-400 hover:to-bca-gold"
                              style={{ boxShadow: '0 0 20px rgba(255,193,7,0.3)' }}
                            >
                              Pay for {monthNumber === 1 ? '1st' : monthNumber === 2 ? '2nd' : monthNumber === 3 ? '3rd' : `${monthNumber}th`} Month
                            </button>
                          ) : (
                            <button 
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg bg-bca-gray-600 text-bca-gray-300 cursor-not-allowed"
                              disabled
                            >
                              Locked
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPaymentModal(false);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-bca-gray-800 rounded-xl p-6 w-full max-w-md border border-bca-gray-700 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                Pay for {selectedMonth === 1 ? '1st' : selectedMonth === 2 ? '2nd' : selectedMonth === 3 ? '3rd' : `${selectedMonth}th`} Month
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-bca-gray-400 hover:text-white transition-colors"
                disabled={submitting}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bca-gray-300 mb-2">
                  Amount
                </label>
                <div className="text-2xl font-bold text-bca-gold">
                  ₹{course?.monthlyFeeCents}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bca-gray-300 mb-2">
                  UPI Mobile Number *
                </label>
                <input
                  type="text"
                  placeholder="Enter your UPI mobile number"
                  className="w-full px-3 py-2 rounded-lg bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold"
                  value={paymentData.upiMobile}
                  onChange={(e) => setPaymentData({ ...paymentData, upiMobile: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-bca-gray-300 mb-2">
                  UPI Transaction ID *
                </label>
                <input
                  type="text"
                  placeholder="Enter UPI transaction ID"
                  className="w-full px-3 py-2 rounded-lg bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold"
                  value={paymentData.upiTxnId}
                  onChange={(e) => setPaymentData({ ...paymentData, upiTxnId: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (!submitting) {
                    setShowPaymentModal(false);
                    setPaymentData({ upiMobile: '', upiTxnId: '' });
                    setSelectedMonth(null);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-bca-gray-600 text-white hover:bg-bca-gray-500 transition-colors disabled:opacity-50"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmit}
                disabled={submitting}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-bca-gold to-yellow-500 text-black font-medium hover:from-yellow-400 hover:to-bca-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Payment'}
              </button>
            </div>
            
            {submitting && (
              <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                <div className="bg-bca-gray-800 px-4 py-2 rounded-lg border border-bca-gray-600">
                  <div className="flex items-center gap-2 text-white">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bca-gold"></div>
                    <span>Processing payment...</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
