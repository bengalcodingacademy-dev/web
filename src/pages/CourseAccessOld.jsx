import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';
import RazorpayPayment from '../components/RazorpayPayment';

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
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const VideoIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DocumentIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CrownIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 16L3 8l5.5 5L12 4l3.5 9L21 8l-2 8H5zm2.7-2h8.6l.9-4.4L14 12l-2-4.5L10 12l-3.2-2.4L7.7 14z"/>
  </svg>
);

export default function CourseAccess() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');
  const [courseContent, setCourseContent] = useState([]);
  const [authError, setAuthError] = useState(false);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      const [courseRes, purchasesRes, contentRes] = await Promise.all([
        api.get(`/courses/id/${courseId}`),
        api.get(`/purchases/me`),
        api.get(`/course-content/course/${courseId}`)
      ]);
      setCourse(courseRes.data);
      setPurchases(purchasesRes.data);
      setCourseContent(contentRes.data);
    } catch (error) {
      console.error('Error loading course data:', error);
      
      // Check if it's an authentication error
      if (error.response?.status === 401) {
        setAuthError(true);
        setLoading(false);
        return;
      }
      
      // For other errors, redirect to dashboard
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('CourseAccess: Loading course data for courseId:', courseId);
    loadCourseData();
  }, [courseId, navigate]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showPayment) {
        setShowPayment(false);
        setSelectedMonth(null);
      }
    };

    if (showPayment) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showPayment]);

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
      (p.isMonthlyPayment || p.type === 'monthly')
    );
    
    const accessibleMonths = approvedPurchases.map(p => p.monthNumber).sort((a, b) => a - b);
    
    // Debug logging
    console.log('Debug - Course ID:', courseId);
    console.log('Debug - All purchases:', purchases);
    console.log('Debug - Approved purchases:', approvedPurchases);
    console.log('Debug - Accessible months:', accessibleMonths);
    
    return accessibleMonths;
  };

  const getPendingMonths = () => {
    if (!course || !course.isMonthlyPayment) return [];
    
    // For monthly payment courses, get all pending monthly purchases
    const pendingPurchases = purchases.filter(p => 
      p.courseId === courseId && 
      p.status === 'PENDING' && 
      (p.isMonthlyPayment || p.type === 'monthly')
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
    setShowPayment(true);
  };

  const handleViewMonthContent = (monthNumber) => {
    navigate(`/course/${courseId}/month/${monthNumber}`);
  };

  const handlePaymentSuccess = (purchase) => {
    setPaymentSuccess('Payment successful! You now have access to this month.');
    setShowPayment(false);
    setSelectedMonth(null);
    
    // Reload purchases to update the UI
    const loadPurchases = async () => {
      try {
        const purchasesRes = await api.get('/purchases/me');
        setPurchases(purchasesRes.data);
      } catch (error) {
        console.error('Error loading purchases:', error);
      }
    };
    loadPurchases();
  };

  const handlePaymentError = (error) => {
    setPaymentError(error);
    setShowPayment(false);
    setSelectedMonth(null);
  };

  const handleDownloadCertificate = () => {
    // TODO: Implement certificate generation and download
    // For now, show a success message
    setPaymentSuccess('Certificate download will be available soon! We are working on implementing this feature.');
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
          <Shimmer type="card" height="200px" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Shimmer type="card" />
            <Shimmer type="card" />
            <Shimmer type="card" />
          </div>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="p-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 mb-6 mx-auto w-24 h-24 flex items-center justify-center">
            <LockIcon className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-bca-gray-300 mb-6">
            You need to be logged in to access course content. Please log in to continue.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-bca-gold to-yellow-400 text-black rounded-lg font-semibold hover:from-yellow-400 hover:to-bca-gold transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
              style={{ boxShadow: '0 0 25px rgba(255, 193, 7, 0.4)' }}
            >
              Login to Continue
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-3 bg-bca-gray-600 text-white rounded-lg font-medium hover:bg-bca-gray-500 transition-colors"
            >
              Back to Dashboard
            </button>
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
  
  // Certificate logic
  const isCertificateUnlocked = course.isMonthlyPayment && accessibleMonths.length === totalMonths;
  const allMonthsCompleted = accessibleMonths.length === totalMonths;

  return (
    <div className="min-h-screen bg-bca-black">
      {/* Minimal Header */}
      <div className="border-b border-bca-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-bca-gray-400 text-sm">{course.shortDesc}</p>
            </div>
            {course.isMonthlyPayment && (
              <div className="text-right">
                <div className="text-sm text-bca-gray-400 mb-1">Progress</div>
                <div className="text-lg font-semibold text-white">{accessibleMonths.length}/{totalMonths}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Course Content</h2>
          <button
            onClick={loadCourseData}
            disabled={loading}
            className="px-3 py-1.5 text-sm bg-bca-gray-800 hover:bg-bca-gray-700 text-bca-gray-300 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {accessibleMonths.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <LockIcon className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Access Restricted</h3>
            <p className="text-bca-gray-400 mb-6">You need to purchase this course to access the content.</p>
            <button 
              onClick={() => navigate(`/course/${course.slug}`)}
              className="px-6 py-2 bg-bca-gold hover:bg-bca-gold/90 text-black rounded-md font-medium transition-colors"
            >
              Purchase Course
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: totalMonths }, (_, index) => {
              const monthNumber = index + 1;
              const monthContent = getMonthContent(monthNumber);
              const isAccessible = accessibleMonths.includes(monthNumber);
              const hasPendingPayment = pendingMonths.includes(monthNumber);
              
              return (
                <div
                  key={monthNumber}
                  className={`p-4 rounded-lg border transition-colors ${
                    isAccessible 
                      ? 'bg-bca-gray-800 border-bca-gray-700 hover:border-bca-gray-600' 
                      : 'bg-bca-gray-900 border-bca-gray-800 opacity-60'
                  }`}
                >
                      {isAccessible && (
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex-grow">
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
                        </div>

                        <div className="flex justify-end">
                          {isAccessible ? (
                            <button
                              onClick={() => handleViewMonthContent(monthNumber)}
                              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-bca-gold to-yellow-400 text-black hover:from-yellow-400 hover:to-bca-gold transform hover:scale-105 active:scale-95"
                              style={{ boxShadow: '0 0 25px rgba(255, 193, 7, 0.4)' }}
                            >
                              <span className="flex items-center gap-2">
                                <PlayIcon className="w-4 h-4" />
                                Start Learning
                              </span>
                            </button>
                          ) : hasPendingPayment ? (
                            <button 
                              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 cursor-not-allowed"
                              disabled
                            >
                              Approval Pending
                            </button>
                          ) : monthNumber === nextPayableMonth ? (
                            <button 
                              onClick={() => handlePayForMonth(monthNumber)}
                              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-bca-gold to-yellow-400 text-black hover:from-yellow-400 hover:to-bca-gold transform hover:scale-105 active:scale-95"
                              style={{ boxShadow: '0 0 25px rgba(255, 193, 7, 0.4)' }}
                            >
                              Pay for {monthNumber === 1 ? '1st' : monthNumber === 2 ? '2nd' : monthNumber === 3 ? '3rd' : `${monthNumber}th`} Month
                            </button>
                          ) : (
                            <button 
                              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg bg-bca-gray-600 text-bca-gray-300 cursor-not-allowed"
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
            
            {/* Certificate Card - Only show for monthly courses */}
            {course.isMonthlyPayment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + totalMonths * 0.1 }}
                className="mt-8"
              >
                <div className={`rounded-xl p-6 border transition-all duration-300 group relative overflow-hidden backdrop-blur-sm ${
                  isCertificateUnlocked 
                    ? 'bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10 border-yellow-500/30 hover:border-yellow-400/50' 
                    : 'bg-gradient-to-br from-bca-gray-800/40 to-bca-gray-900/40 border-bca-gray-700/30 opacity-60'
                }`}>
                  {/* Premium shimmer effect for locked state */}
                  {!isCertificateUnlocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse"></div>
                  )}
                  {isCertificateUnlocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Premium Certificate Design */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg border transition-all duration-300 ${
                        isCertificateUnlocked 
                          ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30 group-hover:border-yellow-400/50' 
                          : 'bg-gradient-to-br from-bca-gray-600/20 to-bca-gray-700/20 border-bca-gray-600/30'
                      }`} style={isCertificateUnlocked ? { boxShadow: '0 0 20px rgba(255,193,7,0.3)' } : {}}>
                        {isCertificateUnlocked ? (
                          <div className="relative">
                            <CrownIcon className="w-8 h-8 text-yellow-400 animate-pulse" />
                            {/* Celebration sparkles */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                          </div>
                        ) : (
                          <LockIcon className="w-8 h-8 text-bca-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${
                          isCertificateUnlocked ? 'text-white group-hover:text-yellow-300' : 'text-bca-gray-400'
                        }`}>
                          🏆 Course Completion Certificate
                        </h3>
                        <p className={`text-sm mt-1 ${
                          isCertificateUnlocked ? 'text-bca-gray-300' : 'text-bca-gray-500'
                        }`}>
                          Official certification • Verified completion
                        </p>
                      </div>
                    </div>

                    <p className={`text-sm mb-4 leading-relaxed ${
                      isCertificateUnlocked ? 'text-bca-gray-300' : 'text-bca-gray-500'
                    }`}>
                      {isCertificateUnlocked 
                        ? 'Congratulations! You have successfully completed all modules of this course. Download your official certificate to showcase your achievement.'
                        : `Complete all ${totalMonths} months to unlock your course completion certificate.`
                      }
                    </p>

                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold mb-2 ${
                        isCertificateUnlocked ? 'text-white' : 'text-bca-gray-400'
                      }`}>
                        Certificate Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Official BCA Seal',
                          'Digital Verification',
                          'Shareable Link',
                          'PDF Download'
                        ].map((feature, idx) => (
                          <span 
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs ${
                              isCertificateUnlocked 
                                ? 'bg-yellow-500/20 text-yellow-300' 
                                : 'bg-bca-gray-600/20 text-bca-gray-500'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`font-semibold transition-colors duration-300 ${
                        isCertificateUnlocked 
                          ? 'text-yellow-400 group-hover:text-yellow-300' 
                          : 'text-bca-gray-500'
                      }`}>
                        {isCertificateUnlocked ? 'Certificate Ready' : 'Locked'}
                      </span>
                      {isCertificateUnlocked ? (
                        <button 
                          onClick={() => handleDownloadCertificate()}
                          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-400 hover:to-amber-400 flex items-center gap-2"
                          style={{ boxShadow: '0 0 20px rgba(255,193,7,0.3)' }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Certificate
                        </button>
                      ) : (
                        <div className="text-right">
                          <div className="text-sm text-bca-gray-400 mb-1">
                            Progress: {accessibleMonths.length}/{totalMonths} months
                          </div>
                          <div className="w-32 bg-bca-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(accessibleMonths.length / totalMonths) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Payment Success/Error Messages */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-xl bg-bca-gray-800 border border-green-500/30 p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-400 mb-2">Payment Successful!</h3>
            <p className="text-bca-gray-300 mb-4">{paymentSuccess}</p>
            <button 
              onClick={() => setPaymentSuccess('')}
              className="px-4 py-2 rounded-xl bg-bca-gold text-black hover:bg-bca-gold/80 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}

      {paymentError && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-xl bg-bca-gray-800 border border-red-500/30 p-6 text-center"
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-2">Payment Failed</h3>
            <p className="text-bca-gray-300 mb-4">{paymentError}</p>
            <button 
              onClick={() => setPaymentError('')}
              className="px-4 py-2 rounded-xl bg-bca-gold text-black hover:bg-bca-gold/80 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      )}

      {/* Razorpay Payment Component */}
      <RazorpayPayment
        isOpen={showPayment}
        onClose={() => {
          setShowPayment(false);
          setSelectedMonth(null);
        }}
        course={course}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        isMonthlyPayment={true}
        monthNumber={selectedMonth}
        totalMonths={course?.durationMonths}
      />

    </div>
  );
}
