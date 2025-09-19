import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bca-gray-900 border-t border-bca-gray-700/50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/bca-logo.jpg" alt="BCA" className="h-8 w-8 rounded" />
              <span className="text-xl font-bold text-white">Bengal Coding Academy</span>
            </div>
            <p className="text-bca-gray-400 text-sm leading-relaxed">
              Empowering students with industry-relevant coding skills and preparing them for successful careers in technology.
            </p>
            <div className="text-bca-gray-500 text-xs">
              Trade License: 0917P326725257617
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/batches" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/webinars" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Webinars
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Announcements
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Cancellation and Refund
                </Link>
              </li>
              <li>
                <Link to="/shipping-delivery" className="text-bca-gray-400 hover:text-bca-gold transition-colors text-sm">
                  Shipping and Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-sm text-bca-gray-400">
              <p>Bengal Coding Academy</p>
              <p>Kolkata, West Bengal</p>
              <p>India</p>
              <p className="text-bca-gold">info@bengalcodingacademy.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bca-gray-700/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-bca-gray-500 text-sm">
              © 2024 Bengal Coding Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-bca-gray-500">
              <span>Trade License: 0917P326725257617</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
