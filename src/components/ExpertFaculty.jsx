import React, { useState } from "react";

const ExpertFaculty = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const facultyMember = {
    id: 1,
    name: "Sauvik Chatterjee",
    nameBengali: "সৌভিক চ্যাটার্জী",
    bioShort:
      "Sauvik Chatterjee is a passionate coding educator, Subject Matter Expert, and corporate trainer with over 4 years of experience helping students crack coding interviews and build real-world projects.",
    bio: "Sauvik Chatterjee is a dedicated coding educator and corporate trainer with over 4 years of experience in the tech and education industry. He has mentored hundreds of students in backend development, Spring Boot, Node.js, React, and full-stack project building. Apart from technical expertise, he has actively guided learners in placements, career development, and hands-on problem solving through live sessions, personalized mentoring, and screen-sharing support. His teaching philosophy blends practical coding with strong conceptual clarity, ensuring that students not only understand the 'how' but also the 'why' behind software development practices. Having worked with real-world projects and training environments, Sauvik brings industry insights directly into the classroom, bridging the gap between academics and professional software development.",
    expertise: "Subject Matter Expert, Placement Trainer, Corporate Trainer",
    experience: "4+ Years",
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-14">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            আমাদের এক্সপার্ট ফ্যাকাল্টি
          </h2>
          <span className="text-xl sm:text-2xl">🔥</span>
        </div>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
        <p className="text-white/70 text-sm sm:text-base mt-4 max-w-2xl sm:max-w-3xl mx-auto">
          আনলিমিটেড হেল্প, গাইডলাইন; এমনকি গুগল মিট এ স্ক্রিনশেয়ার করে সমস্যা
          সমাধান করতে চাইলে; এই কোর্সে জয়েন করো।
        </p>
      </div>

      {/* Faculty Card */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-bca-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02] overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-bca-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Responsive Layout */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center">
              {/* Image Section */}
              {/* Mobile: full width image with bottom crop */}
              <div className="block lg:hidden relative w-full h-96 sm:h-[28rem] overflow-hidden">
                <img
                  src="https://d270a3f3iqnh9i.cloudfront.net/assets/me.jpeg"
                  alt="Sauvik Chatterjee"
                  className="w-full h-full object-cover object-top rounded-t-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-2xl"></div>
              </div>




              <div className="hidden lg:block relative w-full lg:w-72 xl:w-80 h-72 flex-shrink-0 p-4 lg:pl-8">
                {/* Desktop: fixed size side image */}
                <img
                  src="https://d270a3f3iqnh9i.cloudfront.net/assets/me.jpeg"
                  alt={facultyMember.name}
                  className="w-full h-full object-cover object-top rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
              </div>

              {/* Text Content */}
              <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-bca-gold transition-colors duration-300">
                    {facultyMember.name}
                  </h3>
                  <h4 className="text-bca-cyan font-medium text-base sm:text-lg md:text-xl mb-4">
                    {facultyMember.nameBengali}
                  </h4>
                  <p
                    className={`text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 ${!isExpanded ? "line-clamp-5 sm:line-clamp-6 md:line-clamp-8" : ""
                      }`}
                  >
                    {isExpanded ? facultyMember.bio : facultyMember.bioShort}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <span className="text-bca-gold font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                        {facultyMember.expertise.split(",")[0]}
                      </span>
                      <span className="text-white/70 text-xs sm:text-sm md:text-base bg-white/10 px-3 py-1 rounded-full">
                        {facultyMember.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-bca-gold rounded-full animate-pulse"></div>
                      <span className="text-bca-gold text-xs sm:text-sm md:text-base font-medium">
                        SME
                      </span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-bca-cyan hover:text-bca-gold text-sm sm:text-base md:text-lg font-medium underline transition-colors"
                    >
                      {isExpanded ? "Show Less" : "আরো পড়ুন"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertFaculty;
