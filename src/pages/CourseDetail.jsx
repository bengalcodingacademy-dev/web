import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useAuth } from '../lib/authContext';

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
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState('');
  const [txn, setTxn] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [expandedModules, setExpandedModules] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => { 
    api.get(`/courses/${slug}`).then(r => setCourse(r.data)); 
  }, [slug]);

  if (!course) return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="animate-pulse">
        <div className="h-8 bg-bca-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-bca-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-bca-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  );

  const startPayment = () => {
    if (!user) return navigate('/login?next=' + encodeURIComponent(`/course/${slug}`));
    setOpen(true);
  };

  const submitUPI = async () => {
    setError(''); setNotice('');
    if (!agree) return setError('Please agree to the terms and policies.');
    if (!/^\+?\d{8,15}$/.test(mobile)) return setError('Enter your UPI-registered mobile number (8-15 digits).');
    if (txn.length < 6) return setError('Enter a valid transaction ID.');
    await api.post('/purchases', { courseId: course.id, upiMobile: mobile, upiTxnId: txn });
    setNotice('Payment submitted. Awaiting admin approval. You will be notified.');
    setOpen(false);
    navigate('/purchases');
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
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-bca-gold mb-2">Welcome to @supreme-dev Family</h2>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Title and Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
              
              {/* Course Info Tags */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">
                  <BookOpenIcon className="w-4 h-4" />
                  <span>{course.numberOfLectures || 100}+ Lectures</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm">
                  <span className="capitalize">{course.language || 'Bengali'}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400 text-sm">
                  <StarIcon className="w-4 h-4" />
                  <span>{course.starRating || 4.9} ★★★★</span>
                </div>
              </div>
            </motion.div>

            {/* About Course */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About Course</h2>
              <div 
                className="text-bca-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: course.aboutCourse || course.longDesc }}
              />
            </motion.div>

            {/* Course Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-sm">📚</span>
                    </div>
                    <span className="text-sm text-bca-gray-400">Mode of the Course</span>
                  </div>
                  <p className="text-white font-medium">LIVE + Recordings</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-sm">📋</span>
                    </div>
                    <span className="text-sm text-bca-gray-400">No. Of Lectures</span>
                  </div>
                  <p className="text-white font-medium">{course.numberOfLectures || 60} LIVE lectures + Recordings [HomeWork Solutions]</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 text-sm">🎥</span>
                    </div>
                    <span className="text-sm text-bca-gray-400">Class Recording Provided</span>
                  </div>
                  <p className="text-white font-medium">Yes [HD Quality]</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 text-sm">💬</span>
                    </div>
                    <span className="text-sm text-bca-gray-400">Doubt Classes</span>
                  </div>
                  <p className="text-white font-medium">20 Doubt Sessions</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 text-sm">📅</span>
                    </div>
                    <span className="text-sm text-bca-gray-400">Course Validity</span>
                  </div>
                  <p className="text-white font-medium">2 Years</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400 text-sm">&lt;/&gt;</span>
                    </div>
                    <span className="text-sm text-bca-gray-400">Programming Language Used</span>
                  </div>
                  <p className="text-white font-medium">C++</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-sm text-bca-gray-400">Class starts on</span>
                  </div>
                  <p className="text-white font-medium">{course.startDate ? new Date(course.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '25th April, 2024'}</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-sm text-bca-gray-400">Class Schedule LIVE</span>
                  </div>
                  <p className="text-white font-medium">[Monday, Wednesday, Saturday, Sunday]</p>
                </div>

                <div className="bg-bca-gray-800 rounded-lg p-4 border border-bca-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-4 h-4 text-pink-400" />
                    </div>
                    <span className="text-sm text-bca-gray-400">Class Timings</span>
                  </div>
                  <p className="text-white font-medium">8:30pm - 11pm</p>
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
              <h2 className="text-2xl font-bold text-white mb-4">This Course Includes</h2>
              <p className="text-bca-gray-300 mb-6">
                Explore the comprehensive learning experience awaiting you on this course detail page. 
                From fundamental concepts to advanced techniques, discover what you will learn and how it will propel your skills to new heights.
              </p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {courseIncludes.length > 0 ? courseIncludes.map((include, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-bca-gray-300">{include}</span>
                  </div>
                )) : (
                  <>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">FlowChart & PseudoCode</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Variables & DataTypes in C++</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Operators, Conditionals & Loops</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Pattern printing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Function & in-depth Knowledge of flow</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Arrays - 1D & 2D</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Dynamic Arrays</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Searching Algorithms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Sorting Algorithms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Char Arrays & Strings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Basic Maths & Pointers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Recursion & Backtracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Divide & Conquer Technique</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Time & Space Complexity of Recursive Algorithms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Object Oriented Programming Concepts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Linked List</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Stack & Queues</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Trees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Heaps</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Hashing & Tries</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Graphs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Greedy Algorithms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Sliding Window Problems</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Dynamic Programming</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-bca-gray-300">Bit Manipulation</span>
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
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8"
            >
              <div className="bg-bca-gray-800 rounded-xl border border-bca-gray-700 overflow-hidden">
                {/* Course Banner */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  {course.imageUrl && (
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 text-center text-white">
                    <h3 className="text-lg font-bold mb-2">DATA STRUCTURES & ALGORITHMS SUPREME 3.0</h3>
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-blue-500">₹{(course.priceCents/100).toFixed(2)}</span>
                    <span className="text-lg text-bca-gray-400 line-through">₹7000</span>
                  </div>

                  {/* Course Includes */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">This Course Includes:</h3>
                    <div className="space-y-3">
                      {courseIncludes.length > 0 ? courseIncludes.slice(0, 8).map((include, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-bca-gray-300">{include}</span>
                        </div>
                      )) : (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">No Pre-requisite Required</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">170+ hours Video Content</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">450+ Curated Coding Questions (asked by Top Companies)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">MEGA Problem-Solving Classes [First in Industry]</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">Live Resume & Interview Preparation</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">DSA - Extreme Beginner to Advanced</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">with Doubt Assistance [dedicated Doubt Forum]</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-bca-gray-300">with Course Completion Certificate</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <button 
                    onClick={startPayment} 
                    className="w-full py-4 bg-bca-gold text-black font-bold text-lg rounded-lg hover:bg-bca-gold/80 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl rounded-xl bg-bca-gray-800 border border-bca-gray-700 p-6"
          >
            <div className="text-xl font-semibold mb-4">Select your payment system</div>
            <div className="grid gap-3 text-sm">
              <label className="flex items-center gap-2"><input type="radio" checked readOnly /> UPI</label>
              <div className="text-bca-gray-300">
                By paying with UPI (Google Pay, PhonePe, Paytm), submit your mobile and TrxID below. Admin will verify within 48 hours.
              </div>
              <label className="text-xs uppercase tracking-wide text-bca-gray-400">UPI No.</label>
              <input 
                value={mobile} 
                onChange={e=>setMobile(e.target.value)} 
                placeholder="Enter your UPI-registered phone number" 
                className="px-3 py-2 rounded-xl bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold" 
              />
              <label className="text-xs uppercase tracking-wide text-bca-gray-400">TrxID</label>
              <input 
                value={txn} 
                onChange={e=>setTxn(e.target.value)} 
                placeholder="Enter your UPI Transaction ID" 
                className="px-3 py-2 rounded-xl bg-bca-gray-700 border border-bca-gray-600 text-white focus:outline-none focus:border-bca-gold" 
              />
              <label className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  checked={agree} 
                  onChange={e=>setAgree(e.target.checked)} 
                  className="rounded"
                /> 
                I agree to the terms and conditions, refund policy, and privacy policy.
              </label>
              {error && <div className="text-bca-red text-sm">{error}</div>}
              {notice && <div className="text-bca-cyan text-sm">{notice}</div>}
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  onClick={()=>setOpen(false)} 
                  className="px-4 py-2 rounded-xl border border-bca-gray-600 hover:bg-bca-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitUPI} 
                  className="px-4 py-2 rounded-xl bg-bca-gold text-black hover:bg-bca-gold/80 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
