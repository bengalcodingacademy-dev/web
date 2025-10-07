import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';

const Quiz = () => {
  const { courseId, monthNumber, contentId } = useParams();
  const navigate = useNavigate();
  
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuizData();
  }, [contentId]);

  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      // Get the course content to find the quiz collection ID
      const contentResponse = await api.get(`/course-content/course/${courseId}/month/${monthNumber}`);
      const content = contentResponse.data.find(item => item.id === contentId);
      
      if (!content || !content.quizIds || content.quizIds.length === 0) {
        setError('Quiz not found');
        return;
      }

      // Get the quiz collection
      const quizResponse = await api.get(`/quiz/collection/${content.quizIds[0]}`);
      const quizCollection = quizResponse.data;
      
      // Get all questions for this quiz
      const questionsResponse = await api.get('/quiz');
      const allQuestions = questionsResponse.data.quizzes || [];
      
      // Filter questions that belong to this quiz
      const quizQuestions = allQuestions.filter(q => 
        quizCollection.questionIds.includes(q.id)
      );

      setQuizData(quizCollection);
      setQuestions(quizQuestions);
    } catch (error) {
      console.error('Error loading quiz:', error);
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = () => {
    // Auto-submit current question if no answer selected
    if (!selectedAnswers[currentQuestionIndex]) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: null
      }));
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(120); // Reset timer for next question
    } else {
      completeQuiz();
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(120); // Reset timer for next question
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    
    // Calculate results
    let totalMarks = 0;
    let obtainedMarks = 0;
    const questionResults = questions.map((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const isCorrect = selectedAnswer === question.correctAnswer;
      const marks = question.marks || 1;
      
      totalMarks += marks;
      if (isCorrect) {
        obtainedMarks += marks;
      }
      
      return {
        question,
        selectedAnswer,
        isCorrect,
        marks
      };
    });

    setResults({
      totalMarks,
      obtainedMarks,
      percentage: Math.round((obtainedMarks / totalMarks) * 100),
      questionResults
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 30) return 'text-red-500';
    if (timeLeft <= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}/month/${monthNumber}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={handleBackToCourse}
            className="px-6 py-3 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-bca-black p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bca-gray-800 rounded-xl p-8 border border-bca-gray-700"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">{quizData?.name}</h1>
              <p className="text-bca-gray-300 mb-6">{quizData?.description}</p>
              
              <div className="bg-bca-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Quiz Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-bca-gold">{questions.length}</div>
                    <div className="text-bca-gray-300">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-bca-gold">2 min</div>
                    <div className="text-bca-gray-300">Per Question</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-bca-gold">{questions.reduce((sum, q) => sum + (q.marks || 1), 0)}</div>
                    <div className="text-bca-gray-300">Total Marks</div>
                  </div>
                </div>
              </div>

              <div className="bg-bca-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
                <ul className="text-bca-gray-300 text-left space-y-2">
                  <li>• Each question has a time limit of 2 minutes</li>
                  <li>• The quiz will automatically submit when time runs out</li>
                  <li>• You can select an answer and move to the next question</li>
                  <li>• Results will be shown immediately after completion</li>
                  <li>• No data will be stored - this is for practice only</li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleBackToCourse}
                  className="px-6 py-3 bg-bca-gray-600 text-white rounded-lg hover:bg-bca-gray-500 transition-colors"
                >
                  Back to Course
                </button>
                <button
                  onClick={() => setQuizStarted(true)}
                  className="px-8 py-3 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizCompleted && results) {
    return (
      <div className="min-h-screen bg-bca-black p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bca-gray-800 rounded-xl p-8 border border-bca-gray-700"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h1>
              <div className="bg-bca-gray-700 rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold text-bca-gold mb-2">{results.percentage}%</div>
                <div className="text-bca-gray-300">Score</div>
                <div className="text-lg text-white mt-2">
                  {results.obtainedMarks} out of {results.totalMarks} marks
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Question Review</h2>
              {results.questionResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    result.isCorrect 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-red-900/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-medium">Question {index + 1}</h3>
                    <div className={`px-2 py-1 rounded text-sm font-medium ${
                      result.isCorrect 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {result.isCorrect ? `+${result.marks}` : '0'}
                    </div>
                  </div>
                  
                  <div className="text-bca-gray-300 mb-3" dangerouslySetInnerHTML={{ __html: result.question.question }} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {['A', 'B', 'C', 'D'].map(option => {
                      const optionText = result.question[`option${option}`];
                      const isSelected = result.selectedAnswer === option;
                      const isCorrect = result.question.correctAnswer === option;
                      
                      return (
                        <div
                          key={option}
                          className={`p-2 rounded ${
                            isCorrect 
                              ? 'bg-green-600 text-white' 
                              : isSelected 
                                ? 'bg-red-600 text-white' 
                                : 'bg-bca-gray-600 text-bca-gray-300'
                          }`}
                        >
                          <span className="font-medium">{option}.</span> 
                          <span dangerouslySetInnerHTML={{ __html: optionText }} />
                          {isCorrect && <span className="ml-2">✓</span>}
                          {isSelected && !isCorrect && <span className="ml-2">✗</span>}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleBackToCourse}
                className="px-8 py-3 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
              >
                Back to Course
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-bca-black p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bca-gray-800 rounded-xl p-8 border border-bca-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{quizData?.name}</h1>
              <p className="text-bca-gray-300">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-bca-gray-300 text-sm">Time Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-bca-gray-700 rounded-full h-2 mb-8">
            <div 
              className="bg-bca-gold h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="bg-bca-gray-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Question {currentQuestionIndex + 1} ({currentQuestion.marks || 1} mark{currentQuestion.marks !== 1 ? 's' : ''})
              </h2>
              <div 
                className="text-bca-gray-300 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map(option => {
                const optionText = currentQuestion[`option${option}`];
                const isSelected = selectedAnswer === option;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-bca-gold bg-bca-gold/10 text-white'
                        : 'border-bca-gray-600 bg-bca-gray-700 text-bca-gray-300 hover:border-bca-gold/50 hover:bg-bca-gray-600'
                    }`}
                  >
                    <span className="font-medium mr-3">{option}.</span>
                    <span dangerouslySetInnerHTML={{ __html: optionText }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBackToCourse}
              className="px-6 py-3 bg-bca-gray-600 text-white rounded-lg hover:bg-bca-gray-500 transition-colors"
            >
              Exit Quiz
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="px-8 py-3 bg-bca-gold text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz;
