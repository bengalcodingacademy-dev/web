import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingAnimation({ onComplete }) {
  const [showAnimation, setShowAnimation] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Reset states when component mounts
    setShowAnimation(true);
    setVideoLoaded(false);
    
    // Show animation for 3 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
      // Call onComplete after animation finishes
      setTimeout(() => {
        onComplete && onComplete();
      }, 500); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-bca-black flex items-center justify-center overflow-hidden"
        >
          {/* Sound Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={toggleSound}
            className="absolute top-4 right-4 z-30 p-3 rounded-full bg-bca-gray-800/80 border border-bca-cyan/30 hover:border-bca-cyan/50 transition-all duration-300 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 20px rgba(0, 195, 255, 0.3)'
            }}
          >
            {soundEnabled ? (
              <svg className="w-6 h-6 text-bca-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-bca-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </motion.button>
          {/* Minimal Neon Background Effects */}
          <div className="absolute inset-0">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(0, 195, 255, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(255, 178, 9, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(0, 195, 255, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(0, 195, 255, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating neon particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? 'rgba(0, 195, 255, 0.6)' : 'rgba(255, 178, 9, 0.6)',
                  boxShadow: i % 2 === 0 
                    ? '0 0 20px rgba(0, 195, 255, 0.8)' 
                    : '0 0 20px rgba(255, 178, 9, 0.8)',
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i * 10)}%`
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Video Container */}
          <div className="relative z-10 max-w-4xl w-full mx-4 pb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 0 50px rgba(0, 195, 255, 0.3), 0 0 100px rgba(255, 178, 9, 0.2)'
              }}
            >
              {/* Video */}
              <video
                autoPlay
                loop
                playsInline
                muted={!soundEnabled}
                onLoadedData={handleVideoLoad}
                className="w-full h-auto"
                style={{
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
                volume={0.7}
              >
                <source src="/BCA_Animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video overlay with subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Loading indicator */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-bca-black/80">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-bca-cyan/30 border-t-bca-cyan rounded-full"
                  />
                </div>
              )}
            </motion.div>

            {/* BCA Branding */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mt-8 px-4 py-2"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{
                background: 'linear-gradient(to right, #00c3ff, #ffb209, #00c3ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2',
                paddingBottom: '0.2em',
                display: 'block'
              }}>
                Bengal Coding Academy
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-bca-gray-300 text-lg md:text-xl"
              >
                বাংলায় শিখবো, সারা বিশ্বে নাম করবো
              </motion.p>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-bca-cyan via-bca-gold to-bca-cyan"
            style={{
              boxShadow: '0 0 10px rgba(0, 195, 255, 0.8)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
