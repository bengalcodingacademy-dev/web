import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-bca-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl border border-bca-gray-700/50 p-8">
          <h1 className="text-3xl font-bold text-bca-gold mb-8">Terms & Conditions</h1>
          
          <div className="space-y-6 text-bca-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Bengal Coding Academy's services, you accept and agree to be bound 
                by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Course Enrollment</h2>
              <p className="leading-relaxed">
                Course enrollment is subject to availability and payment of applicable fees. 
                We reserve the right to modify course content, schedules, or instructors as needed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Payment Terms</h2>
              <p className="leading-relaxed">
                All payments must be made in advance. We accept various payment methods including 
                UPI, credit/debit cards, and bank transfers. Payment confirmation is required before 
                course access is granted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All course materials, including videos, documents, and code examples, are proprietary 
                to Bengal Coding Academy and are protected by copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Student Conduct</h2>
              <p className="leading-relaxed">
                Students are expected to maintain professional conduct during classes and interactions. 
                Any form of harassment, plagiarism, or disruptive behavior may result in immediate 
                termination of enrollment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Bengal Coding Academy shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Contact Information</h2>
              <p className="leading-relaxed">
                For questions regarding these terms, please contact us at 
                <a href="mailto:legal@bengalcodingacademy.com" className="text-bca-cyan hover:text-bca-gold transition-colors">
                  legal@bengalcodingacademy.com
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

export default TermsConditions;
