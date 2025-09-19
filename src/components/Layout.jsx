import { Link } from 'react-router-dom';
import { useAuth } from '../lib/authContext';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import Footer from './Footer';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const replayAnimation = () => {
    if (window.replayBCAAnimation) {
      window.replayBCAAnimation();
    }
  };

  // Load unread announcement count
  useEffect(() => {
    if (user) {
      const loadUnreadCount = async () => {
        try {
          const response = await api.get('/announcements/me/unread-count');
          setUnreadCount(response.data.count);
        } catch (error) {
          console.error('Error loading unread count:', error);
        }
      };
      loadUnreadCount();
      
      // Refresh unread count every 30 seconds
      const interval = setInterval(loadUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-bca-black text-white">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 md:gap-3 font-bold text-sm md:text-xl tracking-wide">
              <img src="/bca-logo.jpg" alt="BCA" className="h-6 w-6 md:h-8 md:w-8 rounded" />
              <span>Bengal Coding Academy</span>
            </Link>
            
            {/* Replay Animation Button */}
            <button
              onClick={replayAnimation}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-bca-cyan/10 border border-bca-cyan/30 text-bca-cyan hover:bg-bca-cyan/20 hover:border-bca-cyan/50 transition-all duration-300 text-xs"
              title="Replay BCA Animation"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Replay</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {!user ? (
              <>
                <Link to="/#courses" className="hover:text-bca-gold">Available Batches</Link>
                <Link to="/#webinars" className="hover:text-bca-cyan">Webinars</Link>
                <Link to="/login" className="px-3 py-1.5 rounded-xl bg-bca-gold text-black hover:brightness-110">Login</Link>
                <Link to="/register" className="px-3 py-1.5 rounded-xl border border-white/20">Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-bca-gold font-semibold text-bca-gold bg-bca-gold/10 px-3 py-1.5 rounded-lg border border-bca-gold/30">
                  My Dashboard
                </Link>
                <Link to="/announcements" className="hover:text-bca-cyan relative">
                  Announcements
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-bca-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="hover:text-bca-gold">Profile</Link>
                <Link to="/purchases" className="hover:text-bca-gold">Purchases</Link>
                <button onClick={handleLogout} className="px-3 py-1.5 rounded-xl bg-bca-red text-white">Logout</button>
              </>
            )}
          </nav>

          {/* Mobile Navigation - Hamburger Menu */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <Link to="/dashboard" className="px-2 py-1 rounded-lg bg-bca-gold/10 border border-bca-gold/30 text-bca-gold text-xs">
                Dashboard
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1 group"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10">
            <nav className="px-4 py-6 space-y-4">
              {!user ? (
                <>
                  <Link 
                    to="/" 
                    className="block text-white hover:text-bca-gold transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/#courses" 
                    className="block text-white hover:text-bca-gold transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Available Batches
                  </Link>
                  <Link 
                    to="/#webinars" 
                    className="block text-white hover:text-bca-cyan transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Webinars
                  </Link>
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <Link 
                      to="/login" 
                      className="block w-full text-center px-4 py-2 rounded-xl bg-bca-gold text-black hover:brightness-110"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="block w-full text-center px-4 py-2 rounded-xl border border-white/20"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Register
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/announcements" 
                    className="block text-white hover:text-bca-cyan transition-colors py-2 relative"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Announcements
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-bca-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center inline-flex">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block text-white hover:text-bca-gold transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/purchases" 
                    className="block text-white hover:text-bca-gold transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Purchases
                  </Link>
                  <div className="pt-4 border-t border-white/10">
                    <button 
                      onClick={() => {
                        setShowMobileMenu(false);
                        handleLogout();
                      }}
                      className="block w-full text-center px-4 py-2 rounded-xl bg-bca-red text-white"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/60">© {new Date().getFullYear()} Bengal Coding Academy</footer>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-bca-gray-800 rounded-xl p-4 md:p-6 border border-white/10 max-w-md w-full mx-4">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Confirm Logout</h3>
            <p className="text-bca-gray-300 mb-4 md:mb-6 text-sm md:text-base">Are you sure you want to logout? You'll need to login again to access your account.</p>
            <div className="flex gap-2 md:gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 md:px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-3 md:px-4 py-2 rounded-lg bg-bca-red text-white hover:bg-bca-red/80 transition-colors text-sm md:text-base"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
