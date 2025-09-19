import { motion } from 'framer-motion';

export default function ShippingDelivery() {
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
            <h1 className="text-4xl font-bold text-bca-gold mb-4">Shipping and Delivery Policy</h1>
            <p className="text-bca-gray-400">Last updated: December 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Digital Course Delivery</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Bengal Coding Academy primarily delivers courses through our online platform. Upon successful 
                enrollment and payment, students will receive immediate access to course materials, videos, 
                and resources through their student dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Access Timeline</h2>
              <div className="space-y-4">
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-bca-gold mb-2">Immediate Access</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Course materials and recorded sessions are available immediately after enrollment
                  </p>
                </div>
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-bca-gold mb-2">Live Sessions</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Live classes are scheduled according to the course calendar and communicated in advance
                  </p>
                </div>
                <div className="bg-bca-gray-800/50 p-4 rounded-lg border border-bca-gray-700/50">
                  <h3 className="text-lg font-semibold text-bca-gold mb-2">Recordings</h3>
                  <p className="text-bca-gray-300 text-sm">
                    Session recordings are uploaded within 24-48 hours after each live class
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Physical Materials</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                In cases where physical materials (certificates, study guides, etc.) are provided, they will 
                be shipped to the address provided during enrollment. Shipping times vary by location:
              </p>
              <ul className="list-disc list-inside text-bca-gray-300 mt-4 space-y-2">
                <li>Kolkata and surrounding areas: 2-3 business days</li>
                <li>Other Indian cities: 5-7 business days</li>
                <li>Remote areas: 7-10 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Technical Requirements</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                Students are responsible for ensuring they have the necessary technical requirements to access 
                course materials:
              </p>
              <ul className="list-disc list-inside text-bca-gray-300 mt-4 space-y-2">
                <li>Stable internet connection (minimum 2 Mbps)</li>
                <li>Computer or mobile device with audio/video capabilities</li>
                <li>Updated web browser (Chrome, Firefox, Safari, or Edge)</li>
                <li>Email access for course communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Delivery Issues</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                If you experience any issues accessing course materials or receiving physical items, please 
                contact our support team immediately. We will work to resolve delivery issues within 24-48 hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. International Students</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                International students can access all digital course materials without restrictions. Physical 
                materials may have longer shipping times and additional customs fees that are the responsibility 
                of the student.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
              <p className="text-bca-gray-300 leading-relaxed">
                For questions about course delivery or shipping, please contact us at:
                <br />
                Email: info@bengalcodingacademy.com
                <br />
                Trade License: 0917P326725257617
                <br />
                <br />
                Our support team is available Monday to Friday, 9 AM to 6 PM IST.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
