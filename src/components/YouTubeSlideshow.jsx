import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from './Shimmer';

export default function YouTubeSlideshow() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const response = await api.get('/youtube-videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error loading YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Generate YouTube thumbnail URL
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">YouTube Videos</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <Shimmer key={index} type="youtube-card" width="256px" height="144px" className="flex-shrink-0" />
            ))}
          </div>
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <Shimmer key={index} type="youtube-card" width="256px" height="144px" className="flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null; // Don't show section if no videos
  }

  // Split videos into two rows for better distribution
  const firstRow = videos.filter((_, index) => index % 2 === 0);
  const secondRow = videos.filter((_, index) => index % 2 === 1);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">YouTube Videos</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
      </div>

      <div className="relative overflow-hidden">
        {/* First Row - Slides Right to Left */}
        <div className="mb-6">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ 
              x: [0, -(firstRow.length * 280), 0] 
            }}
            transition={{ 
              duration: firstRow.length * 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...firstRow, ...firstRow, ...firstRow].map((video, index) => (
              <motion.div
                key={`first-${video.id}-${index}`}
                className="relative flex-shrink-0 w-64 h-36 md:w-72 md:h-40 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm hover:border-bca-gold/30 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_0_20px_rgba(253,176,0,0.3)]"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => window.open(video.videoUrl, '_blank')}
              >
                <img
                  src={getYouTubeThumbnail(video.videoUrl)}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-bca-gold rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h4 className="text-white text-sm md:text-base font-semibold line-clamp-2 leading-tight">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-bca-red" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-white/70 text-xs md:text-sm">YouTube</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Slides Left to Right */}
        <div>
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ 
              x: [-(secondRow.length * 280), 0, -(secondRow.length * 280)] 
            }}
            transition={{ 
              duration: secondRow.length * 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...secondRow, ...secondRow, ...secondRow].map((video, index) => (
              <motion.div
                key={`second-${video.id}-${index}`}
                className="relative flex-shrink-0 w-64 h-36 md:w-72 md:h-40 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm hover:border-bca-gold/30 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_0_20px_rgba(253,176,0,0.3)]"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => window.open(video.videoUrl, '_blank')}
              >
                <img
                  src={getYouTubeThumbnail(video.videoUrl)}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-bca-gold rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h4 className="text-white text-sm md:text-base font-semibold line-clamp-2 leading-tight">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-bca-red" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-white/70 text-xs md:text-sm">YouTube</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
