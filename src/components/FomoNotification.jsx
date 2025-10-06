import { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '../lib/authContext';

export default function FomoNotification() {
  const [showFomoNotification, setShowFomoNotification] = useState(false);
  const [fomoData, setFomoData] = useState(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const auth = useAuth();
  const user = auth?.user;
  const isInitialized = useRef(false);
  
  // Memoize the user's purchase status to prevent unnecessary re-renders
  const hasPurchasedCourse = useMemo(() => {
    if (!auth || !user) return false;
    return user?.purchases?.some(purchase => 
      purchase.course?.slug === 'fswd' && purchase.status === 'PAID'
    );
  }, [auth, user?.purchases]);

  // Dummy names for FOMO notifications
  const dummyNames = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh', 'Rajesh Gupta',
    'Anita Verma', 'Vikram Joshi', 'Pooja Agarwal', 'Suresh Reddy', 'Meera Iyer',
    'Arjun Nair', 'Kavya Menon', 'Rohit Desai', 'Shruti Shah', 'Nikhil Rao',
    'Deepika Jain', 'Karan Malhotra', 'Riya Chopra', 'Siddharth Mehta', 'Anjali Kapoor',
    'Vishal Tiwari', 'Neha Bansal', 'Gaurav Saxena', 'Swati Agarwal', 'Manish Pandey',
    'Ritika Sharma', 'Abhishek Singh', 'Pallavi Reddy', 'Sandeep Kumar', 'Kiran Patel'
  ];

  // FOMO notification logic
  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) {
      return;
    }
    
    // Check if user has purchased the course - if yes, don't show notifications
    if (hasPurchasedCourse) {
      isInitialized.current = true;
      return; // Don't show FOMO notifications if user has purchased
    }

    const displayFomoNotification = () => {
      const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
      const randomHours = Math.floor(Math.random() * 24) + 1; // 1-24 hours ago
      
      setFomoData({
        name: randomName,
        hoursAgo: randomHours
      });
      setShouldRender(true);
      setShowFomoNotification(true);
      setIsAnimatingOut(false);

      // Notification will be hidden when progress bar animation ends via onAnimationEnd
    };

    // Show first notification after 2 seconds for testing, then every 15 seconds
    const initialTimeout = setTimeout(displayFomoNotification, 2000);
    const interval = setInterval(displayFomoNotification, 15000);
    
    // Mark as initialized
    isInitialized.current = true;

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      isInitialized.current = false; // Reset on cleanup
    };
  }, [hasPurchasedCourse]); // Only depend on the memoized purchase status

  // Close notification function
  const closeNotification = () => {
    setIsAnimatingOut(true);
    
    // Hide notification after animation completes
    setTimeout(() => {
      setShouldRender(false);
      setShowFomoNotification(false);
      setIsAnimatingOut(false);
    }, 500); // Animation duration
  };

  return (
    <>
      {/* FOMO Notification */}
      {showFomoNotification && fomoData && (
        <div className={`fixed bottom-6 left-6 z-[9999] ${isAnimatingOut ? 'animate-slideOutLeft' : 'animate-slideInLeft'}`}>
          <div className="bg-black/80 backdrop-blur-md rounded-xl shadow-2xl border border-bca-cyan/30 p-4 max-w-sm relative overflow-hidden animate-neonGlow">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-bca-cyan/20 rounded-t-xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-bca-cyan to-bca-gold rounded-t-xl animate-progressBar"
                onAnimationEnd={() => {
                  setIsAnimatingOut(true);
                  setTimeout(() => {
                    setShouldRender(false);
                    setShowFomoNotification(false);
                    setIsAnimatingOut(false);
                  }, 500);
                }}
              ></div>
            </div>
            
            {/* Neon Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-bca-cyan/10 via-transparent to-bca-gold/10 rounded-xl"></div>
            
            {/* Close Button */}
            <button
              onClick={closeNotification}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-bca-cyan/60 hover:text-bca-gold transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3 pr-6 relative z-10">
              {/* User Image with Neon Effect */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-bca-cyan/20 to-bca-gold/20 rounded-full flex items-center justify-center border border-bca-cyan/30 shadow-lg shadow-bca-cyan/20">
                  <svg className="w-6 h-6 text-bca-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Notification Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-bca-cyan/80 font-medium">
                  {fomoData.name} just enrolled into
                </p>
                <p className="text-sm font-bold text-white truncate bg-gradient-to-r from-bca-cyan to-bca-gold bg-clip-text text-transparent">
                  FSWD with AWS & DevOps course
                </p>
                <p className="text-xs text-bca-gold/70 font-medium">
                  {fomoData.hoursAgo} hour{fomoData.hoursAgo !== 1 ? 's' : ''} ago
                </p>
              </div>
            </div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-xl border border-bca-cyan/20 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes slideInLeft {
          0% { 
            transform: translateX(-100%); 
            opacity: 0; 
            filter: blur(4px);
          }
          100% { 
            transform: translateX(0); 
            opacity: 1; 
            filter: blur(0px);
          }
        }
        
        @keyframes slideOutLeft {
          0% { 
            transform: translateX(0); 
            opacity: 1; 
            filter: blur(0px);
          }
          100% { 
            transform: translateX(-100%); 
            opacity: 0; 
            filter: blur(4px);
          }
        }
        
        @keyframes neonGlow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(6, 182, 212, 0.3), 0 0 10px rgba(6, 182, 212, 0.2), 0 0 15px rgba(6, 182, 212, 0.1);
          }
          50% { 
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.2);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
        
        .animate-slideOutLeft {
          animation: slideOutLeft 0.5s ease-in;
        }
        
        .animate-neonGlow {
          animation: neonGlow 2s ease-in-out infinite;
        }
        
        @keyframes progressBar {
          0% { 
            width: 100%; 
          }
          100% { 
            width: 0%; 
          }
        }
        
        .animate-progressBar {
          animation: progressBar 5s linear forwards;
        }
      `}</style>
    </>
  );
}
