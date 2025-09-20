import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import Shimmer from './Shimmer';

export default function TestimonialSlideshow() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get('/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            What learners say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
        </div>
        <div className="relative h-80 md:h-96 overflow-hidden">
          {/* Mobile Loading */}
          <div className="md:hidden flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Shimmer key={index} type="testimonial" height="100px" className="flex-shrink-0" />
            ))}
          </div>
          {/* Desktop Loading */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-6">
                {Array.from({ length: 2 }).map((_, subIndex) => (
                  <Shimmer key={subIndex} type="testimonial" height="120px" className="flex-shrink-0" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  // Split testimonials into two columns for vertical sliding
  const firstColumn = testimonials.filter((_, index) => index % 2 === 0);
  const secondColumn = testimonials.filter((_, index) => index % 2 === 1);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          What learners say
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
      </div>

      <div className="relative h-80 md:h-96 overflow-hidden">
        {/* Mobile: Single Column - Slides Up */}
        <div className="md:hidden relative overflow-hidden h-full">
          <motion.div
            className="flex flex-col gap-4"
            animate={{ 
              y: [0, -(testimonials.length * 200), 0] 
            }}
            transition={{ 
              duration: testimonials.length * 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`mobile-${testimonial.id}-${index}`}
                className="group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-bca-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02] flex-shrink-0"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-bca-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    {testimonial.studentImage ? (
                      <div className="relative">
                        <img
                          src={testimonial.studentImage}
                          alt={testimonial.studentName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-bca-gold/50 shadow-lg"
                        />
                        <div className="absolute -inset-1 bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bca-gray-700 to-bca-gray-600 flex items-center justify-center border-2 border-bca-gold/50 shadow-lg">
                          <span className="text-bca-gold font-bold text-sm">
                            {testimonial.studentName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-white font-semibold text-xs group-hover:text-bca-gold transition-colors duration-300">
                        {testimonial.studentName}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, idx) => (
                          <span
                            key={idx}
                            className={`text-xs ${
                              idx < testimonial.rating
                                ? "text-bca-gold"
                                : "text-bca-gray-600"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-bca-gray-400 text-xs ml-1">
                          ({testimonial.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-0 top-0 text-bca-gold/20 text-2xl font-serif leading-none">
                      "
                    </div>
                    <div className="text-white/80 italic pl-3 pr-2 leading-relaxed text-xs">
                      {testimonial.comment}
                    </div>
                    <div className="absolute right-0 bottom-0 text-bca-gold/20 text-2xl font-serif leading-none">
                      "
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Desktop: Two Columns */}
        <div className="hidden md:grid grid-cols-2 gap-6 h-full">
          {/* First Column - Slides Up */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ 
                y: [0, -(firstColumn.length * 180), 0] 
              }}
              transition={{ 
                duration: firstColumn.length * 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...firstColumn, ...firstColumn, ...firstColumn].map((testimonial, index) => (
                <motion.div
                  key={`first-${testimonial.id}-${index}`}
                  className="group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-bca-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02] flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bca-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.studentImage ? (
                        <div className="relative">
                          <img
                            src={testimonial.studentImage}
                            alt={testimonial.studentName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-bca-gold/50 shadow-lg"
                          />
                          <div className="absolute -inset-1 bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bca-gray-700 to-bca-gray-600 flex items-center justify-center border-2 border-bca-gold/50 shadow-lg">
                            <span className="text-bca-gold font-bold text-lg">
                              {testimonial.studentName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm group-hover:text-bca-gold transition-colors duration-300">
                          {testimonial.studentName}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, idx) => (
                            <span
                              key={idx}
                              className={`text-sm ${
                                idx < testimonial.rating
                                  ? "text-bca-gold"
                                  : "text-bca-gray-600"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-bca-gray-400 text-xs ml-1">
                            ({testimonial.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 text-bca-gold/20 text-3xl font-serif leading-none">
                        "
                      </div>
                      <div className="text-white/80 italic pl-4 pr-2 leading-relaxed text-sm">
                        {testimonial.comment}
                      </div>
                      <div className="absolute right-0 bottom-0 text-bca-gold/20 text-3xl font-serif leading-none">
                        "
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Column - Slides Down */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ 
                y: [-(secondColumn.length * 180), 0, -(secondColumn.length * 180)] 
              }}
              transition={{ 
                duration: secondColumn.length * 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...secondColumn, ...secondColumn, ...secondColumn].map((testimonial, index) => (
                <motion.div
                  key={`second-${testimonial.id}-${index}`}
                  className="group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-bca-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02] flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bca-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.studentImage ? (
                        <div className="relative">
                          <img
                            src={testimonial.studentImage}
                            alt={testimonial.studentName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-bca-gold/50 shadow-lg"
                          />
                          <div className="absolute -inset-1 bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bca-gray-700 to-bca-gray-600 flex items-center justify-center border-2 border-bca-gold/50 shadow-lg">
                            <span className="text-bca-gold font-bold text-lg">
                              {testimonial.studentName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm group-hover:text-bca-gold transition-colors duration-300">
                          {testimonial.studentName}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, idx) => (
                            <span
                              key={idx}
                              className={`text-sm ${
                                idx < testimonial.rating
                                  ? "text-bca-gold"
                                  : "text-bca-gray-600"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-bca-gray-400 text-xs ml-1">
                            ({testimonial.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 text-bca-gold/20 text-3xl font-serif leading-none">
                        "
                      </div>
                      <div className="text-white/80 italic pl-4 pr-2 leading-relaxed text-sm">
                        {testimonial.comment}
                      </div>
                      <div className="absolute right-0 bottom-0 text-bca-gold/20 text-3xl font-serif leading-none">
                        "
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
