import { Link } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import { useAuth } from '../lib/authContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-bca-black text-white">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-wide">
            <img src="/bca-logo.jpg" alt="BCA" className="h-8 w-8 rounded" />
            <span>Bengal Coding Academy</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            {!user && <Link to="/" className="hover:text-bca-gold">Home</Link>}
            <Link to="/batches" className="hover:text-bca-gold">Available Batches</Link>
            <Link to="/webinars" className="hover:text-bca-cyan">Webinars</Link>
            <Link to="/announcements" className="hover:text-bca-cyan">Announcements</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-bca-gold font-semibold text-bca-gold bg-bca-gold/10 px-3 py-1.5 rounded-lg border border-bca-gold/30">
                  My Dashboard
                </Link>
                <Link to="/actions" className="hover:text-bca-gold">Actions</Link>
                <Link to="/profile" className="hover:text-bca-gold">Profile</Link>
                <Link to="/purchases" className="hover:text-bca-gold">Purchases</Link>
                <button onClick={logout} className="px-3 py-1.5 rounded-xl bg-bca-red text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 rounded-xl bg-bca-gold text-black hover:brightness-110">Login</Link>
                <Link to="/register" className="px-3 py-1.5 rounded-xl border border-white/20">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <AnnouncementBar />
      <main>{children}</main>
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/60">© {new Date().getFullYear()} Bengal Coding Academy</footer>
    </div>
  );
}
