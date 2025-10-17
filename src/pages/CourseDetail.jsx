import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useAuth } from '../lib/authContext';
import Shimmer from '../components/Shimmer';
import RazorpayPayment from '../components/RazorpayPayment';

// Custom Icons
const BookOpenIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');
  const [expandedModules, setExpandedModules] = useState({});
  const [showAllIncludes, setShowAllIncludes] = useState(false);
  const [showAllSidebarIncludes, setShowAllSidebarIncludes] = useState(false);
  const [showAllDefaultIncludes, setShowAllDefaultIncludes] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  // Coupon state
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // string code
  const [discountedAmountRupees, setDiscountedAmountRupees] = useState(null);
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const courseRes = await api.get(`/courses/${slug}`);
        setCourse(courseRes.data);

        // Load purchases if user is logged in
        if (user) {
          try {
            const purchasesRes = await api.get('/purchases/me');
            setPurchases(purchasesRes.data);
          } catch (error) {
            console.error('Error loading purchases:', error);
            setPurchases([]);
          }
        }
      } catch (error) {
        console.error('Error loading course:', error);
      }
    };

    loadData();
  }, [slug, user]);

  if (!course) return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Shimmer type="card" height="400px" />
    </div>
  );

  // Check if user has purchased this course (regular or monthly)
  const hasPurchasedCourse = () => {
    if (!user || !course) return false;
    return purchases.some(purchase =>
      purchase.courseId === course.id &&
      purchase.status === 'PAID' &&
      (purchase.type === 'regular' || purchase.type === 'monthly')
    );
  };

  const startPayment = () => {
    if (!user) return navigate('/login?next=' + encodeURIComponent(`/course/${slug}`));
    setShowPayment(true);
  };

  const goToCourse = () => {
    navigate(`/course/${course.id}/access`);
  };

  const handlePaymentSuccess = (purchase) => {
    setPaymentSuccess('Payment successful! You now have access to the course.');
    setShowPayment(false);
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
    // Navigate to course after a short delay
    setTimeout(() => {
      navigate(`/course/${course.id}/access`);
    }, 2000);
  };

  // Preview and apply coupon on course page
  const applyCoupon = async () => {
    try {
      setCouponError('');
      const code = couponInput.trim().toUpperCase();
      if (!code) {
        setCouponError('Enter a valid coupon');
        return;
      }

      const isMonthly = !!course?.isMonthlyPayment;
      const res = await api.post('/purchases/create-order', {
        courseId: course.id,
        isMonthlyPayment: isMonthly,
        monthNumber: isMonthly ? 1 : null,
        totalMonths: isMonthly ? course?.durationMonths : null,
        couponCode: code
      });

      const order = res.data.order?.id ? res.data.order : res.data;
      if (!order?.amount) throw new Error('Invalid order preview');
      setAppliedCoupon(code);
      setDiscountedAmountRupees((order.amount || 0) / 100);
    } catch (e) {
      const msg = e.response?.data?.error || 'Enter a valid coupon';
      setCouponError(msg);
      setAppliedCoupon(null);
      setDiscountedAmountRupees(null);
    }
  };

  const clearCoupon = () => {
    setAppliedCoupon(null);
    setDiscountedAmountRupees(null);
    setCouponInput('');
    setCouponError('');
  };

  const handlePaymentError = (error) => {
    setPaymentError(error);
    setShowPayment(false);
  };

  const toggleModule = (index) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const courseModules = course.modulesJson || [];
  const courseIncludes = course.courseIncludes || [];

  return (
    <div className="min-h-screen bg-bca-black text-white">
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="text-sm text-bca-gray-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/batches" className="hover:text-white">Courses</Link>
          <span className="mx-2">›</span>
          <span className="text-white">{course.title}</span>
        </nav>
      </div>

      {/* Welcome Message */}
      <div className="max-w-6xl mx-auto px-4 pb-4 sm:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-bca-gold mb-2">Welcome to Bengal Coding Academy Family</h2>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 order-1">
            {/* Course Title and Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">{course.title}</h1>

              {/* Course Info Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-xs sm:text-sm">
                  <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{course.numberOfLectures || 100}+ Lectures</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm">
                  <span className="capitalize">{course.language || 'Bengali'}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400 text-xs sm:text-sm">
                  <StarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{course.starRating || 4.9} ★★★★</span>
                </div>
              </div>
            </motion.div>

            {/* About Course */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-bca-cyan to-bca-gold bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-[0_0_10px_rgba(0,189,255,0.3)]">About Course</h2>
              <div
                className="text-bca-gray-300 leading-relaxed prose prose-invert max-w-none text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: course.aboutCourse || course.shortDesc }}
              />
            </motion.div>

            {/* Course Description */}
            {course.longDesc && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-6 sm:mb-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-bca-gold to-bca-red bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-[0_0_10px_rgba(253,176,0,0.3)]">Course Description</h2>
                <div className="relative">
                  <div
                    className={`text-bca-gray-300 leading-relaxed prose prose-invert max-w-none text-sm sm:text-base transition-all duration-300 ${!showFullDescription ? 'overflow-hidden' : ''
                      }`}
                    style={{
                      display: !showFullDescription ? '-webkit-box' : 'block',
                      WebkitLineClamp: !showFullDescription ? 5 : 'unset',
                      WebkitBoxOrient: !showFullDescription ? 'vertical' : 'unset'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: showFullDescription
                        ? course.longDesc
                        : course.longDesc.length > 500
                          ? course.longDesc.substring(0, 500) + '...'
                          : course.longDesc
                    }}
                  />
                  {course.longDesc.length > 500 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="mt-3 text-bca-cyan hover:text-bca-gold transition-colors duration-200 font-medium text-sm sm:text-base flex items-center gap-2"
                    >
                      {showFullDescription ? (
                        <>
                          <span>Read less</span>
                          <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Read more...</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Course Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-xs sm:text-sm">📚</span>
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Mode of the Course</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">LIVE + Recordings</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-xs sm:text-sm">📋</span>
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">No. Of Lectures</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{course.numberOfLectures || 60} LIVE lectures + Recordings [HomeWork Solutions]</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 text-xs sm:text-sm">🎥</span>
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Class Recording Provided</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">Yes [HD Quality]</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 text-xs sm:text-sm">💬</span>
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Doubt Classes</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">20 Doubt Sessions</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 text-xs sm:text-sm">📅</span>
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Course Validity</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">2 Years</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400 text-xs sm:text-sm">&lt;/&gt;</span>
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Programming Language Used</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{course.programmingLanguage || 'C++'}</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Class starts on</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{course.startDate ? new Date(course.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '25th April, 2024'}</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Class Schedule LIVE</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{course.classSchedule || '[Monday, Wednesday, Saturday, Sunday]'}</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-3 sm:p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-bca-gray-400">Class Timings</span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">{course.classTimings || '8:30pm - 11pm'}</p>
                </div>
              </div>
            </motion.div>

            {/* Course Includes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">This Course Includes</h2>
              <p className="text-bca-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Explore the comprehensive learning experience awaiting you on this course detail page.
                From fundamental concepts to advanced techniques, discover what you will learn and how it will propel your skills to new heights.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courseIncludes.length > 0 ? (
                  <>
                    {(showAllIncludes ? courseIncludes : courseIncludes.slice(0, 6)).map((include, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">{include}</span>
                      </div>
                    ))}
                    {courseIncludes.length > 6 && (
                      <div className="col-span-1 sm:col-span-2 flex justify-center mt-3">
                        <button
                          onClick={() => setShowAllIncludes(!showAllIncludes)}
                          className="text-bca-gold hover:text-bca-gold/80 text-sm font-medium transition-colors"
                        >
                          {showAllIncludes ? 'Show Less' : `See More (${courseIncludes.length - 6} more)`}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">FlowChart & PseudoCode</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Variables & DataTypes in C++</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Operators, Conditionals & Loops</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Pattern printing</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Function & in-depth Knowledge of flow</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Arrays - 1D & 2D</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Dynamic Arrays</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Searching Algorithms</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Sorting Algorithms</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Char Arrays & Strings</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Basic Maths & Pointers</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Recursion & Backtracking</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Divide & Conquer Technique</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Time & Space Complexity of Recursive Algorithms</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Object Oriented Programming Concepts</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Linked List</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Stack & Queues</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Trees</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Heaps</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Hashing & Tries</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Graphs</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Greedy Algorithms</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Sliding Window Problems</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Dynamic Programming</span>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Bit Manipulation</span>
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex justify-center mt-3">
                      <button
                        onClick={() => setShowAllDefaultIncludes(!showAllDefaultIncludes)}
                        className="text-bca-gold hover:text-bca-gold/80 text-sm font-medium transition-colors"
                      >
                        {showAllDefaultIncludes ? 'Show Less' : 'See More...'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Course Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Comprehensive Course Modules</h2>
              <p className="text-bca-gray-300 mb-6">
                Immerse yourself in a wealth of knowledge with our comprehensive course content.
              </p>

              <div className="space-y-3">
                {courseModules.length > 0 ? courseModules.map((module, index) => (
                  <div key={index} className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                    >
                      <span className="text-white font-medium">{module.name || `Module ${index + 1}`}</span>
                      <span className={`text-bca-gray-400 transition-transform ${expandedModules[index] ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {expandedModules[index] && (
                      <div className="px-6 pb-4">
                        <div
                          className="text-bca-gray-300 prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: module.content || 'Module content will be available soon.' }}
                        />
                      </div>
                    )}
                  </div>
                )) : (
                  <>
                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(0)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">C++ & Basic of Programming</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[0] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[0] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Learn the fundamentals of C++ programming language including variables, data types, operators, and basic syntax.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(1)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">Arrays & Complexity</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[1] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[1] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Master arrays, their implementation, and understand time and space complexity analysis.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(2)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">Searching & Sorting</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[2] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[2] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Learn various searching and sorting algorithms with their implementations and complexity analysis.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(3)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">Char Arrays & Strings</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[3] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[3] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Understand character arrays, string manipulation, and common string algorithms.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(4)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">Basic Maths & Pointers</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[4] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[4] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Master mathematical concepts and pointer operations essential for advanced programming.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(5)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">Recursion & Backtracking</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[5] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[5] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Learn recursive thinking and backtracking algorithms for solving complex problems.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleModule(6)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bca-gray-700 transition-colors"
                      >
                        <span className="text-white font-medium">Backtracking, DnC & Complexity</span>
                        <span className={`text-bca-gray-400 transition-transform ${expandedModules[6] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      {expandedModules[6] && (
                        <div className="px-6 pb-4">
                          <div className="text-bca-gray-300">
                            <p>Advanced backtracking techniques, divide and conquer algorithms, and complexity analysis.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Course Summary */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-20"
            >
              <div className="bg-bca-gray-800 rounded-xl border border-bca-gray-700 overflow-hidden">
                {/* Course Banner */}
                <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Pricing */}
                <div className="p-4 sm:p-6">
                  <div className="mb-6">
                    {hasPurchasedCourse() ? (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-400" />
                          <span className="text-lg sm:text-xl font-bold text-green-400">Course Purchased</span>
                        </div>
                        <div className="text-xs sm:text-sm text-bca-gray-300">
                          You have access to this course
                        </div>
                        {course.isMonthlyPayment && (
                          <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                            <p className="text-green-400 text-xs sm:text-sm">
                              ✅ Monthly payment course - Access your monthly content
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {course.isMonthlyPayment ? (
                          <div>
                            <div className="flex items-center gap-2 sm:gap-3 mb-2">
                              <span className="text-2xl sm:text-3xl font-bold text-blue-500">₹{(discountedAmountRupees ?? (parseFloat(course.monthlyFeeRupees) || 0)).toFixed(2)}</span>
                              <span className="text-sm sm:text-lg text-bca-gray-400">per month</span>
                            </div>
                            <div className="text-xs sm:text-sm text-bca-gray-300 mb-2">
                              Duration: {course.durationMonths} months
                            </div>
                            <div className="mt-3 p-2 sm:p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                              <p className="text-blue-400 text-xs sm:text-sm">
                                💡 Pay monthly - No registration fees! Start with first month payment only.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-2xl sm:text-3xl font-bold text-blue-500">₹{(discountedAmountRupees ?? (parseFloat(course.priceRupees) || 0)).toFixed(2)}</span>
                            <span className="text-sm sm:text-lg text-bca-gray-400 line-through">₹{Math.round((parseFloat(course.priceRupees) || 0) * 1.8).toFixed(2)}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Coupon section - only if not already purchased */}
                  {!hasPurchasedCourse() && (
                    <div className="mb-5">
                      <div className="rounded-2xl border border-cyan-500/40 bg-bca-gray-900/80 shadow-[0_0_25px_rgba(0,189,255,0.15)] overflow-hidden">

                        {/* Header (dropdown toggle) */}
                        <button
                          onClick={() => setShowCoupon((prev) => !prev)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none hover:bg-bca-gray-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                              <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </div>
                            <span className="text-base font-semibold text-cyan-300">
                              Have a coupon?
                            </span>
                          </div>
                          <svg
                            className={`w-5 h-5 text-cyan-300 transition-transform duration-300 ${showCoupon ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown content */}
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${showCoupon ? "max-h-40 opacity-100 p-4" : "max-h-0 opacity-0 p-0"
                            }`}
                        >
                          {!appliedCoupon ? (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                              <input
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                placeholder="ENTER COUPON"
                                className="flex-1 w-full px-4 py-3 rounded-xl bg-bca-gray-950 border border-cyan-400/40 
                         text-white placeholder-bca-gray-500 focus:outline-none focus:ring-1 
                         focus:ring-bca-gold focus:border-bca-gold uppercase tracking-widest 
                         text-sm transition-all"
                              />
                              <button
                                onClick={applyCoupon}
                                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-bca-gold text-black font-semibold 
                         hover:bg-bca-gold/80 transition-all shadow-lg text-center"
                              >
                                Apply
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="text-green-400 font-medium text-sm sm:text-base">
                                ✅ Coupon applied: <span className="font-bold">{appliedCoupon}</span>
                              </div>
                              <button
                                onClick={clearCoupon}
                                className="text-bca-red hover:text-red-400 text-sm font-medium underline underline-offset-2"
                              >
                                Remove
                              </button>
                            </div>
                          )}

                          {couponError && (
                            <div className="mt-2 text-red-400 text-sm">{couponError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}




                  {/* Course Includes */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">This Course Includes:</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {courseIncludes.length > 0 ? (
                        <>
                          {(showAllSidebarIncludes ? courseIncludes : courseIncludes.slice(0, 6)).map((include, index) => (
                            <div key={index} className="flex items-start gap-2 sm:gap-3">
                              <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">{include}</span>
                            </div>
                          ))}
                          {courseIncludes.length > 6 && (
                            <div className="flex justify-center mt-2">
                              <button
                                onClick={() => setShowAllSidebarIncludes(!showAllSidebarIncludes)}
                                className="text-bca-gold hover:text-bca-gold/80 text-xs sm:text-sm font-medium transition-colors"
                              >
                                {showAllSidebarIncludes ? 'Show Less' : `See More (${courseIncludes.length - 6} more)`}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">No Pre-requisite Required</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">170+ hours Video Content</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">450+ Curated Coding Questions (asked by Top Companies)</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">MEGA Problem-Solving Classes [First in Industry]</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">Live Resume & Interview Preparation</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">DSA - Extreme Beginner to Advanced</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">with Doubt Assistance [dedicated Doubt Forum]</span>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-bca-gray-300 break-words leading-relaxed">with Course Completion Certificate</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  {hasPurchasedCourse() ? (
                    <button
                      onClick={goToCourse}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-base sm:text-lg rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Go to Course
                    </button>
                  ) : (
                    <button
                      onClick={startPayment}
                      className="w-full py-3 sm:py-4 bg-bca-gold text-black font-bold text-base sm:text-lg rounded-lg hover:bg-bca-gold/80 transition-colors"
                    >
                      {course.isMonthlyPayment ? 'Pay First Month' : 'Buy Now'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

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
            <p className="text-sm text-bca-gray-400">Redirecting to course...</p>
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
        onClose={() => setShowPayment(false)}
        course={course}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        isMonthlyPayment={course?.isMonthlyPayment}
        monthNumber={1}
        totalMonths={course?.durationMonths}
        couponCode={appliedCoupon}
        discountedAmountRupees={discountedAmountRupees}
      />
    </div>
  );
}


