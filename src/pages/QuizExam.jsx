import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';

const QuizExam = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (quizId) {
      loadQuiz();
    }
  }, [quizId]);

  useEffect(() => {
    if (attempt && attempt.startedAt) {
      const startTime = new Date(attempt.startedAt).getTime();
      const durationMs = quiz?.durationMinutes * 60 * 1000;
      const endTime = startTime + durationMs;
      
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max(0, endTime - now);
        setTimeLeft(Math.ceil(remaining / 1000));
        
        if (remaining <= 0) {
          handleSubmitQuiz();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [attempt, quiz]);

  const loadQuiz = async () => {
    try {
      const response = await api.get(`/quiz-exams/${quizId}`);
      setQuiz(response.data);
      setQuestions(response.data.questions || []);
      
      // Check for existing attempt
      if (response.data.attempts && response.data.attempts.length > 0) {
        const userAttempt = response.data.attempts.find(a => a.userId === response.data.userId);
        if (userAttempt) {
          setAttempt(userAttempt);
          if (userAttempt.submittedAt) {
            setQuizCompleted(true);
            setResults(userAttempt);
          }
        }
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    try {
      const response = await api.post(`/quiz-exams/${quizId}/start`);
      setAttempt(response.data);
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    try {
      const response = await api.post(`/quiz-exams/${quizId}/submit`, {
        answers
      });
      
      setResults(response.data);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-bca-cyan text-xl">Loading Quiz...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Quiz not found</div>
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
              <div className={`text-6xl font-bold ${getScoreColor(results.percentage)}`}>
                {results.percentage.toFixed(1)}%
              </div>
              <div className="text-bca-gray-400 mt-2">
                Score: {results.score} / {results.totalMarks} marks
              </div>
              {results.rank && (
                <div className="text-bca-gold mt-2">
                  Rank: #{results.rank}
                </div>
              )}
            </div>

            {/* Question Results */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Question Review</h2>
              {questions.map((question, index) => {
                const userAnswer = results.details[question.id]?.userAnswer;
                const isCorrect = results.details[question.id]?.isCorrect;
                const marks = results.details[question.id]?.marks || 0;
                
                return (
                  <div key={question.id} className="bg-bca-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-medium">
                        Q{index + 1}: {question.questionText}
                      </h3>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {marks} / {question.marks} marks
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className={`p-2 rounded ${
                          option === question.correctAnswer 
                            ? 'bg-green-900 text-green-300' 
                            : option === userAnswer && !isCorrect
                            ? 'bg-red-900 text-red-300'
                            : 'bg-bca-gray-600 text-bca-gray-300'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-sm">
                      <span className="text-bca-gray-400">Your answer: </span>
                      <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {userAnswer || 'Not answered'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-bca-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate(`/course/${quiz.course.slug}`)}
                className="bg-bca-cyan text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
              >
                Back to Course
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-bca-black p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bca-gray-800 rounded-xl p-8 border border-bca-gray-700 text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
            <div className="text-bca-gray-400 mb-6">
              <p>Course: {quiz.course?.title}</p>
              <p>Month: {quiz.monthNumber}</p>
              <p>Duration: {quiz.durationMinutes} minutes</p>
              <p>Total Marks: {quiz.totalMarks}</p>
              <p>Questions: {questions.length}</p>
            </div>
            
            <div className="bg-bca-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-white font-semibold mb-2">Instructions:</h3>
              <ul className="text-bca-gray-300 text-left space-y-1">
                <li>• You have {quiz.durationMinutes} minutes to complete this quiz</li>
                <li>• Answer all questions before submitting</li>
                <li>• You can navigate between questions</li>
                <li>• The quiz will auto-submit when time runs out</li>
                <li>• Once submitted, you cannot change your answers</li>
              </ul>
            </div>

            <button
              onClick={startQuiz}
              className="bg-bca-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Start Quiz
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-bca-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-bca-gray-800 rounded-xl p-4 border border-bca-gray-700 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
              <p className="text-bca-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                timeLeft < 300 ? 'text-red-400' : 'text-bca-cyan'
              }`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-bca-gray-400 text-sm">Time Remaining</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-bca-gray-700 rounded-full h-2">
              <div 
                className="bg-bca-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-bca-gray-800 rounded-xl p-6 border border-bca-gray-700 mb-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQ.questionText}
          </h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[currentQ.id] === option
                    ? 'border-bca-gold bg-bca-gold/10'
                    : 'border-bca-gray-600 hover:border-bca-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={option}
                  checked={answers[currentQ.id] === option}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[currentQ.id] === option
                      ? 'border-bca-gold bg-bca-gold'
                      : 'border-bca-gray-500'
                  }`}>
                    {answers[currentQ.id] === option && (
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    )}
                  </div>
                  <span className="text-white">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="bg-bca-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-bca-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-bca-gold text-black'
                    : answers[questions[index].id]
                    ? 'bg-green-600 text-white'
                    : 'bg-bca-gray-600 text-bca-gray-300 hover:bg-bca-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={submitting}
              className="bg-bca-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              className="bg-bca-cyan text-black px-6 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizExam;
