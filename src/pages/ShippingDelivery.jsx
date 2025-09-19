import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-bca-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl border border-bca-gray-700/50 p-8">
          <h1 className="text-3xl font-bold text-bca-gold mb-8">
            Shipping & Delivery Policy
          </h1>

          <div className="space-y-6 text-bca-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Digital Course Access
              </h2>
              <p className="leading-relaxed">
                All our courses are delivered digitally through our online
                learning platform. Upon successful payment confirmation, you
                will receive immediate access to your enrolled course materials
                and resources.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Access Delivery Timeline
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Immediate access for one-time payment courses</li>
                <li>Monthly access for subscription-based courses</li>
                <li>Email confirmation sent within 2 hours of payment</li>
                <li>Account activation within 24 hours maximum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Course Materials
              </h2>
              <p className="leading-relaxed">
                Course materials including videos, documents, code files, and
                assignments are available for download and streaming through our
                secure platform. All materials are accessible 24/7 once
                enrolled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Live Sessions
              </h2>
              <p className="leading-relaxed">
                Live coding sessions, webinars, and Q&A sessions are scheduled
                and delivered through our integrated video conferencing
                platform. Session links and schedules are provided in advance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Technical Requirements
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Stable internet connection (minimum 2 Mbps)</li>
                <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Computer or mobile device with audio/video capabilities</li>
                <li>Code editor (VS Code recommended)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Support & Assistance
              </h2>
              <p className="leading-relaxed">
                Our technical support team is available to help with any access
                issues or technical difficulties. Contact us at
                <a
                  href="mailto:bengalcodingacademy@gmail.com"
                  className="text-bca-cyan hover:text-bca-gold transition-colors"
                >
                  bengalcodingacademy@gmail.com
                </a>{" "}
                for immediate assistance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Certificate Delivery
              </h2>
              <p className="leading-relaxed">
                Course completion certificates are delivered digitally via email
                within 7 days of course completion. Physical certificates can be
                requested for an additional fee.
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

export default ShippingDelivery;
