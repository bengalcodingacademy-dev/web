import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoursePromo() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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

      {/* Enhanced Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              filter: `hue-rotate(${Math.random() * 360}deg)`
            }}
          >
            {['⚛️', '🚀', '☁️', '🐳', '🔐', '⚡', '🌐', '🎨', '💻', '🔧', '📱', '🎯'][Math.floor(Math.random() * 12)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-gradient-to-r from-bca-cyan/10 to-bca-gold/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
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

            {/* Floating Tech Icons Around Title */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-4 left-4 text-3xl opacity-30 animate-bounce" style={{animationDelay: '0s'}}>⚛️</div>
              <div className="absolute top-8 right-8 text-2xl opacity-30 animate-bounce" style={{animationDelay: '1s'}}>☁️</div>
              <div className="absolute bottom-8 left-8 text-2xl opacity-30 animate-bounce" style={{animationDelay: '2s'}}>⚡</div>
              <div className="absolute bottom-4 right-4 text-3xl opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}>🔐</div>
              <div className="absolute top-1/2 left-2 text-2xl opacity-30 animate-bounce" style={{animationDelay: '1.5s'}}>🎨</div>
              <div className="absolute top-1/2 right-2 text-2xl opacity-30 animate-bounce" style={{animationDelay: '2.5s'}}>🚀</div>
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

          {/* CTA Button */}
          <div className="flex justify-center items-center mt-8 mb-16 md:mb-24">
            <button 
              onClick={handleRegisterClick}
              className="px-8 py-4 bg-gradient-to-r from-bca-gold to-bca-cyan text-black font-bold text-lg rounded-xl hover:from-bca-gold/90 hover:to-bca-cyan/90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(253,176,0,0.5)] border-2 border-bca-gold/50 hover:border-bca-cyan/50 hover:shadow-[0_0_40px_rgba(0,189,255,0.6)] relative overflow-hidden group"
            >
              <span className="relative z-10 drop-shadow-[0_0_5px_rgba(0,0,0,0.3)]">
                এখনই রেজিস্টার করুন
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-bca-cyan/20 to-bca-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

