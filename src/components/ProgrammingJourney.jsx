import React from "react";

const ProgrammingJourney = () => {
  const journeySteps = [
    {
      id: 1,
      title: "Basic Programming",
      titleBengali: "বেসিক প্রোগ্রামিং",
      description:
        "ভ্যারিয়েবল, কন্ডিশন, লুপ, ফাংশন, অ্যারে, স্ট্রিং, পয়েন্টার এবং C প্রোগ্রামিং ব্যবহার করে সমস্যা সমাধান শিখুন।",
      icon: (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      id: 2,
      title: "Data Structures",
      titleBengali: "ডেটা স্ট্রাকচার",
      description:
        "স্ট্যাক, কিউ, প্রায়োরিটি কিউ, সার্কুলার কিউ, লিংকড লিস্ট, ডাবলি লিংকড লিস্ট, হিপ, হ্যাশ এবং বেসিক থেকে অ্যাডভান্সড ডেটা স্ট্রাকচার।",
      icon: (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30",
    },
    {
      id: 3,
      title: "Algorithms",
      titleBengali: "অ্যালগরিদম",
      description:
        "বাইনারি সার্চ, লিনিয়ার সার্চ, বাবল সর্ট, মার্জ সর্ট, কুইক সর্ট অ্যালগরিদম, প্রিমস, ক্রুস্কাল, ডিজক্সট্রা, ডাইনামিক প্রোগ্রামিং, বেলম্যান-ফোর্ড এবং অন্যান্য অ্যাডভান্সড টপিক।",
      icon: (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
      ),
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      id: 4,
      title: "Competitive Programming",
      titleBengali: "কম্পিটিটিভ প্রোগ্রামিং",
      description:
        "বেসিক প্রোগ্রামিং থেকে অ্যালগরিদম, ৩০০-৪০০ সমস্যা সমাধান, সিলেকশন কনটেস্টে যোগদান, আরও সমস্যা সমাধান এবং CodeChef, Codeforces এর মতো অনলাইন জাজে অংশগ্রহণ করে ২-স্টার, ৩-স্টার, পুপিল এবং স্পেশালিস্ট কোডার স্ট্যাটাস অর্জন।",
      icon: (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      id: 5,
      title: "Python & Database",
      titleBengali: "পাইথন ও ডেটাবেস",
      description:
        "পাইথন বেসিক থেকে অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং, পাইথন দিয়ে ছোট প্রজেক্ট, ডেটাবেসের সাথে প্রজেক্ট কানেক্ট করা এবং ডেটাবেসের সম্পূর্ণ বোঝাপড়া।",
      icon: (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      id: 6,
      title: "Software Development Project (Django)",
      titleBengali: "সফটওয়্যার ডেভেলপমেন্ট প্রজেক্ট (Django)",
      description:
        "ব্যাকএন্ড ডেভেলপমেন্ট শেখা, কিছু ফ্রন্টএন্ড ডেভেলপমেন্ট, Django বেসিক থেকে REST API তৈরি, ৩-৪টি ছোট থেকে বড় প্রজেক্ট সম্পূর্ণ করা এবং স্বাধীনভাবে ওয়েব অ্যাপ্লিকেশন তৈরি করতে সক্ষম হওয়া।",
      icon: (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
          <span className="text-xl sm:text-2xl">🔥</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Complete Journey to Becoming a Programmer
          </h2>
        </div>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
        <p className="text-white/70 text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto">
          একটি স্ট্রাকচার্ড লার্নিং পাথ যা আপনাকে ৬ মাসে জব-রেডি প্রোগ্রামার বানাবে
        </p>
      </div>

      {/* Journey Steps */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 sm:left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-teal-500 via-yellow-500 via-red-500 via-purple-500 to-green-500 opacity-30"></div>

        <div className="space-y-8">
          {journeySteps.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
            >
              {/* Step Icon */}
              <div
                className={`relative z-10 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg border-2 border-white/20`}
              >
                <div className="text-white">{step.icon}</div>
                <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-bca-gold rounded-full flex items-center justify-center text-black text-[10px] sm:text-xs font-bold">
                  {step.id}
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`flex-1 ${step.bgColor} ${step.borderColor} border rounded-2xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              >
                {/* Title + Progress row */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-bca-gold to-bca-cyan flex items-center justify-center">
                    <span className="text-black font-bold text-[10px] sm:text-sm">
                      {Math.round((step.id / journeySteps.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Bengali title */}
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-bca-cyan mb-2 sm:mb-3">
                  {step.titleBengali}
                </h4>

                {/* Description */}
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-2">
                  {step.description}
                </p>

                {/* Step number */}
                <span className="text-[10px] sm:text-xs text-white/60 font-medium">
                  Step {step.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-bca-gold/20 to-bca-cyan/20 border border-bca-gold/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-white/80 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 max-w-2xl mx-auto">
              Join our comprehensive programming course and become a job-ready developer in just 6 months.
              Start with the basics and progress through all these stages with expert guidance.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("courses");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-bca-gold to-bca-cyan text-black font-bold rounded-xl hover:from-bca-gold/90 hover:to-bca-cyan/90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Start Learning Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammingJourney;
