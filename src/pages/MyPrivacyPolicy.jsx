import React from "react";

const MyPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-bca-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl border border-bca-gray-700/50 p-8">
          <h1 className="text-3xl font-bold text-bca-gold mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-bca-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed">
                We collect information you provide directly to us, such as when
                you create an account, enroll in courses, make payments, or
                contact us for support. This may include your name, email
                address, phone number, payment information, and course
                preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We use the information we collect to provide, maintain, and
                improve our services, process payments, send you technical
                notices and support messages, and communicate with you about
                courses, promotions, and other news.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Information Sharing
              </h2>
              <p className="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Data Security
              </h2>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at
                <a
                  href="mailto:bengalcodingacademy@gmail.com"
                  className="text-bca-cyan hover:text-bca-gold transition-colors"
                >
                  bengalcodingacademy@gmail.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-bca-gray-700/50">
            <p className="text-bca-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPrivacyPolicy;
