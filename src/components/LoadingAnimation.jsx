import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingAnimation({ onComplete }) {
  const [showAnimation, setShowAnimation] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

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

  // Force video to play when component mounts
  useEffect(() => {
    if (videoRef) {
      const playVideo = async () => {
        try {
          await videoRef.play();
        } catch (error) {
          console.log('Autoplay prevented, trying again...');
          // Retry after a short delay
          setTimeout(async () => {
            try {
              await videoRef.play();
            } catch (retryError) {
              console.log('Video autoplay failed:', retryError);
              // Final fallback - try to play after user interaction
              document.addEventListener('click', async () => {
                try {
                  await videoRef.play();
                } catch (finalError) {
                  console.log('Final video play attempt failed:', finalError);
                }
              }, { once: true });
            }
          }, 100);
        }
      };
      playVideo();
    }
  }, [videoRef]);

  const handleVideoLoad = async () => {
    setVideoLoaded(true);
    // Ensure video plays when loaded
    if (videoRef) {
      try {
        await videoRef.play();
      } catch (error) {
        console.log('Video play failed on load:', error);
      }
    }
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
                ref={setVideoRef}
                autoPlay
                loop
                playsInline
                muted
                onLoadedData={handleVideoLoad}
                className="w-full h-auto"
                style={{
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
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
