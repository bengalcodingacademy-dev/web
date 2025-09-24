import React, { useState } from "react";

const ExpertFaculty = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const facultyMember = {
    id: 1,
    name: "Sauvik Chatterjee",
    nameBengali: "সৌভিক চ্যাটার্জী",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    bioShort:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    expertise: "Subject Matter Expert, Placement Trainer, Corporate Trainer",
    experience: "4+ Years",
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            আমাদের এক্সপার্ট ফ্যাকাল্টি
          </h2>
          <span className="text-2xl">🔥</span>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
        <p className="text-white/70 text-sm md:text-base mt-4 max-w-3xl mx-auto">
          আনলিমিটেড হেল্প, গাইডলাইন; এমনকি গুগল মিট এ স্ক্রিনশেয়ার করে সমস্যা
          সমাধান করতে চাইলে; এই কোর্সে জয়েন করো।
        </p>
      </div>

      {/* Faculty Card - Larger Image Design */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-bca-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02] overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-bca-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 flex items-center">
              {/* Floating Image Section */}
              <div className="relative w-72 h-72 flex-shrink-0 ml-12 p-4">
                <img
                  src="/me.jpeg"
                  alt={facultyMember.name}
                  className="w-full h-full object-cover object-top rounded-2xl shadow-2xl"
                />
                {/* Floating effect shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 flex flex-col justify-center min-h-64">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-bca-gold transition-colors duration-300">
                    {facultyMember.name}
                  </h3>
                  <h4 className="text-bca-cyan font-medium text-lg mb-4">
                    {facultyMember.nameBengali}
                  </h4>
                  <div
                    className={`text-white/80 text-base leading-relaxed ${
                      !isExpanded ? "line-clamp-8" : ""
                    } mb-6`}
                  >
                    {isExpanded ? facultyMember.bio : facultyMember.bioShort}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-bca-gold font-bold text-lg">
                        {facultyMember.expertise.split(",")[0]}
                      </span>
                      <span className="text-white/70 text-sm bg-white/10 px-3 py-1 rounded-full">
                        {facultyMember.experience}
                      </span>
                    </div>

                    {/* Course type indicator */}
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-bca-gold rounded-full animate-pulse"></div>
                      <span className="text-bca-gold text-sm font-medium">
                        SME
                      </span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="flex items-center justify-start">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-bca-cyan hover:text-bca-gold text-base font-medium underline transition-colors duration-200"
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
