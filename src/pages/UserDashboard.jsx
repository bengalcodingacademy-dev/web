import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';
import { CourseCard } from './components/CourseCard';
import { RocketIcon, BrainIcon, UsersIcon, StarIcon, TrendingUpIcon, TargetIcon, ShieldIcon, ZapIcon, BookOpenIcon, CalendarIcon, AwardIcon } from '../components/DashboardIcons';

const PlayIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StatsSection = () => {
  const stats = [
    { number: "2.5K+", label: "STUDENTS AND ALUMNI", icon: UsersIcon, color: "#00a1ff" },
    { number: "4.8/5", label: "PROGRAM RATING", icon: StarIcon, color: "#fdb000" },
    { number: "85%", label: "AVG. HIKE POST PROGRAM*", icon: TrendingUpIcon, color: "#00a1ff" },
    { number: "150+", label: "HIRING COMPANIES*", icon: TargetIcon, color: "#fdb000" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-sm font-semibold text-bca-cyan uppercase tracking-wider mb-4">
            YOUR GOALS ARE OUR GOALS
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Invest in yourself today.<br />
            Unlock success for a lifetime.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-900/50 border border-bca-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300 group-hover:shadow-lg">
                    <stat.icon className="w-8 h-8" color={stat.color} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-bca-gold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-bca-gray-300 uppercase tracking-wider group-hover:text-cyan-200 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MeetingRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ preferredDate: '', preferredTime: '', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-bca-gray-800 rounded-xl p-6 border border-bca-gray-700"
      >
        <h2 className="text-xl font-bold text-white mb-6">Schedule 1:1 Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-bca-gray-300 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 rounded-lg bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bca-gray-300 mb-2">
              Preferred Time
            </label>
            <select
              required
              className="w-full px-3 py-2 rounded-lg bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold"
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            >
              <option value="">Select time</option>
              <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
              <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
              <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-bca-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold"
              placeholder="Any specific topics you'd like to discuss?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-bca-gray-600 text-bca-gray-300 hover:bg-bca-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-bca-gold text-black font-medium hover:bg-bca-gold/80 transition-colors"
            >
              Request Meeting
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      q: "How do I access my purchased courses?",
      a: "Once your payment is approved, you'll receive access to your course materials and can start learning immediately."
    },
    {
      q: "How does monthly payment work?",
      a: "For monthly payment courses, you pay the first month's fee to get enrolled. You'll have access to course content as long as your payments are up to date. Each month's payment is due 30 days after the previous payment."
    },
    {
      q: "What happens if I miss a monthly payment?",
      a: "If you miss a payment, your course access will be restricted until the payment is made. Contact our support team if you need assistance with payment arrangements."
    },
    {
      q: "Can I get a refund if I'm not satisfied?",
      a: "We offer a 7-day money-back guarantee for all courses. Contact support if you need assistance."
    },
    {
      q: "How long do I have access to the course materials?",
      a: "You have lifetime access to all course materials, including future updates and new content."
    },
    {
      q: "What if I need help with my learning?",
      a: "You can schedule 1:1 meetings with our trainers, join our community forums, or reach out to our support team."
    },
    {
      q: "Are there any prerequisites for the courses?",
      a: "Most courses start from basics, but we recommend having basic computer knowledge for the best experience."
    }
  ];

  return (
    <section className="py-16 bg-bca-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-bca-gray-300">Get answers to common questions about our courses and platform</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden"
            >
              <details className="group">
                <summary className="cursor-pointer p-6 text-white font-semibold hover:bg-bca-gray-700/50 transition-colors flex items-center justify-between">
                  {faq.q}
                  <svg className="w-5 h-5 text-bca-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-bca-gray-300">
                  {faq.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedCoursesSection = ({ purchases, navigate }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/courses');
        setAllCourses(response.data);
      } catch (error) {
        console.error('Error loading all courses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAllCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black">
        <div className="max-w-6xl mx-auto px-4">
          <Shimmer type="text" height="40px" width="300px" className="mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Shimmer type="card" count={3} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-yellow-500/10"></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300 shadow-lg" style={{ boxShadow: '0 0 30px rgba(255, 193, 7, 0.3)' }}>
              <StarIcon className="w-12 h-12 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-yellow-400 to-orange-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(255, 193, 7, 0.3)' }}>
              Explore Our Featured Courses
            </h2>
          </div>
          <p className="text-bca-gray-300 text-lg">Discover our most popular courses and start your learning journey</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((course, index) => {
            const paymentStatus = getCoursePaymentStatus(course, purchases);
            const isPurchased = paymentStatus.hasAccess;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <CourseCard c={course} isPurchased={isPurchased} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Helper function to get course payment status and access
const getCoursePaymentStatus = (course, purchases) => {
  if (!course.isMonthlyPayment) {
    // Regular course - check if user has purchased it
    const coursePurchases = purchases.filter(p => p.courseId === course.id);
    const approvedPurchase = coursePurchases.find(p => p.status === 'PAID');

    return {
      type: 'regular',
      hasAccess: !!approvedPurchase,
      status: approvedPurchase ? 'enrolled' : 'not_purchased',
      nextPayment: null,
      paidMonths: 0,
      totalMonths: 0
    };
  }

  // Monthly payment course
  const coursePurchases = purchases.filter(p => p.courseId === course.id && p.isMonthlyPayment);
  const paidPurchases = coursePurchases.filter(p => p.status === 'PAID');
  const pendingPurchases = coursePurchases.filter(p => p.status === 'PENDING');

  const paidMonths = paidPurchases.length;
  const totalMonths = course.durationMonths || 0;
  const hasAccess = paidMonths > 0;

  // Find next payment due (next month that hasn't been paid)
  const nextMonthNumber = paidMonths + 1;
  const nextPayment = nextMonthNumber <= totalMonths ? {
    monthNumber: nextMonthNumber,
    amountRupees: course.monthlyFeeRupees,
    status: 'PENDING'
  } : null;

  let status = 'not_enrolled';
  if (paidMonths === totalMonths) {
    status = 'completed';
  } else if (pendingPurchases.length > 0) {
    status = 'pending';
  } else if (paidMonths > 0) {
    status = 'active';
  }

  return {
    type: 'monthly',
    hasAccess,
    status,
    nextPayment,
    paidMonths,
    totalMonths,
    monthlyFee: course.monthlyFeeRupees
  };
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userSummary, setUserSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setCoursesLoading(true);
        const [summaryRes, requestsRes, purchasesRes, coursesRes] = await Promise.all([
          api.get('/me/summary'),
          api.get('/me/meeting-requests'),
          api.get('/purchases/me'),
          api.get('/courses')
        ]);
        setUserSummary(summaryRes.data);
        setMeetingRequests(requestsRes.data);
        setPurchases(purchasesRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
        setCoursesLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMeetingRequest = async (formData) => {
    try {
      const response = await api.post('/me/meeting-requests', formData);
      setMeetingRequests(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Error creating meeting request:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Shimmer type="stats" height="120px" />
          <div className="grid md:grid-cols-2 gap-6">
            <Shimmer type="card" />
            <Shimmer type="card" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bca-black">
      {/* Welcome Section */}
      <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black relative overflow-hidden">
        {/* Soft background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-yellow-500/5"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* Icon + Heading */}
            <div className="flex flex-col items-center justify-center gap-6 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 shadow-md">
                <RocketIcon className="w-10 h-10 text-cyan-400" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Hi {userSummary?.name}, your journey to excellence starts here <span className="text-cyan-300 text-2xl md:text-3xl lg:text-4xl">🚀</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-bca-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Welcome to your structured learning path. Gain the right skills, build real projects,
              and prepare yourself to shine in the global tech industry.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Purchased Courses */}
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
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 10px rgba(0,161,255,0.3)' }}>Your Courses</h2>
            </div>
            {userSummary?.courses?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {userSummary.courses.map((course, index) => {
                  const paymentStatus = getCoursePaymentStatus(course, purchases);
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 rounded-xl border border-bca-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm flex flex-col h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Course Poster */}
                      {course.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}

                      <div className="relative z-10 p-6 flex flex-col h-full">
                        <div className="flex-grow">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300" style={{ boxShadow: '0 0 15px rgba(0,161,255,0.2)' }}>
                              <AwardIcon className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{course.title}</h3>
                              {course.shortDesc && (
                                <p className="text-bca-gray-300 text-sm mt-2 line-clamp-2">{course.shortDesc}</p>
                              )}
                              {course.isMonthlyPayment && (
                                <p className="text-sm text-bca-gray-400 mt-1">
                                  Monthly Payment Course
                                </p>
                              )}
                            </div>
                          </div>
                        </div>


                        <div className="flex justify-end">
                          <button
                            onClick={() => paymentStatus.hasAccess && navigate(`/course/${course.id}/access`)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${paymentStatus.hasAccess
                                ? 'bg-gradient-to-r from-bca-gold to-yellow-400 text-black hover:from-yellow-400 hover:to-bca-gold transform hover:scale-105 active:scale-95'
                                : 'bg-bca-gray-600 text-bca-gray-300 cursor-not-allowed'
                              }`}
                            style={paymentStatus.hasAccess ? { boxShadow: '0 0 25px rgba(255, 193, 7, 0.4)' } : {}}
                            disabled={!paymentStatus.hasAccess}
                          >
                            {paymentStatus.hasAccess ? (
                              <span className="flex items-center gap-2">
                                <PlayIcon className="w-4 h-4" />
                                Start Learning
                              </span>
                            ) : (
                              'Payment Required'
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="p-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300" style={{ boxShadow: '0 0 30px rgba(0,161,255,0.3)' }}>
                    <BookOpenIcon className="w-16 h-16 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">You have not enrolled in any courses yet</h3>
                <p className="text-bca-gray-300 mb-6">Explore our courses below and start your learning journey!</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section - Show only if user has no courses or wants to explore more */}
      <FeaturedCoursesSection purchases={purchases} navigate={navigate} />


      {/* Statistics Section */}
      <StatsSection />

      {/* 1:1 Meeting Section */}
      <section className="py-16 bg-gradient-to-br from-bca-gray-900 to-bca-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-yellow-500/10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-bca-gold/20 to-yellow-400/20 border border-bca-gold/30 group-hover:border-bca-gold/50 transition-all duration-300 shadow-lg" style={{ boxShadow: '0 0 30px rgba(253,176,0,0.3)' }}>
                <svg className="w-12 h-12 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-bca-gold to-yellow-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(253,176,0,0.3)' }}>Personal Mentorship</h2>
            </div>

            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-bca-gray-300 mb-4 text-lg">Get personalized guidance from our industry experts</p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-bca-gray-800/50 rounded-lg p-4 border border-bca-gray-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-bca-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold">Career Guidance</h3>
                  </div>
                  <p className="text-bca-gray-400 text-sm">Get expert advice on career paths, job opportunities, and industry insights</p>
                </div>

                <div className="bg-bca-gray-800/50 rounded-lg p-4 border border-bca-gray-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-bca-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold">Technical Support</h3>
                  </div>
                  <p className="text-bca-gray-400 text-sm">Resolve coding challenges and get help with complex technical concepts</p>
                </div>

                <div className="bg-bca-gray-800/50 rounded-lg p-4 border border-bca-gray-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-bca-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold">Project Review</h3>
                  </div>
                  <p className="text-bca-gray-400 text-sm">Get feedback on your projects and learn best practices from experts</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMeetingModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-bca-gold to-yellow-400 text-black rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-bca-gold transition-all duration-300 shadow-lg inline-flex items-center gap-3 transform hover:scale-105 active:scale-95" style={{ boxShadow: '0 0 30px rgba(255, 193, 7, 0.5)' }}
            >
              <CalendarIcon className="w-6 h-6" color="#000" />
              Schedule Mentorship Session
            </button>
          </motion.div>

          {/* Meeting Requests Status */}
          {meetingRequests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Your Meeting Requests</h3>
              <div className="space-y-4">
                {meetingRequests.map((request) => (
                  <div key={request.id} className="bg-bca-gray-800 rounded-lg p-6 border border-bca-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {new Date(request.preferredDate).toLocaleDateString()} at {request.preferredTime}
                        </h4>
                        <p className="text-bca-gray-300 text-sm">
                          Requested on {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                          request.status === 'DECLINED' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        {request.status}
                      </span>
                    </div>
                    {request.message && (
                      <p className="text-bca-gray-300 mb-3">"{request.message}"</p>
                    )}
                    {request.adminMessage && (
                      <div className="bg-bca-gray-700 rounded-lg p-4">
                        <p className="text-bca-cyan font-medium mb-1">Admin Response:</p>
                        <p className="text-white">{request.adminMessage}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Meeting Request Modal */}
      <MeetingRequestModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
        onSubmit={handleMeetingRequest}
      />
    </div>
  );
}
