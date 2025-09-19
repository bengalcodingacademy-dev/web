import { motion } from 'framer-motion';

export default function CancellationRefund() {
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
            <h1 className="text-4xl font-bold text-bca-gold mb-4">Cancellation and Refund Policy</h1>
            <p className="text-bca-gray-400">Last updated: December 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Cancellation Policy</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Students may cancel their enrollment before the course start date. Cancellation requests 
                must be submitted in writing via email to info@bengalcodingacademy.com. Cancellations 
                made after the course has started are subject to the refund policy outlined below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Refund Eligibility</h2>
              <div className="space-y-4">
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-bca-gold mb-2">Full Refund (100%)</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Cancellation made 7 days or more before the course start date
                  </p>
                </div>
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-bca-gold mb-2">Partial Refund (75%)</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Cancellation made 3-6 days before the course start date
                  </p>
                </div>
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-bca-gold mb-2">Partial Refund (50%)</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Cancellation made 1-2 days before the course start date
                  </p>
                </div>
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">No Refund</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Cancellation made on or after the course start date
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Refund Process</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Refunds will be processed within 7-14 business days after approval. The refund will be 
                credited to the original payment method used for the transaction. Processing fees, if any, 
                will be deducted from the refund amount.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Special Circumstances</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                In case of medical emergencies or other extenuating circumstances, students may request 
                special consideration for refunds. Such requests will be reviewed on a case-by-case basis 
                and may require supporting documentation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Course Transfer</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Instead of cancellation, students may request to transfer to a different batch or course 
                if available. Transfer requests are subject to availability and may incur additional fees 
                if there's a price difference between courses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact for Refunds</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                For refund requests or questions about this policy, please contact us at:
                <br />
                Email: info@bengalcodingacademy.com
                <br />
                Trade License: 0917P326725257617
                <br />
                <br />
                Please include your enrollment details and reason for cancellation in your request.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
