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

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
      <div className="min-h-screen bg-bca-black p-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <Shimmer type="card" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-center">
          <div className="bg-bca-gray-800 rounded-lg p-8 max-w-md">
            <div className="text-red-400 text-lg mb-4">{error}</div>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bca-black">
      <div className="max-w-4xl mx-auto p-6">
        {/* Simple Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg bg-bca-gray-800 hover:bg-bca-gray-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </button>
            
            <div>
              <h1 className="text-2xl font-bold text-white">
                {course?.title} - Month {monthNumber}
              </h1>
              <p className="text-bca-gray-400 mt-1">
                {content.length} {content.length === 1 ? 'lesson' : 'lessons'} available
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {content.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-bca-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <BookOpenIcon className="w-12 h-12 text-bca-gray-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Content Coming Soon</h2>
              <p className="text-bca-gray-400 mb-6">
                Premium content for Month {monthNumber} is being prepared.
              </p>
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors font-medium"
              >
                Return to Course
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {content.map((item, index) => {
              const isExpanded = expandedSections[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-bca-gray-800 rounded-lg border border-bca-gray-700 overflow-hidden"
                >
                  {/* Lesson Header */}
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full p-4 text-left hover:bg-bca-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bca-gold rounded-lg flex items-center justify-center">
                          <span className="text-black font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{item.topicName}</h3>
                          <div className="flex items-center gap-3 text-xs text-bca-gray-400 mt-1">
                            {item.videoLink && (
                              <span className="flex items-center gap-1">
                                <VideoIcon className="w-3 h-3 text-red-400" />
                                Video
                              </span>
                            )}
                            {item.githubRepo && (
                              <span className="flex items-center gap-1">
                                <CodeIcon className="w-3 h-3 text-gray-400" />
                                Code
                              </span>
                            )}
                            {item.notes && (
                              <span className="flex items-center gap-1">
                                <DocumentIcon className="w-3 h-3 text-yellow-400" />
                                Notes
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronDownIcon 
                        className="w-5 h-5 text-bca-gray-400" 
                        isOpen={isExpanded}
                      />
                    </div>
                  </button>

                  {/* Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-bca-gray-700">
                          <div className="pt-4 space-y-3">
                            {item.videoLink && (
                              <div className="flex items-center gap-3 p-3 bg-bca-gray-700/50 rounded-lg">
                                <VideoIcon className="w-5 h-5 text-red-400" />
                                <div>
                                  <p className="text-sm text-bca-gray-400">Video Recording</p>
                                  <a 
                                    href={item.videoLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
                                  >
                                    Watch Video →
                                  </a>
                                </div>
                              </div>
                            )}
                            
                            {item.githubRepo && (
                              <div className="flex items-center gap-3 p-3 bg-bca-gray-700/50 rounded-lg">
                                <CodeIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-bca-gray-400">GitHub Repository</p>
                                  <a 
                                    href={item.githubRepo} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
                                  >
                                    View Repository →
                                  </a>
                                </div>
                              </div>
                            )}
                            
                            {item.notes && (
                              <div className="p-3 bg-bca-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <DocumentIcon className="w-4 h-4 text-yellow-400" />
                                  <p className="text-sm text-bca-gray-400 font-medium">Notes & Resources</p>
                                </div>
                                <div className="text-sm text-white whitespace-pre-wrap leading-relaxed bg-bca-gray-800/50 rounded p-3">
                                  {item.notes}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}