import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";
import Shimmer from "../components/Shimmer";

const VideoIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const DocumentIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const BookOpenIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const TrophyIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const LeaderboardModal = ({ isOpen, onClose, quizId, quizTitle }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (isOpen && quizId) {
      loadLeaderboard();
    }
  }, [isOpen, quizId]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      console.log('Loading leaderboard for quiz:', quizId);
      const response = await api.get(`/quiz-exams/${quizId}/leaderboard?t=${Date.now()}`);
      console.log('Leaderboard API response:', response.data);
      console.log('Leaderboard array:', response.data.leaderboard);
      console.log('Leaderboard length:', response.data.leaderboard?.length);
      console.log('User position:', response.data.userPosition);
      setLeaderboard(response.data.leaderboard || []);
      setUserPosition(response.data.userPosition || null);
      console.log('Set leaderboard data:', response.data.leaderboard || []);
      console.log('Current leaderboard state:', leaderboard);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-bca-gray-800 to-bca-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-bca-gray-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-bca-gold to-yellow-400 rounded-lg">
                <TrophyIcon className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
                <p className="text-bca-gray-400">{quizTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bca-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-bca-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bca-gold"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top 3 */}
              {leaderboard.slice(0, 3).map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-400' 
                      : index === 1 
                      ? 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border-gray-400'
                      : 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 border-orange-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-yellow-400 text-black' 
                        : index === 1 ? 'bg-gray-400 text-black'
                        : 'bg-orange-400 text-black'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{entry.user.name}</h3>
                        <p className="text-sm text-bca-gray-400">{entry.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{entry.percentage}%</div>
                      <div className="text-sm text-bca-gray-400">{entry.score}/{entry.totalMarks} marks</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* User Position */}
              {userPosition && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-bca-cyan/20 to-bca-gold/20 border-2 border-bca-cyan"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-bca-cyan to-bca-gold flex items-center justify-center font-bold text-lg text-black">
                        {userPosition.rank}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Your Position</h3>
                        <p className="text-sm text-bca-gray-400">You are #{userPosition.rank} on the leaderboard</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{userPosition.percentage}%</div>
                      <div className="text-sm text-bca-gray-400">{userPosition.score}/{userPosition.totalMarks} marks</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {leaderboard.length === 0 && (
                <div className="text-center py-12">
                  <TrophyIcon className="w-16 h-16 text-bca-gray-600 mx-auto mb-4" />
                  <p className="text-bca-gray-400">No attempts yet. Be the first to take this quiz!</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function MonthContent() {
  const { courseId, monthNumber } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [combinedContent, setCombinedContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentSelect = (contentItem) => {
    setSelectedContent(contentItem);
    if (contentItem.type === 'lesson') {
      setSelectedLesson(contentItem.data);
      setSelectedQuiz(null);
    } else if (contentItem.type === 'quiz') {
      setSelectedQuiz(contentItem.data);
      setSelectedLesson(null);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [courseRes, contentRes] = await Promise.all([
          api.get(`/courses/id/${courseId}`),
          api.get(`/course-content/course/${courseId}/month/${monthNumber}`),
        ]);
        setCourse(courseRes.data);
        setContent(contentRes.data);
        
        // Create combined content list with lessons and quiz exams
        const combined = [];
        const processedQuizIds = new Set(); // Track processed quiz IDs to avoid duplicates
        
        contentRes.data.forEach((lesson, lessonIndex) => {
          // Add the lesson
          combined.push({
            id: lesson.id,
            type: 'lesson',
            title: lesson.topicName,
            order: lesson.order || lessonIndex,
            data: lesson
          });
          
          // Add quiz exams for this lesson (only if not already processed)
          if (lesson.quizExams && lesson.quizExams.length > 0) {
            lesson.quizExams.forEach((quiz, quizIndex) => {
              if (!processedQuizIds.has(quiz.id)) {
                processedQuizIds.add(quiz.id);
                combined.push({
                  id: `quiz-${quiz.id}`,
                  type: 'quiz',
                  title: quiz.title,
                  order: (lesson.order || lessonIndex) + 0.5 + (quizIndex * 0.1), // Place quizzes after lesson
                  data: quiz,
                  lessonId: lesson.id
                });
              }
            });
          }
        });
        
        // Sort by order
        combined.sort((a, b) => a.order - b.order);
        setCombinedContent(combined);
        
        // Set initial selection
        if (combined.length > 0) {
          setSelectedContent(combined[0]);
          if (combined[0].type === 'lesson') {
            setSelectedLesson(combined[0].data);
          } else if (combined[0].type === 'quiz') {
            setSelectedQuiz(combined[0].data);
          }
        }
      } catch (error) {
        console.error("Error loading month content:", error);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [courseId, monthNumber]);

  const handleBack = () => {
    navigate(`/course/${courseId}/access`);
  };

  const handleLeaderboardClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowLeaderboard(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bca-black via-bca-gray-900 to-bca-black">
        <div className="max-w-7xl mx-auto p-6">
          <Shimmer type="card" count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bca-black via-bca-gray-900 to-bca-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-bca-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bca-black via-bca-gray-900 to-bca-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm border-b border-bca-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-bca-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6 text-bca-gray-300" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{course?.title}</h1>
                <p className="text-bca-gray-400">Month {monthNumber} • {content.length} Lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gradient-to-r from-bca-cyan/20 to-bca-gold/20 rounded-lg border border-bca-cyan/30">
                <span className="text-bca-cyan font-semibold">Progress: 0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-bca-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Course Content</h2>
              <div className="space-y-2">
                {combinedContent.map((contentItem, index) => (
                  <motion.button
                    key={contentItem.id}
                    onClick={() => handleContentSelect(contentItem)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      selectedContent?.id === contentItem.id
                        ? "bg-gradient-to-r from-bca-gold to-yellow-400 text-black shadow-lg"
                        : "bg-bca-gray-700/50 hover:bg-bca-gray-700 text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        selectedContent?.id === contentItem.id
                          ? "bg-black/20 text-black"
                          : "bg-bca-gray-600 text-white"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {contentItem.type === 'quiz' && (
                            <TrophyIcon className="w-4 h-4" />
                          )}
                          {contentItem.title}
                        </div>
                        <div className="text-xs opacity-75">
                          {contentItem.type === 'lesson' ? (
                            <>
                              {contentItem.data.videoLink && "Video"} 
                              {contentItem.data.videoLink && contentItem.data.notes && " • "}
                              {contentItem.data.notes && "Notes"}
                            </>
                          ) : (
                            `Quiz • ${contentItem.data.durationMinutes} min • ${contentItem.data.totalMarks} marks`
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedContent && selectedContent.type === 'lesson' && selectedLesson && (
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Lesson Header */}
                <div className="bg-gradient-to-r from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-bca-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-bca-cyan to-bca-gold rounded-xl">
                      <BookOpenIcon className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white">{selectedLesson.topicName}</h1>
                      <p className="text-bca-gray-400">Lesson {combinedContent.findIndex(c => c.id === selectedContent.id) + 1} of {combinedContent.length}</p>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video Section */}
                  {selectedLesson.videoLink && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-bca-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <VideoIcon className="w-6 h-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Video Recording</h3>
                      </div>
                      <a
                        href={selectedLesson.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                      >
                        <VideoIcon className="w-5 h-5" />
                        Watch Video
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </motion.div>
                  )}

                  {/* Notes Section */}
                  {selectedLesson.notes && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-bca-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-bca-gold/20 rounded-lg">
                          <DocumentIcon className="w-6 h-6 text-bca-gold" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Study Notes</h3>
                      </div>
                      <div className="text-bca-gray-300 whitespace-pre-wrap">{selectedLesson.notes}</div>
                    </motion.div>
                  )}
                </div>

              </motion.div>
            )}

            {/* Quiz Content */}
            {selectedContent && selectedContent.type === 'quiz' && selectedQuiz && (
              <motion.div
                key={selectedQuiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quiz Header */}
                <div className="bg-gradient-to-r from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-bca-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-bca-cyan to-bca-gold rounded-xl">
                      <TrophyIcon className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white">{selectedQuiz.title}</h1>
                      <p className="text-bca-gray-400">Quiz Exam</p>
                    </div>
                  </div>
                </div>

                {/* Quiz Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-bca-gray-700"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-bca-cyan to-bca-gold rounded-xl">
                        <TrophyIcon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Quiz Details</h3>
                        <p className="text-bca-gray-400">Test your knowledge</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-bca-gray-400">Duration:</span>
                        <span className="text-white font-semibold">{selectedQuiz.durationMinutes} minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-bca-gray-400">Questions:</span>
                        <span className="text-white font-semibold">{selectedQuiz.questions?.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-bca-gray-400">Total Marks:</span>
                        <span className="text-white font-semibold">{selectedQuiz.totalMarks}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => navigate(`/quiz-exam/${selectedQuiz.id}`)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-bca-cyan to-bca-gold text-black rounded-lg font-semibold hover:from-bca-cyan/80 hover:to-bca-gold/80 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Start Exam
                      </button>
                      <button
                        onClick={() => handleLeaderboardClick(selectedQuiz)}
                        className="px-4 py-3 bg-gradient-to-r from-bca-gray-600 to-bca-gray-700 text-white rounded-lg font-semibold hover:from-bca-gray-500 hover:to-bca-gray-600 transition-all duration-200 border border-bca-gray-500"
                      >
                        <TrophyIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        quizId={selectedQuiz?.id}
        quizTitle={selectedQuiz?.title}
      />
    </div>
  );
}