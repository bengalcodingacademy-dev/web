import { useEffect, useState } from "react";

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
      className="relative w-full min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://sauvikbcabucket.s3.ap-south-1.amazonaws.com/assets/maa+durga.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll", // Changed from fixed for better mobile performance
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Optimized Neon Particles - Responsive Count */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 4 : 6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: window.innerWidth < 768 ? "8px" : "12px",
              height: window.innerWidth < 768 ? "8px" : "12px",
              left: `${i * (window.innerWidth < 768 ? 25 : 16.67) + 10}%`,
              backgroundColor: ["#00bdff", "#fdb000", "#fd0000"][i % 3],
              boxShadow: `0 0 ${window.innerWidth < 768 ? "8px" : "15px"} ${
                ["#00bdff", "#fdb000", "#fd0000"][i % 3]
              }, 0 0 ${window.innerWidth < 768 ? "16px" : "30px"} ${
                ["#00bdff", "#fdb000", "#fd0000"][i % 3]
              }`,
              animation: `float ${
                window.innerWidth < 768 ? 6 + i * 1.5 : 8 + i * 2
              }s linear infinite ${i * 1.5}s, floatY ${
                window.innerWidth < 768 ? 2 + (i % 2) : 3 + (i % 3)
              }s ease-in-out infinite ${(i * 0.3) % 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles - Responsive Count */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 4 : 8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${i * (window.innerWidth < 768 ? 25 : 12.5) + 5}%`,
              animationDelay: `${(i * 0.4) % 3}s`,
              animationDuration: `${
                window.innerWidth < 768 ? 2 + (i % 2) : 3 + (i % 2)
              }s`,
              fontSize: window.innerWidth < 768 ? "1rem" : "1.2rem",
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Pulsing Rings - Responsive Count */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 2 : 4)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="pulsing-ring"
            style={{
              left: `${i * (window.innerWidth < 768 ? 50 : 25) + 12.5}%`,
              top: `${25 + (i % 2) * 30}%`,
              animationDelay: `${(i * 0.6) % 2}s`,
              animationDuration: `${
                window.innerWidth < 768 ? 3 + (i % 2) : 4 + (i % 2)
              }s`,
              "--ring-color": ["#00bdff", "#fdb000", "#fd0000"][i % 3],
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
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src="https://sauvikbcabucket.s3.ap-south-1.amazonaws.com/assets/maa+durga.png"
                alt="Maa Durga"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter drop-shadow-2xl"
                style={{
                  filter:
                    "drop-shadow(0 0 30px rgba(253,176,0,0.8)) drop-shadow(0 0 60px rgba(0,189,255,0.6)) drop-shadow(0 0 90px rgba(253,0,0,0.4))",
                }}
              />
              {/* Enhanced glowing aura around the image */}
              <div
                className="absolute inset-0 rounded-full opacity-50 animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(253,176,0,0.5) 0%, rgba(0,189,255,0.4) 30%, rgba(253,0,0,0.3) 60%, transparent 80%)",
                  transform: "scale(1.8)",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`mb-6 transition-all duration-1200 ease-out ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-12"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight animate-neon-gradient-text px-2"
            style={{
              textShadow:
                "0 0 20px rgba(0,189,255,0.8), 0 0 40px rgba(253,176,0,0.6), 0 0 60px rgba(253,0,0,0.4)",
            }}
          >
            বিজয়া দশমীর শুভেচ্ছা
          </h1>
        </div>

        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold animate-neon-gradient-text-subtitle px-2"
            style={{
              textShadow:
                "0 0 15px rgba(253,176,0,0.8), 0 0 30px rgba(0,189,255,0.6)",
            }}
          >
            আসছে বছর আবার হবে!
          </h2>
        </div>

        {/* Decorative Elements */}
        <div
          className={`flex justify-center items-center space-x-4 md:space-x-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ transitionDelay: "1.2s" }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: ["#00bdff", "#fdb000", "#fd0000"][i % 3],
                boxShadow: `0 0 15px ${
                  ["#00bdff", "#fdb000", "#fd0000"][i % 3]
                }, 0 0 30px ${["#00bdff", "#fdb000", "#fd0000"][i % 3]}`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(calc(100vh + 100px));
            opacity: 0;
          }
        }

        @keyframes floatY {
          0% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-15px);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes neonGradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Sparkle Animation */
        .sparkle {
          position: absolute;
          top: -30px;
          font-size: 1.2rem;
          animation: sparkleFloat 3s linear infinite;
          opacity: 0.7;
          z-index: 2;
        }

        @keyframes sparkleFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(calc(100vh + 30px)) rotate(360deg);
            opacity: 0;
          }
        }

        /* Pulsing Ring Animation */
        .pulsing-ring {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid var(--ring-color);
          border-radius: 50%;
          animation: ringPulse 4s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes ringPulse {
          0% {
            transform: scale(0.3);
            opacity: 0.6;
            box-shadow: 0 0 0 0 var(--ring-color);
          }
          50% {
            transform: scale(1);
            opacity: 0.3;
            box-shadow: 0 0 0 15px transparent;
          }
          100% {
            transform: scale(0.3);
            opacity: 0.6;
            box-shadow: 0 0 0 0 var(--ring-color);
          }
        }

        @keyframes neonPulse {
          0%,
          100% {
            text-shadow: 0 0 30px rgba(0, 189, 255, 0.8),
              0 0 60px rgba(253, 176, 0, 0.6), 0 0 90px rgba(253, 0, 0, 0.4);
          }
          50% {
            text-shadow: 0 0 40px rgba(0, 189, 255, 1),
              0 0 80px rgba(253, 176, 0, 0.8), 0 0 120px rgba(253, 0, 0, 0.6);
          }
        }

        .animate-neon-gradient-text {
          background: linear-gradient(
            45deg,
            #00bdff,
            #fdb000,
            #fd0000,
            #00bdff
          );
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: neonGradientShift 4s ease-in-out infinite,
            neonPulse 3s ease-in-out infinite;
        }

        .animate-neon-gradient-text-subtitle {
          background: linear-gradient(45deg, #fdb000, #00bdff, #fd0000);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: neonGradientShift 5s ease-in-out infinite;
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .sparkle {
            animation-duration: 2s !important; /* Faster sparkles on mobile */
          }

          .pulsing-ring {
            animation-duration: 3s !important; /* Faster rings on mobile */
          }

          .animate-neon-gradient-text,
          .animate-neon-gradient-text-subtitle {
            animation-duration: 3s !important; /* Faster text animations on mobile */
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .sparkle,
          .pulsing-ring {
            animation: none !important;
          }

          .animate-neon-gradient-text,
          .animate-neon-gradient-text-subtitle {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
