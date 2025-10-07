import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CoursePromo() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const navigate = useNavigate();

  // Static randomly generated emojis - generated once and never re-rendered
  const staticRandomEmojis = useMemo(() => {
    const emojiList = ['⚛️', '🚀', '☁️', '🐳', '🔐', '⚡', '🌐', '💻', '🔧', '📱', '🎯', '🔥', '💎', '🌟', '🎮', '🕹️', '🎲', '🧩', '💾', '💿', '📀', '🖥️', '⌨️', '🖱️', '🖨️', '📷', '📹', '📺', '📻', '📞', '☎️', '📠', '🔌', '🔋', '💡', '🔦', '🕯️', '🧯', '🛠️', '⚙️', '🔩', '⚖️', '🔬', '🔭', '📡', '🛰️', '🚁', '✈️', '🛸', '🛰️', '🌍', '🌎', '🌏', '🗺️', '🧭', '⏰', '⏲️', '⏱️', '🕰️', '⌚', '📱', '💻', '🖥️', '⌨️', '🖱️', '🖨️', '📷', '📹', '📺', '📻', '📞', '☎️', '📠', '🔌', '🔋', '💡', '🔦', '🕯️', '🧯', '🛠️', '⚙️', '🔩', '⚖️', '🔬', '🔭', '📡', '🛰️', '🚁', '✈️', '🛸', '🛰️', '🌍', '🌎', '🌏', '🗺️', '🧭', '⏰', '⏲️', '⏱️', '🕰️', '⌚'];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      left: Math.random() * 100,
      // Distribute emojis across the full height: 0-100% (top to bottom)
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 3 + Math.random() * 4,
      hueRotate: Math.random() * 360,
      size: Math.random() * 0.5 + 1.5 // Random size between 1.5 and 2
    }));
  }, []); // Empty dependency array ensures this runs only once

  const images = [
    {
      id: 1,
      src: "https://d270a3f3iqnh9i.cloudfront.net/assets/1.png",
      alt: "Full Stack Web Development - Frontend Technologies"
    },
    {
      id: 2,
      src: "https://d270a3f3iqnh9i.cloudfront.net/assets/2.png",
      alt: "Full Stack Web Development - Backend Technologies"
    },
    {
      id: 3,
      src: "https://d270a3f3iqnh9i.cloudfront.net/assets/3.png",
      alt: "Full Stack Web Development - DevOps & Cloud"
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  const handleRegisterClick = () => {
    navigate('/course/fswd');
  };

  const handleEnrollClick = () => {
    setShowEnrollmentPopup(true);
  };

  const handleEnrollNow = () => {
    setShowEnrollmentPopup(false);
    navigate('/course/fswd');
  };

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const enrollmentEndDate = new Date('November 20, 2025 23:59:59').getTime();
      const now = new Date().getTime();
      const difference = enrollmentEndDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <section className="relative min-h-screen bg-gradient-to-br from-bca-black via-bca-gray-900 to-bca-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-bca-cyan/20 to-bca-cyan/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-bca-gold/20 to-bca-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-bca-red/20 to-bca-red/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-bca-cyan/15 to-bca-gold/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-bca-gold/15 to-bca-red/15 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Static Random Emojis - Generated once, never re-render */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {staticRandomEmojis.map((emojiData) => (
          <div
            key={emojiData.id}
            className="absolute text-2xl opacity-30 animate-float"
            style={{
              left: `${emojiData.left}%`,
              top: `${emojiData.top}%`,
              animationDelay: `${emojiData.animationDelay}s`,
              animationDuration: `${emojiData.animationDuration}s`,
              filter: `hue-rotate(${emojiData.hueRotate}deg)`,
              fontSize: `${emojiData.size}rem`,
              zIndex: 1
            }}
          >
            {emojiData.emoji}
          </div>
        ))}
      </div>

      {/* Additional emojis specifically positioned in middle and bottom sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Middle section emojis */}
        <div className="absolute top-1/2 left-1/4 text-2xl opacity-25 animate-float" style={{animationDelay: '1.2s', animationDuration: '4s', filter: 'hue-rotate(120deg)'}}>💻</div>
        <div className="absolute top-1/2 right-1/3 text-3xl opacity-25 animate-float" style={{animationDelay: '2.8s', animationDuration: '5s', filter: 'hue-rotate(240deg)'}}>🖥️</div>
        <div className="absolute top-1/2 left-1/2 text-2xl opacity-25 animate-float" style={{animationDelay: '0.5s', animationDuration: '3.5s', filter: 'hue-rotate(60deg)'}}>⌨️</div>
        <div className="absolute top-1/2 right-1/4 text-2xl opacity-25 animate-float" style={{animationDelay: '3.2s', animationDuration: '4.5s', filter: 'hue-rotate(180deg)'}}>🖱️</div>
        
        {/* Bottom section emojis */}
        <div className="absolute bottom-1/4 left-1/5 text-3xl opacity-25 animate-float" style={{animationDelay: '1.8s', animationDuration: '4.2s', filter: 'hue-rotate(300deg)'}}>📱</div>
        <div className="absolute bottom-1/3 right-1/5 text-2xl opacity-25 animate-float" style={{animationDelay: '0.8s', animationDuration: '3.8s', filter: 'hue-rotate(45deg)'}}>📷</div>
        <div className="absolute bottom-1/5 left-1/3 text-2xl opacity-25 animate-float" style={{animationDelay: '2.5s', animationDuration: '4.8s', filter: 'hue-rotate(150deg)'}}>📹</div>
        <div className="absolute bottom-1/6 right-1/3 text-3xl opacity-25 animate-float" style={{animationDelay: '1.5s', animationDuration: '3.2s', filter: 'hue-rotate(270deg)'}}>📺</div>
        <div className="absolute bottom-1/4 left-2/3 text-2xl opacity-25 animate-float" style={{animationDelay: '3.5s', animationDuration: '4.5s', filter: 'hue-rotate(90deg)'}}>🖨️</div>
        <div className="absolute bottom-1/5 right-2/3 text-2xl opacity-25 animate-float" style={{animationDelay: '0.3s', animationDuration: '3.7s', filter: 'hue-rotate(210deg)'}}>🎮</div>
      </div>


      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-gradient-to-r from-bca-cyan/10 to-bca-gold/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            {/* Static Floating Tech Icons - Pure CSS, won't re-render */}
            <div className="absolute top-1/4 left-1/4 text-3xl opacity-30 animate-bounce pointer-events-none" style={{animationDelay: '0.5s'}}>⚛️</div>
            <div className="absolute bottom-1/3 right-1/4 text-3xl opacity-30 animate-bounce pointer-events-none" style={{animationDelay: '1.0s'}}>☁️</div>
            <div className="absolute top-1/2 left-2 text-2xl opacity-30 animate-bounce pointer-events-none" style={{animationDelay: '1.5s'}}>🎨</div>
            <div className="absolute top-1/2 right-2 text-2xl opacity-30 animate-bounce pointer-events-none" style={{animationDelay: '2.5s'}}>🚀</div>
            
            {/* Main Title with Neon Effects */}
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <span className="bg-gradient-to-r from-white via-bca-cyan to-white bg-clip-text text-transparent animate-pulse">
                  Full Stack Web Development
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-bca-gold mb-2 drop-shadow-[0_0_15px_rgba(253,176,0,0.6)]">
                with AWS and Advanced DevOps
              </h2>
              <div className="inline-block">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-bca-cyan to-bca-gold bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,189,255,0.5)]">
                  Batch 3
                </span>
              </div>
            </div>

            {/* Enhanced Separator Line */}
            <div className="flex items-center justify-center my-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-bca-gold rounded-full"></div>
              <div className="w-32 h-1 bg-gradient-to-r from-bca-gold via-bca-cyan to-bca-gold rounded-full mx-4 shadow-[0_0_20px_rgba(0,189,255,0.5)]"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-bca-cyan to-transparent rounded-full"></div>
            </div>

            {/* Description with Enhanced Styling */}
            <p className="text-white/90 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              এবার মডার্ন টেকনোলজি আর ক্লাউড ডিপ্লয়মেন্ট করে পুরো ওয়েব ডেভেলপমেন্ট শিখে নিজের প্রোডাক্ট লঞ্চ করো
            </p>

          </div>


          {/* Countdown Timer */}
          <div className="text-center mb-12">
            <h4 className="text-2xl md:text-3xl font-bold text-bca-gold mb-8 bg-gradient-to-r from-bca-gold to-bca-cyan bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(253,176,0,0.6)]">
              Enrollment Ends In
            </h4>
            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
              {/* Days */}
              <div className="bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 rounded-xl p-6 border border-bca-gold/30 shadow-[0_0_25px_rgba(253,176,0,0.4)] min-w-[100px] hover:shadow-[0_0_35px_rgba(253,176,0,0.6)] transition-all duration-300">
                <div className="text-4xl font-bold text-bca-gold mb-2 drop-shadow-[0_0_8px_rgba(253,176,0,0.6)]">{timeLeft.days}</div>
                <div className="text-sm text-bca-gray-300 font-medium">Days</div>
              </div>
              
              {/* Hours */}
              <div className="bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 rounded-xl p-6 border border-bca-cyan/30 shadow-[0_0_25px_rgba(0,189,255,0.4)] min-w-[100px] hover:shadow-[0_0_35px_rgba(0,189,255,0.6)] transition-all duration-300">
                <div className="text-4xl font-bold text-bca-cyan mb-2 drop-shadow-[0_0_8px_rgba(0,189,255,0.6)]">{timeLeft.hours}</div>
                <div className="text-sm text-bca-gray-300 font-medium">Hours</div>
              </div>
              
              {/* Minutes */}
              <div className="bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 rounded-xl p-6 border border-bca-gold/30 shadow-[0_0_25px_rgba(253,176,0,0.4)] min-w-[100px] hover:shadow-[0_0_35px_rgba(253,176,0,0.6)] transition-all duration-300">
                <div className="text-4xl font-bold text-bca-gold mb-2 drop-shadow-[0_0_8px_rgba(253,176,0,0.6)]">{timeLeft.minutes}</div>
                <div className="text-sm text-bca-gray-300 font-medium">Minutes</div>
              </div>
              
              {/* Seconds */}
              <div className="bg-gradient-to-br from-bca-gray-800/80 to-bca-gray-900/80 rounded-xl p-6 border border-bca-cyan/30 shadow-[0_0_25px_rgba(0,189,255,0.4)] min-w-[100px] hover:shadow-[0_0_35px_rgba(0,189,255,0.6)] transition-all duration-300">
                <div className="text-4xl font-bold text-bca-cyan mb-2 drop-shadow-[0_0_8px_rgba(0,189,255,0.6)] animate-pulse">{timeLeft.seconds}</div>
                <div className="text-sm text-bca-gray-300 font-medium">Seconds</div>
              </div>
            </div>
          </div>

          {/* Image Slideshow Display */}
          <div className="relative">
            <div 
              className="w-full max-w-4xl mx-auto aspect-[16/9] relative overflow-hidden rounded-2xl border-2 border-bca-cyan/30 bg-gradient-to-br from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm shadow-[0_0_50px_rgba(0,189,255,0.3)] transition-all duration-300 hover:border-bca-cyan/60 hover:shadow-[0_0_80px_rgba(0,189,255,0.5)] hover:scale-[1.02] cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleRegisterClick}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentImage
                      ? 'opacity-100 translate-x-0'
                      : index < currentImage
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                  />
                  {/* Optional overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              ))}
            </div>

            {/* Image Indicators */}
            <div className="flex justify-center mt-6 space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                    index === currentImage
                      ? 'bg-bca-cyan border-bca-cyan shadow-[0_0_15px_#00bdff] scale-110'
                      : 'bg-transparent border-white/40 hover:border-bca-cyan/60 hover:bg-bca-cyan/20 hover:shadow-[0_0_10px_rgba(0,189,255,0.4)]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Class Schedule */}
          <div className="mt-12 bg-gradient-to-r from-bca-gray-800/50 to-bca-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-bca-cyan/20 shadow-[0_0_30px_rgba(0,189,255,0.2)]">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              ক্লাসের সময়
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-br from-bca-cyan/20 to-bca-cyan/10 rounded-xl p-4 border-2 border-bca-cyan/40 shadow-[0_0_20px_rgba(0,189,255,0.3)] hover:shadow-[0_0_25px_rgba(0,189,255,0.5)] transition-all duration-300">
                <h4 className="text-lg font-semibold text-bca-cyan mb-2 drop-shadow-[0_0_8px_rgba(0,189,255,0.6)]">শনিবার</h4>
                <p className="text-white/90">সকাল ৯:৩০টা থেকে দুপুর ১২:০০টা</p>
              </div>
              <div className="bg-gradient-to-br from-bca-gold/20 to-bca-gold/10 rounded-xl p-4 border-2 border-bca-gold/40 shadow-[0_0_20px_rgba(253,176,0,0.3)] hover:shadow-[0_0_25px_rgba(253,176,0,0.5)] transition-all duration-300">
                <h4 className="text-lg font-semibold text-bca-gold mb-2 drop-shadow-[0_0_8px_rgba(253,176,0,0.6)]">রবিবার</h4>
                <p className="text-white/90">সকাল ৯:৩০টা থেকে দুপুর ১২:০০টা</p>
              </div>
              <div className="bg-gradient-to-br from-bca-red/20 to-bca-red/10 rounded-xl p-4 border-2 border-bca-red/40 shadow-[0_0_20px_rgba(253,0,0,0.3)] hover:shadow-[0_0_25px_rgba(253,0,0,0.5)] transition-all duration-300">
                <h4 className="text-lg font-semibold text-bca-red mb-2 drop-shadow-[0_0_8px_rgba(253,0,0,0.6)]">বৃহস্পতিবার</h4>
                <p className="text-white/90">রাত ৯:০০টা (ডাউট সলভিং সেশন)</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-white/90 text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                ক্লাস হবে সম্পূর্ণ বাংলায়, প্রত্যেকটা কনসেপ্ট বুঝতে পারবেন
              </p>
            </div>
          </div>

          {/* Enrollment Schedule Section */}
          <div className="mt-12 mb-20 md:mb-32 relative">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-bca-gold/5 via-bca-cyan/5 to-bca-gold/5 rounded-3xl blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-bca-gold/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-bca-cyan/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            <div className="relative bg-gradient-to-br from-bca-gray-800/90 to-bca-gray-900/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-bca-gold/40 shadow-[0_0_50px_rgba(253,176,0,0.4)] hover:shadow-[0_0_60px_rgba(253,176,0,0.6)] transition-all duration-500">
              {/* Title */}
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-bca-gold bg-gradient-to-r from-bca-gold via-bca-cyan to-bca-gold bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(253,176,0,0.6)]">
                  Next Batch Enrollment Schedule
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto mt-3 rounded-full shadow-[0_0_8px_rgba(253,176,0,0.5)]"></div>
              </div>
              
              {/* Enrollment Dates */}
              <div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-12 relative">
                {/* Enrollment Start */}
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-500/15 rounded-xl flex items-center justify-center border-2 border-green-500/50 shadow-[0_0_25px_rgba(34,197,94,0.4)] group-hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all duration-300 group-hover:scale-105">
                    <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white text-2xl mb-1 drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]">Enrollment Start</p>
                    <p className="text-bca-gray-300 text-xl font-medium">October 13, 2025</p>
                  </div>
                </div>
                
                {/* Animated Arrow */}
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="flex items-center">
                    {/* Arrow Line */}
                    <div className="w-28 h-1 bg-gradient-to-r from-green-400 to-bca-cyan relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
                    </div>
                    
                    {/* Arrow Head */}
                    <div className="relative ml-1">
                      <svg className="w-5 h-5 text-bca-cyan" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </div>
                    
                    {/* Arrow Line 2 */}
                    <div className="w-28 h-1 bg-gradient-to-r from-bca-cyan to-pink-400 relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Enrollment End */}
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-pink-500/15 rounded-xl flex items-center justify-center border-2 border-pink-500/50 shadow-[0_0_25px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all duration-300 group-hover:scale-105">
                    <svg className="w-8 h-8 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white text-2xl mb-1 drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]">Enrollment End</p>
                    <p className="text-bca-gray-300 text-xl font-medium">November 20, 2025</p>
                  </div>
                </div>
              </div>

              
              {/* Course Fee */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-bca-cyan/20 to-bca-gold/20 rounded-xl p-4 border border-bca-cyan/30 shadow-[0_0_20px_rgba(0,189,255,0.3)]">
                  <p className="text-xl md:text-2xl font-bold text-bca-cyan bg-gradient-to-r from-bca-cyan via-bca-gold to-bca-cyan bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,189,255,0.6)]">
                    Course Fee Rs. 1500 / Month
                  </p>
                </div>
              </div>
              
              {/* Enroll Now Button */}
              <div className="text-center">
                <button 
                  onClick={handleEnrollClick}
                  className="px-12 py-4 bg-gradient-to-r from-bca-gold via-bca-cyan to-bca-gold text-black font-bold text-xl rounded-xl shadow-[0_0_30px_rgba(253,176,0,0.5)] border-2 border-bca-gold/50 hover:border-bca-cyan/50 hover:shadow-[0_0_40px_rgba(0,189,255,0.6)] transition-all duration-300 transform hover:scale-105 hover:from-bca-gold/90 hover:via-bca-cyan/90 hover:to-bca-gold/90 relative overflow-hidden group"
                >
                  <span className="relative z-10 drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] tracking-wide">
                    ENROLL NOW
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-bca-cyan/20 to-bca-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Enrollment Popup */}
          {showEnrollmentPopup && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-bca-gray-800/95 to-bca-gray-900/95 backdrop-blur-sm rounded-2xl p-8 border border-bca-gold/30 shadow-[0_0_40px_rgba(253,176,0,0.4)] max-w-md w-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-bca-gold mb-6 bg-gradient-to-r from-bca-gold to-bca-cyan bg-clip-text text-transparent">
                    Important Notice
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed mb-8">
                    আমাদের FSWD With AWS & DEVOPS ব্যাচের এনরোলমেন্ট শুরু হবে ৫ অক্টোবর, ২০২৫ এবং এনরোলমেন্ট শেষ হবে ২০ নভেম্বর, ২০২৫। ২০ নভেম্বরের পর এই ব্যাচে আর কাউকে এনরোল করানো হবে না।
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => setShowEnrollmentPopup(false)}
                      className="px-6 py-2 bg-bca-gray-600 text-white rounded-lg hover:bg-bca-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleEnrollNow}
                      className="px-8 py-3 bg-gradient-to-r from-bca-gold to-bca-cyan text-black font-bold rounded-xl hover:from-bca-gold/90 hover:to-bca-cyan/90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(253,176,0,0.4)]"
                    >
                      ENROLL NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes moveRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
      `}</style>
    </section>
  );
}

