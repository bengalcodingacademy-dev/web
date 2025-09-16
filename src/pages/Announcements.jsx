import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';

export default function Announcements() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await api.get('/announcements/me');
        setList(response.data);
      } catch (error) {
        console.error('Error loading announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncements();
  }, []);
  
  const markAsRead = async (announcementId) => {
    try {
      await api.post(`/announcements/me/read/${announcementId}`);
      // Update local state to mark as read
      setList(prev => prev.map(ann => 
        ann.id === announcementId ? { ...ann, isRead: true } : ann
      ));
    } catch (error) {
      console.error('Error marking announcement as read:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4 animate-pulse">
              <div className="h-4 bg-bca-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-bca-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-bca-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Announcements</h1>
      
      {list.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📢</div>
          <h2 className="text-xl font-semibold text-white mb-2">No Announcements</h2>
          <p className="text-bca-gray-400">You don't have any announcements yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {list.map((a, index) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border p-6 transition-all duration-200 ${
                a.isRead 
                  ? 'border-white/10 bg-bca-gray-800/50' 
                  : 'border-bca-gold/50 bg-bca-gray-800 shadow-lg shadow-bca-gold/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{a.title}</h3>
                    {!a.isRead && (
                      <span className="px-2 py-1 bg-bca-gold text-black text-xs font-bold rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  {a.course && (
                    <div className="text-bca-cyan text-sm mb-2 flex items-center gap-2">
                      <span>📚</span>
                      <span>{a.course.title}</span>
                    </div>
                  )}
                  
                  {!a.course && (
                    <div className="text-bca-gold text-sm mb-2 flex items-center gap-2">
                      <span>🌐</span>
                      <span>Global Announcement</span>
                    </div>
                  )}
                </div>
                
                <div className="text-bca-gray-400 text-sm">
                  {new Date(a.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="text-white/80 mb-4 leading-relaxed">
                {a.body}
              </div>
              
              {!a.isRead && (
                <button
                  onClick={() => markAsRead(a.id)}
                  className="px-4 py-2 bg-bca-gold text-black rounded-lg hover:bg-bca-gold/80 transition-colors text-sm font-medium"
                >
                  Mark as Read
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
