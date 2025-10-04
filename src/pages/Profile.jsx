import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from '../components/Shimmer';

export default function Profile() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get('/me/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
  }, []);
  
  const uploadAvatar = async () => {
    if (!file || !summary) return;
    try {
      const presign = await api.post('/me/uploads/presign', { 
        fileName: file.name, 
        fileType: file.type 
      });
      
      // Handle the new response format (same as admin endpoint)
      if (presign.data.mode === 'post') {
        // Use FormData for presigned POST
        const formData = new FormData();
        Object.keys(presign.data.post.fields).forEach(key => {
          formData.append(key, presign.data.post.fields[key]);
        });
        formData.append('file', file);
        
        await fetch(presign.data.post.url, {
          method: 'POST',
          body: formData
        });
      } else {
        // Fallback to PUT method (old format)
        await fetch(presign.data.uploadUrl, { 
          method: 'PUT', 
          headers: { 'Content-Type': file.type }, 
          body: file 
        });
      }
      
      await api.post('/me/photo', { photoUrl: presign.data.publicUrl });
      const refreshed = await api.get('/me/summary');
      setSummary(refreshed.data);
      setFile(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bca-gray-900 via-black to-bca-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <Shimmer type="card" height="200px" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Shimmer type="stats" />
              <Shimmer type="stats" />
              <Shimmer type="stats" />
            </div>
            <Shimmer type="card" height="150px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bca-gray-900 via-black to-bca-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-bca-gray-800/50 to-bca-gray-700/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative group flex flex-col items-center">
                <div className="relative">
                  {summary.photoUrl ? (
                    <img 
                      src={summary.photoUrl} 
                      className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-bca-gold/30 shadow-2xl" 
                      alt="Profile"
                    />
                  ) : (
                    <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gradient-to-br from-bca-cyan/20 to-bca-gold/20 border-4 border-bca-gold/30 flex items-center justify-center">
                      <svg className="w-12 h-12 text-bca-gold/60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-bca-cyan/20 to-bca-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Upload Button */}
                <div className="mt-4 flex flex-col items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label 
                    htmlFor="photo-upload"
                    className="px-4 py-2 bg-gradient-to-r from-bca-gold to-yellow-500 text-black font-medium rounded-xl hover:from-yellow-400 hover:to-bca-gold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-bca-gold/25"
                  >
                    {file ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  {file && (
                    <button 
                      onClick={uploadAvatar}
                      className="px-3 py-1.5 bg-bca-cyan text-white text-sm rounded-lg hover:bg-bca-cyan/80 transition-colors"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left w-full md:w-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-bca-cyan bg-clip-text text-transparent">
                  {summary.name}
                </h1>
                <p className="text-bca-gray-300 text-lg mb-4">{summary.email}</p>
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">{summary.status}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Role Card */}
          <div className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-bca-cyan/30 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-bca-cyan/20 to-bca-cyan/10 rounded-xl group-hover:from-bca-cyan/30 group-hover:to-bca-cyan/20 transition-all duration-300">
                <svg className="w-6 h-6 text-bca-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-bca-gray-400 text-sm font-medium">Role</p>
                <p className="text-white text-xl font-bold">{summary.role}</p>
              </div>
            </div>
          </div>

          {/* Age Card */}
          <div className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-bca-gold/30 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-bca-gold/20 to-bca-gold/10 rounded-xl group-hover:from-bca-gold/30 group-hover:to-bca-gold/20 transition-all duration-300">
                <svg className="w-6 h-6 text-bca-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-bca-gray-400 text-sm font-medium">Age</p>
                <p className="text-white text-xl font-bold">{summary.age ?? 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Courses Count Card */}
          <div className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl group-hover:from-purple-500/30 group-hover:to-purple-500/20 transition-all duration-300">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-bca-gray-400 text-sm font-medium">Courses</p>
                <p className="text-white text-xl font-bold">{summary.courses.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-bca-cyan/20 to-bca-cyan/10 rounded-lg">
              <svg className="w-6 h-6 text-bca-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">My Courses</h2>
          </div>

          {summary.courses.length > 0 ? (
            <div className="space-y-4">
              {summary.courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-bca-gray-700/30 to-bca-gray-600/30 rounded-xl border border-white/5 hover:border-bca-cyan/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-bca-cyan/20 to-bca-gold/20 rounded-lg flex items-center justify-center group-hover:from-bca-cyan/30 group-hover:to-bca-gold/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-bca-cyan group-hover:text-bca-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold group-hover:text-bca-cyan transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-bca-gray-400 text-sm">Enrolled</p>
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <span className="text-green-400 text-sm font-medium">Active</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-bca-gray-600/30 to-bca-gray-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bca-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
              <p className="text-bca-gray-400">Start your learning journey by enrolling in a course!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
