import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DurgaPujoWish() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="durga-pujo-wish"
      className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden"
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

      {/* Neon glowing balls background - Responsive count */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ...Array(
            window.innerWidth < 768 ? 12 : window.innerWidth < 1024 ? 16 : 20
          ),
        ].map((_, i) => {
          const neonColors = ["#00bdff", "#fdb000", "#fd0000"];
          const color = neonColors[i % 3];
          // Responsive sizes
          const size =
            window.innerWidth < 768 ? 8 + (i % 2) * 4 : 10 + (i % 3) * 5; // Smaller on mobile
          const left = (i * (window.innerWidth < 768 ? 8 : 5)) % 100; // More spread on mobile
          const duration = 8 + (i % 6); // 8-13s
          const delay = (i * 0.4) % 8; // Staggered delays
          const floatDuration = 3 + (i % 4); // 3-6s for Y movement
          return (
            <div
              key={i}
              className="neon-ball"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                backgroundColor: color,
                boxShadow: `0 0 ${
                  window.innerWidth < 768 ? "8px" : "15px"
                } ${color}, 0 0 ${
                  window.innerWidth < 768 ? "20px" : "35px"
                } ${color}`,
                animationDuration: `${duration}s, 2s, ${floatDuration}s`,
                animationDelay: `${delay}s, 0s, ${(i * 0.2) % 3}s`,
                "--neon-color": color, // CSS custom property
              }}
            />
          );
        })}
      </div>

      {/* Floating Sparkles - Responsive count */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ...Array(
            window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 12 : 15
          ),
        ].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${i * (window.innerWidth < 768 ? 12.5 : 6.67) + 5}%`,
              animationDelay: `${(i * 0.3) % 4}s`,
              animationDuration: `${4 + (i % 3)}s`,
              fontSize: window.innerWidth < 768 ? "1.2rem" : "1.5rem",
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Rotating Orbs - Responsive count and size */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ...Array(
            window.innerWidth < 768 ? 4 : window.innerWidth < 1024 ? 6 : 8
          ),
        ].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="rotating-orb"
            style={{
              width: `${
                window.innerWidth < 768 ? 15 + (i % 2) * 8 : 20 + (i % 3) * 10
              }px`,
              height: `${
                window.innerWidth < 768 ? 15 + (i % 2) * 8 : 20 + (i % 3) * 10
              }px`,
              left: `${i * (window.innerWidth < 768 ? 25 : 12.5) + 5}%`,
              top: `${20 + (i % 4) * 15}%`,
              animationDelay: `${(i * 0.5) % 3}s`,
              animationDuration: `${6 + (i % 4)}s`,
              "--orb-color": ["#00bdff", "#fdb000", "#fd0000"][i % 3],
            }}
          />
        ))}
      </div>

      {/* Pulsing Rings - Responsive count and size */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ...Array(
            window.innerWidth < 768 ? 3 : window.innerWidth < 1024 ? 4 : 6
          ),
        ].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="pulsing-ring"
            style={{
              left: `${i * (window.innerWidth < 768 ? 33.33 : 16.67) + 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${(i * 0.8) % 4}s`,
              animationDuration: `${5 + (i % 3)}s`,
              "--ring-color": ["#00bdff", "#fdb000", "#fd0000"][i % 3],
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 py-6">
        {/* Main Wish */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-[1.2] sm:leading-[1.4] tracking-wide animate-text-glow px-2"
          style={{
            background:
              "linear-gradient(45deg, #00bdff, #fdb000, #fd0000, #00bdff)",
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 15px rgba(0,189,255,0.8), 0 0 30px rgba(253,176,0,0.6)",
            animation:
              "textGradientShift 3s ease-in-out infinite, textPulse 2s ease-in-out infinite",
          }}
        >
          দুর্গা পুজো ভালো কাটুক
        </motion.h1>

        {/* Sub Wish */}
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.9 }
          }
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-semibold leading-[1.3] sm:leading-[1.5] pb-2 animate-text-float px-2"
          style={{
            background: "linear-gradient(45deg, #fdb000, #00bdff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 10px rgba(253,176,0,0.7), 0 0 20px rgba(0,189,255,0.6)",
            animation: "textFloat 4s ease-in-out infinite",
          }}
        >
          শুভ মহাষ্টমী
        </motion.h2>
      </div>

      {/* Animations */}
      <style jsx>{`
        .neon-ball {
          position: absolute;
          top: 0;
          border-radius: 50%;
          will-change: transform, opacity;
          animation-name: floatDown, neonPulse, floatY;
          animation-timing-function: linear, ease-in-out, ease-in-out;
          animation-iteration-count: infinite, infinite, infinite;
          animation-fill-mode: both;
          z-index: 1;
        }

        @keyframes floatDown {
          0% {
            transform: translateY(-150px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 150px));
            opacity: 0;
          }
        }

        @keyframes neonPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 15px var(--neon-color), 0 0 35px var(--neon-color);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 25px var(--neon-color), 0 0 50px var(--neon-color);
          }
        }

        @keyframes floatY {
          0% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-20px);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes durgaPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-durgaPulse {
          animation: durgaPulse 6s ease-in-out infinite;
        }

        /* Sparkle Animation */
        .sparkle {
          position: absolute;
          top: -50px;
          font-size: 1.5rem;
          animation: sparkleFloat 4s linear infinite;
          opacity: 0.8;
          z-index: 2;
        }

        @keyframes sparkleFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
            opacity: 0;
          }
        }

        /* Rotating Orb Animation */
        .rotating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, var(--orb-color), transparent);
          border: 2px solid var(--orb-color);
          box-shadow: 0 0 20px var(--orb-color),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          animation: orbRotate 6s linear infinite;
          z-index: 1;
        }

        @keyframes orbRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        /* Pulsing Ring Animation */
        .pulsing-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 3px solid var(--ring-color);
          border-radius: 50%;
          animation: ringPulse 5s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes ringPulse {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
            box-shadow: 0 0 0 0 var(--ring-color);
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
            box-shadow: 0 0 0 20px transparent;
          }
          100% {
            transform: scale(0.5);
            opacity: 0.8;
            box-shadow: 0 0 0 0 var(--ring-color);
          }
        }

        /* Text Animations */
        @keyframes textGradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes textPulse {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(0, 189, 255, 0.8),
              0 0 40px rgba(253, 176, 0, 0.6);
          }
          50% {
            text-shadow: 0 0 30px rgba(0, 189, 255, 1),
              0 0 60px rgba(253, 176, 0, 0.8), 0 0 80px rgba(253, 0, 0, 0.6);
          }
        }

        @keyframes textFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .neon-ball {
            animation-duration: 6s, 1.5s, 2.5s !important; /* Faster animations on mobile */
          }

          .sparkle {
            animation-duration: 3s !important; /* Faster sparkles on mobile */
          }

          .rotating-orb {
            animation-duration: 4s !important; /* Faster orbs on mobile */
          }

          .pulsing-ring {
            animation-duration: 3s !important; /* Faster rings on mobile */
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .neon-ball,
          .sparkle,
          .rotating-orb,
          .pulsing-ring {
            animation: none !important;
          }

          .animate-text-glow,
          .animate-text-float {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
