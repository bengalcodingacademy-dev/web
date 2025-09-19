import { motion } from 'framer-motion';

export default function TermsAndConditions() {
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
            <h1 className="text-4xl font-bold text-bca-gold mb-4">Terms and Conditions</h1>
            <p className="text-bca-gray-400">Last updated: December 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                By accessing and using Bengal Coding Academy's services, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Course Enrollment</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Course enrollment is subject to availability and payment of applicable fees. We reserve 
                the right to modify course content, schedules, and instructors at any time. Students 
                are expected to maintain regular attendance and complete assignments as required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Payment Terms</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                All course fees must be paid in advance or according to the agreed payment schedule. 
                Payment can be made through UPI, bank transfer, or other approved methods. Late payments 
                may result in suspension of course access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                All course materials, including videos, documents, and resources, are the intellectual 
                property of Bengal Coding Academy. Students may not distribute, copy, or share these 
                materials without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Student Conduct</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Students are expected to maintain professional behavior and respect fellow students and 
                instructors. Any form of harassment, plagiarism, or disruptive behavior may result in 
                immediate termination of enrollment without refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Bengal Coding Academy shall not be liable for any indirect, incidental, special, or 
                consequential damages resulting from the use or inability to use our services, even if 
                we have been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                For questions regarding these Terms and Conditions, please contact us at:
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
