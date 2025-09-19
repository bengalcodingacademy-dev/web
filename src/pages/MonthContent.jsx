import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';

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

const BookOpenIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ChevronDownIcon = ({ className, isOpen }) => (
  <svg 
    className={`${className} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CrownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default function MonthContent() {
  const { courseId, monthNumber } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const [courseRes, contentRes] = await Promise.all([
          api.get(`/courses/id/${courseId}`),
          api.get(`/course-content/course/${courseId}/month/${monthNumber}`)
        ]);
        
        setCourse(courseRes.data);
        setContent(contentRes.data);
      } catch (error) {
        console.error('Error loading month content:', error);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [courseId, monthNumber]);

  const handleBack = () => {
    navigate(`/course/${courseId}/access`);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bca-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Shimmer type="card" height="200px" />
            <Shimmer type="card" height="150px" />
            <Shimmer type="card" height="180px" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bca-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bca-gray-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-bca-gold/10 to-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-6 mb-8">
              <button
                onClick={handleBack}
                className="group p-3 rounded-xl bg-bca-gray-800/80 backdrop-blur-sm hover:bg-bca-gray-700/80 transition-all duration-300 border border-bca-gray-700/50 hover:border-bca-gold/30 hover:shadow-lg hover:shadow-bca-gold/10"
              >
                <svg className="w-6 h-6 text-white group-hover:text-bca-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CrownIcon className="w-8 h-8 text-bca-gold" />
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-bca-gold to-white bg-clip-text text-transparent">
                    {course?.title} - Month {monthNumber}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-bca-gold" />
                  <p className="text-bca-gray-300 text-lg font-medium">
                    Premium Course Content & Resources
                  </p>
                </div>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-bca-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Course Progress</h3>
                <span className="text-bca-gold font-bold">Month {monthNumber}</span>
              </div>
              <div className="w-full bg-bca-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-bca-gold to-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(monthNumber / (course?.durationMonths || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          {content.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-bca-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-bca-gray-700/50 max-w-2xl mx-auto">
                <BookOpenIcon className="w-24 h-24 text-bca-gray-500 mx-auto mb-8" />
                <h2 className="text-3xl font-bold text-white mb-4">Content Coming Soon</h2>
                <p className="text-bca-gray-400 text-lg mb-8">
                  Premium content for Month {monthNumber} is being prepared by our expert instructors.
                </p>
                <button
                  onClick={handleBack}
                  className="px-8 py-4 bg-gradient-to-r from-bca-gold to-yellow-500 text-black rounded-xl hover:from-yellow-400 hover:to-bca-gold transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-bca-gold/25"
                >
                  Return to Course
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {content.map((item, index) => {
                const isExpanded = expandedSections[item.id];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl border border-bca-gray-700/50 overflow-hidden hover:border-bca-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-bca-gold/10"
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full p-6 text-left hover:bg-bca-gray-700/30 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-bca-gold/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-bca-gold/30 shadow-lg">
                            <span className="text-bca-gold font-bold text-lg">{index + 1}</span>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{item.topicName}</h2>
                            <div className="flex items-center gap-4 text-sm text-bca-gray-400">
                              {item.videoLink && (
                                <div className="flex items-center gap-1">
                                  <VideoIcon className="w-4 h-4 text-red-400" />
                                  <span>Video</span>
                                </div>
                              )}
                              {item.githubRepo && (
                                <div className="flex items-center gap-1">
                                  <CodeIcon className="w-4 h-4 text-gray-400" />
                                  <span>Code</span>
                                </div>
                              )}
                              {item.notes && (
                                <div className="flex items-center gap-1">
                                  <DocumentIcon className="w-4 h-4 text-yellow-400" />
                                  <span>Notes</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronDownIcon 
                          className="w-6 h-6 text-bca-gray-400" 
                          isOpen={isExpanded}
                        />
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-bca-gray-700/50">
                            <div className="pt-6 space-y-4">
                              {item.videoLink && (
                                <div className="group flex items-center gap-4 p-4 bg-bca-gray-700/50 rounded-xl border border-bca-gray-600/50 hover:border-red-400/30 transition-all duration-300">
                                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                                    <VideoIcon className="w-6 h-6 text-red-400" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-bca-gray-300 text-sm mb-1 font-medium">Video Recording</p>
                                    <a 
                                      href={item.videoLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 font-semibold text-lg group-hover:underline transition-colors"
                                    >
                                      Watch Video →
                                    </a>
                                  </div>
                                </div>
                              )}
                              
                              {item.githubRepo && (
                                <div className="group flex items-center gap-4 p-4 bg-bca-gray-700/50 rounded-xl border border-bca-gray-600/50 hover:border-gray-400/30 transition-all duration-300">
                                  <div className="flex-shrink-0 w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center border border-gray-500/20">
                                    <CodeIcon className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-bca-gray-300 text-sm mb-1 font-medium">GitHub Repository</p>
                                    <a 
                                      href={item.githubRepo} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 font-semibold text-lg group-hover:underline transition-colors"
                                    >
                                      View Repository →
                                    </a>
                                  </div>
                                </div>
                              )}
                              
                              {item.notes && (
                                <div className="flex items-start gap-4 p-4 bg-bca-gray-700/50 rounded-xl border border-bca-gray-600/50">
                                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20">
                                    <DocumentIcon className="w-6 h-6 text-yellow-400" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-bca-gray-300 text-sm mb-3 font-medium">Notes & Resources</p>
                                    <div className="text-white whitespace-pre-wrap leading-relaxed bg-bca-gray-800/50 rounded-lg p-4 border border-bca-gray-600/30">
                                      {item.notes}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
