import React from "react";

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-bca-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl border border-bca-gray-700/50 p-8">
          <h1 className="text-3xl font-bold text-bca-gold mb-8">
            Cancellation & Refund Policy
          </h1>

          <div className="space-y-6 text-bca-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Cancellation Policy
              </h2>
              <p className="leading-relaxed">
                You may cancel your course enrollment within 7 days of payment
                for a full refund. Cancellation requests must be submitted in
                writing to our support team.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Refund Eligibility
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Full refund within 7 days of payment (before course start
                  date)
                </li>
                <li>
                  50% refund within 14 days of course start (if less than 25%
                  content accessed)
                </li>
                <li>
                  No refund after 14 days or if more than 25% content has been
                  accessed
                </li>
                <li>Refunds processed within 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Monthly Payment Courses
              </h2>
              <p className="leading-relaxed">
                For monthly payment courses, you can cancel your subscription at
                any time. Cancellation will take effect at the end of your
                current billing period. No refunds for partial months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Refund Process
              </h2>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Submit cancellation request via email or support portal</li>
                <li>Provide reason for cancellation</li>
                <li>Wait for approval (usually within 24-48 hours)</li>
                <li>Refund will be processed to original payment method</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Non-Refundable Items
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Certificates and completion badges</li>
                <li>Downloaded course materials</li>
                <li>One-on-one mentoring sessions (if used)</li>
                <li>Live project assistance (if utilized)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Contact for Refunds
              </h2>
              <p className="leading-relaxed">
                For refund requests, please contact us at
                <a
                  href="mailto:refunds@bengalcodingacademy.com"
                  className="text-bca-cyan hover:text-bca-gold transition-colors"
                >
                  refunds@bengalcodingacademy.com
                </a>{" "}
                or call us at +91 7001798010.
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

export default CancellationRefund;
