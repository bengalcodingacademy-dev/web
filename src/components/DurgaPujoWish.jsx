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
      className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Neon glowing balls background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const neonColors = ["#00bdff", "#fdb000", "#fd0000"];
          const color = neonColors[i % 3];
          // Use fixed values based on index to prevent re-rendering
          const size = 10 + (i % 3) * 5; // 10, 15, or 20px
          const left = (i * 5) % 100; // Spread across width
          const duration = 8 + (i % 6); // 8-13s
          const delay = (i * 0.4) % 8; // Staggered delays
          return (
            <div
              key={i}
              className="neon-ball"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                backgroundColor: color,
                boxShadow: `0 0 15px ${color}, 0 0 35px ${color}`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                '--neon-color': color, // CSS custom property
                // Temporary debug border
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 py-6">
        {/* Maa Durga Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <img
            src="https://sauvikbcabucket.s3.ap-south-1.amazonaws.com/assets/maa+durga.png"
            alt="Maa Durga"
            loading="lazy"
            className="w-56 h-56 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] object-contain animate-durgaPulse"
            style={{
              filter:
                "drop-shadow(0 0 35px rgba(253,176,0,0.8)) drop-shadow(0 0 70px rgba(0,189,255,0.7))",
            }}
          />
        </motion.div>

        {/* Main Wish */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.4] tracking-wide"
          style={{
            background:
              "linear-gradient(45deg, #00bdff, #fdb000, #fd0000, #00bdff)",
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 20px rgba(0,189,255,0.8), 0 0 40px rgba(253,176,0,0.6)",
          }}
        >
          দুর্গা পুজো ভালো কাটুক
        </motion.h1>

        {/* Sub Wish */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.5] pb-2"
          style={{
            background: "linear-gradient(45deg, #fdb000, #00bdff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 15px rgba(253,176,0,0.7), 0 0 30px rgba(0,189,255,0.6)",
          }}
        >
          শুভ ষষ্ঠী
        </motion.h2>
      </div>

      {/* Animations */}
      <style jsx>{`
         .neon-ball {
           position: absolute;
           top: -100px;
           border-radius: 50%;
           will-change: transform, opacity;
           animation-name: floatDown, neonPulse;
           animation-timing-function: linear, ease-in-out;
           animation-iteration-count: infinite, infinite;
           animation-fill-mode: both;
           z-index: 1;
         }

         @keyframes floatDown {
           0% {
             transform: translateY(-100px);
             opacity: 0;
           }
           10% {
             opacity: 1;
           }
           90% {
             opacity: 1;
           }
           100% {
             transform: translateY(calc(100vh + 100px));
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
      `}</style>
    </section>
  );
}
