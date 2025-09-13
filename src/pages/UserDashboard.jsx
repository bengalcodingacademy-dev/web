import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { SkeletonCard, SkeletonCourseCard } from '../components/Skeleton';

const StatsSection = () => {
  const stats = [
    { number: "2.5K+", label: "STUDENTS AND ALUMNI" },
    { number: "4.8/5", label: "PROGRAM RATING" },
    { number: "85%", label: "AVG. HIKE POST PROGRAM*" },
    { number: "150+", label: "HIRING COMPANIES*" }
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
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-bca-gold mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-bca-gray-300 uppercase tracking-wider">
                {stat.label}
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

export default function UserDashboard() {
  const [userSummary, setUserSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingRequests, setMeetingRequests] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [summaryRes, requestsRes] = await Promise.all([
          api.get('/me/summary'),
          api.get('/me/meeting-requests')
        ]);
        setUserSummary(summaryRes.data);
        setMeetingRequests(requestsRes.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
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
          <SkeletonCard />
          <div className="grid md:grid-cols-2 gap-6">
            <SkeletonCourseCard />
            <SkeletonCourseCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bca-black">
      {/* Welcome Section */}
      <section className="py-12 bg-gradient-to-br from-bca-gray-900 to-bca-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hi {userSummary?.name}, let's start learning & rock the world! 🚀
            </h1>
            <p className="text-bca-gray-300 text-lg">
              Welcome to your learning journey. Ready to unlock your potential?
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
            <h2 className="text-3xl font-bold text-white mb-8">Your Courses</h2>
            {userSummary?.courses?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userSummary.courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-bca-gray-800 rounded-lg p-6 border border-bca-gray-700 hover:border-bca-gold/50 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-bca-gold font-semibold">Enrolled</span>
                      <button className="px-4 py-2 bg-bca-gold text-black rounded-lg font-medium hover:bg-bca-gold/80 transition-colors">
                        Start Learning
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
                <p className="text-bca-gray-300 mb-6">Explore our courses and start your learning journey!</p>
                <a href="/batches" className="px-6 py-3 bg-bca-gold text-black rounded-lg font-medium hover:bg-bca-gold/80 transition-colors">
                  Browse Courses
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatsSection />

      {/* 1:1 Meeting Section */}
      <section className="py-16 bg-bca-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Need Personal Guidance?</h2>
            <p className="text-bca-gray-300 mb-8">Schedule a 1:1 meeting with our expert trainers</p>
            
            <button
              onClick={() => setShowMeetingModal(true)}
              className="px-8 py-4 bg-bca-cyan text-black rounded-lg font-bold text-lg hover:bg-bca-cyan/80 transition-colors shadow-lg"
            >
              Schedule 1:1 Meeting
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
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
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
