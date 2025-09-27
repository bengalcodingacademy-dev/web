import { useEffect, useState } from 'react';

export default function DurgaPujoWishSimple() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="durga-pujo-wish" 
      className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Optimized Neon Particles - Reduced Count */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full animate-float"
            style={{
              left: `${(i * 16.67) + 10}%`, // Fixed positions instead of random
              backgroundColor: ['#00bdff', '#fdb000', '#fd0000'][i % 3],
              boxShadow: `0 0 15px ${['#00bdff', '#fdb000', '#fd0000'][i % 3]}, 0 0 30px ${['#00bdff', '#fdb000', '#fd0000'][i % 3]}`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + (i * 2)}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 py-8">
        {/* Maa Durga Image */}
        <div
          className={`mb-6 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-75 translate-y-8'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src="https://sauvikbcabucket.s3.ap-south-1.amazonaws.com/assets/maa+durga.png"
                alt="Maa Durga"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(253,176,0,0.8)) drop-shadow(0 0 60px rgba(0,189,255,0.6)) drop-shadow(0 0 90px rgba(253,0,0,0.4))'
                }}
              />
              {/* Enhanced glowing aura around the image */}
              <div 
                className="absolute inset-0 rounded-full opacity-50 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(253,176,0,0.5) 0%, rgba(0,189,255,0.4) 30%, rgba(253,0,0,0.3) 60%, transparent 80%)',
                  transform: 'scale(1.8)',
                  zIndex: -1
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`mb-6 transition-all duration-1200 ease-out ${
            isVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-75 translate-y-12'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-neon-gradient-text"
            style={{
              textShadow: '0 0 30px rgba(0,189,255,0.8), 0 0 60px rgba(253,176,0,0.6), 0 0 90px rgba(253,0,0,0.4)'
            }}
          >
            দুর্গা পুজো ভালো কাটুক
          </h1>
        </div>

        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-semibold animate-neon-gradient-text-subtitle"
            style={{
              textShadow: '0 0 20px rgba(253,176,0,0.8), 0 0 40px rgba(0,189,255,0.6)'
            }}
          >
            শুভ ষষ্ঠী
          </h2>
        </div>

        {/* Decorative Elements */}
        <div
          className={`flex justify-center items-center space-x-4 md:space-x-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: ['#00bdff', '#fdb000', '#fd0000'][i % 3],
                boxShadow: `0 0 15px ${['#00bdff', '#fdb000', '#fd0000'][i % 3]}, 0 0 30px ${['#00bdff', '#fdb000', '#fd0000'][i % 3]}`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-400px);
            opacity: 0;
          }
        }

        @keyframes neonGradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            text-shadow: 0 0 30px rgba(0,189,255,0.8), 0 0 60px rgba(253,176,0,0.6), 0 0 90px rgba(253,0,0,0.4);
          }
          50% {
            text-shadow: 0 0 40px rgba(0,189,255,1), 0 0 80px rgba(253,176,0,0.8), 0 0 120px rgba(253,0,0,0.6);
          }
        }

        .animate-neon-gradient-text {
          background: linear-gradient(45deg, #00bdff, #fdb000, #fd0000, #00bdff);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: neonGradientShift 4s ease-in-out infinite, neonPulse 3s ease-in-out infinite;
        }

        .animate-neon-gradient-text-subtitle {
          background: linear-gradient(45deg, #fdb000, #00bdff, #fd0000);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: neonGradientShift 5s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }

        @media (max-width: 640px) {
          .text-3xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .text-xl {
            font-size: 1.125rem;
            line-height: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
