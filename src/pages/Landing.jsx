import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../lib/api";
import { CourseCard } from "./components/CourseCard";
import Shimmer from "../components/Shimmer";
import TypewriterText from "../components/TypewriterText";
import YouTubeSlideshow from "../components/YouTubeSlideshow";
import TestimonialSlideshow from "../components/TestimonialSlideshow";

const faqs = [
  {
    q: "আমি কীভাবে পেমেন্ট করব?",
    a: 'যে কোনো কোর্সে "Buy Now" ক্লিক করুন, Razorpay এর মাধ্যমে নিরাপদে পেমেন্ট করুন। UPI, কার্ড, নেট ব্যাংকিং সব মাধ্যমেই পেমেন্ট করতে পারবেন।',
  },
  {
    q: "কোর্স করার জন্য আগে থেকে অভিজ্ঞতা দরকার কি?",
    a: "না। আমাদের ব্যাচ একেবারে মৌলিক বিষয় থেকে শুরু হয় এবং ধীরে ধীরে অ্যাডভান্সড টপিকে যায়।",
  },
  {
    q: "ক্লাস রেকর্ডিং কি পাব?",
    a: "হ্যাঁ। প্রতিটি সেশনের রেকর্ডিং এবং প্রয়োজনীয় স্টাডি মেটেরিয়াল শিক্ষার্থীদের জন্য শেয়ার করা হয়।",
  },
  {
    q: "ক্লাসগুলো কীভাবে নেওয়া হয়?",
    a: "আমাদের সব ক্লাস লাইভ অনলাইন মোডে নেওয়া হয় (Zoom/Google Meet এর মাধ্যমে)। প্রয়োজনে ডেমো ক্লাসও পাওয়া যায়।",
  },
  {
    q: "শিক্ষকরা কারা পড়ান?",
    a: "আমাদের ফ্যাকাল্টি হলেন ইন্ডাস্ট্রিতে কাজ করা অভিজ্ঞ সফটওয়্যার ডেভেলপার ও ট্রেইনার, যারা রিয়েল-লাইফ প্রজেক্টের সাথে যুক্ত।",
  },
  {
    q: "কোর্স শেষে কি সার্টিফিকেট পাব?",
    a: "হ্যাঁ। কোর্স সফলভাবে শেষ করার পর প্রতিটি শিক্ষার্থীকে অফিসিয়াল সার্টিফিকেট প্রদান করা হয়।",
  },
];

const features = [
  {
    icon: "▶",
    title: "প্রত্‌টেকটা কোর্সে ২০০+ ভিডিওস",
    body: "বেসিক থেকে অ্যাডভান্সড, তারপর প্রো পর্যন্ত ওয়ার্ল্ডক্লাস লেসন, সাথে অনেক প্রজেক্ট।",
  },
  {
    icon: "💡",
    title: "১০+ প্রজেক্ট (তাতেই বা থেমে থাকবেন কেনো?)",
    body: "কোডিং, কোডিং আর কোডিং প্রচুর কোডিং",
  },
  {
    icon: "</>",
    title: "নিয়মিত অ্যাসাইনমেন্ট",
    body: "প্রতিটি টপিক শেষে অ্যাসাইনমেন্ট আর ফিডব্যাক, যাতে টপিকগুলো ভালোভাবে মনে থাকে",
  },
];

