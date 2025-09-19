import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bca-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-bca-gold mb-4">Privacy Policy</h1>
            <p className="text-bca-gray-400">Last updated: December 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                enroll in courses, make payments, or contact us for support. This may include your name, 
                email address, phone number, payment information, and course preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, 
                process payments, send you course materials and updates, respond to your inquiries, 
                and communicate with you about our courses and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy. We may share your information 
                with service providers who assist us in operating our website and conducting our business.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                You have the right to access, update, or delete your personal information. You may also 
                opt out of certain communications from us. To exercise these rights, please contact us 
                using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: info@bengalcodingacademy.com
                <br />
                Trade License: 0917P326725257617
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