export default function Landing() {
  const [courses, setCourses] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAnimationComplete, setLoadingAnimationComplete] =
    useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [coursesRes, webinarsRes] = await Promise.all([
          api.get("/courses"),
          api.get("/webinars"),
        ]);
        setCourses(coursesRes.data);
        setWebinars(webinarsRes.data);
      } catch (error) {
        console.error("Error loading landing data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle scroll to section based on URL hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location.hash]);

  // Start typewriter animation after loading animation completes
  useEffect(() => {
    // Check if we're on the landing page and loading animation should be complete
    const timer = setTimeout(() => {
      setLoadingAnimationComplete(true);
    }, 4000); // 3 seconds for loading animation + 1 second buffer

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#17002a] to-black" />
        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-20 grid md:grid-cols-2 items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="mb-4 md:mb-6">
              <img
                src="/bca_illustration.gif"
                alt="BCA Illustration"
                className="h-16 w-16 md:h-24 md:w-24 rounded shadow-[0_0_50px_10px_#00a1ff] mx-auto md:mx-0 object-cover"
                style={{
                  filter: "brightness(1.1) contrast(1.1)",
                }}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white">
              <div className="max-w-full">
                <TypewriterText
                  text="Become a job-ready developer in 6 months"
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={2000}
                  shouldStart={loadingAnimationComplete}
                  loop={true}
                  className="text-white w-full"
                />
              </div>
            </h1>
            <p className="mt-3 md:mt-4 text-white/80 max-w-2xl mx-auto md:mx-0 text-sm md:text-base">
              বাংলায় কাটিং এজ টেকনোলজি শিখুন আর ওয়ার্ল্ড ক্লাস প্রজেক্ট তৈরি
              করুন
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={() => {
                  const element = document.getElementById("courses");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="px-4 md:px-5 py-2 md:py-3 rounded-xl bg-[#fdb000] text-black shadow-[0_0_40px_#fdb000] text-sm md:text-base text-center hover:bg-[#fdb000]/90 transition-colors"
              >
                Explore Batches
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("webinars");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="px-4 md:px-5 py-2 md:py-3 rounded-xl border border-white/20 text-white text-sm md:text-base text-center hover:border-white/40 hover:bg-white/5 transition-all"
              >
                Free Webinars
              </button>
            </div>
          </div>
          <div className="flex justify-center order-first md:order-last">
            <img
              src="/illustrator.png"
              alt="learn"
              className="max-w-xs sm:max-w-sm w-full drop-shadow-[0_0_40px_#00a1ff]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 md:p-6 border border-white/10 bg-gradient-to-br from-[#1a0b2e] to-[#0b0b0b]"
          >
            <div className="text-xl md:text-2xl mb-2 md:mb-3">{f.icon}</div>
            <div
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: "#00a1ff" }}
            >
              {f.title}
            </div>
            <div className="text-white/80 text-xs md:text-sm">{f.body}</div>
          </div>
        ))}
      </section>

      <section id="courses" className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Featured Courses
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
          <p className="text-white/70 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Choose from our carefully curated courses designed to make you
            job-ready in 6 months
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <Shimmer type="card" count={3} />
          ) : (
            courses.slice(0, 3).map((c) => <CourseCard key={c.id} c={c} />)
          )}
        </div>
      </section>

      {/* Upcoming Webinars Section */}
      <section id="webinars" className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
          Upcoming Webinars
        </h2>
        {webinars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {webinars.slice(0, 3).map((webinar, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 p-4 md:p-6 bg-gradient-to-br from-[#1a0b2e] to-[#0b0b0b]"
                >
                  {webinar.imageUrl && (
                    <img
                      src={webinar.imageUrl}
                      alt={webinar.title}
                      className="w-full h-32 md:h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div
                    className="text-lg md:text-xl font-semibold mb-2"
                    style={{ color: "#00a1ff" }}
                  >
                    {webinar.title}
                  </div>
                  {webinar.description && (
                    <div className="text-white/80 text-sm md:text-base mb-3">
                      {webinar.description}
                    </div>
                  )}
                  <div className="text-bca-cyan text-sm mb-2">
                    📅{" "}
                    {new Date(webinar.startTime).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {webinar.presenter && (
                    <div className="text-bca-gray-400 text-sm mb-3">
                      👨‍🏫 {webinar.presenter}
                    </div>
                  )}
                  {webinar.joinLink && (
                    <a
                      href={webinar.joinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-bca-gold text-black rounded-lg hover:bg-bca-gold/80 transition-colors text-sm font-medium"
                    >
                      Join Webinar
                    </a>
                  )}
                </div>
              ))}
            </div>
            {webinars.length > 3 && (
              <div className="text-center mt-6">
                <a
                  href="#webinars"
                  className="text-bca-cyan hover:text-bca-gold transition-colors"
                >
                  View All Webinars →
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-bca-gray-400 text-lg mb-4">
              No upcoming webinars at the moment
            </div>
            <div className="text-bca-gray-500 text-sm">
              Check back soon for exciting webinars!
            </div>
          </div>
        )}
      </section>

      <YouTubeSlideshow />

      <TestimonialSlideshow />

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bca-gold to-bca-cyan mx-auto rounded-full"></div>
          <p className="text-white/70 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our courses and learning
            process
          </p>
        </div>
        <div className="grid gap-2 md:gap-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="rounded-xl border border-white/10 p-3 md:p-4"
            >
              <summary className="cursor-pointer select-none text-white text-sm md:text-base">
                {f.q}
              </summary>
              <div className="text-white/70 mt-2 text-xs md:text-sm">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
