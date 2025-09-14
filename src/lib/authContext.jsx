import { createContext, useContext, useEffect, useState } from 'react';
import { onLogout, api, setInitialCheckComplete } from './api';

const AuthContext = createContext(null);

function isPublicPage() {
  const pathname = window.location.pathname;
  return pathname === '/' || 
         pathname === '/batches' ||
         pathname === '/webinars' ||
         pathname === '/announcements' ||
         pathname === '/login' ||
         pathname === '/register' ||
         pathname === '/forgot-password' ||
         pathname === '/reset-password' ||
         pathname.startsWith('/course/');
}

export function AuthProvider({ children, navigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status first
    checkAuthStatus();
  }, [navigate]);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/me/summary');
      setUser(response.data);
    } catch (error) {
      // User not authenticated, clear any stale state
      setUser(null);
    } finally {
      setLoading(false);
      setInitialCheckComplete(); // Tell API interceptor that initial check is done
      
      // Set up logout handler AFTER initial check is complete
      onLogout((message) => {
        setUser(null);
        // Only redirect to login if it's an auth error (has message) and not on public pages
        if (message && !isPublicPage()) {
          navigate('/login');
          alert(message);
        }
        // For explicit logout (no message), don't redirect - let the logout function handle it
        // The logout function already redirects to '/' (landing page)
      });
    }
  };

  function login({ expiresInSec, user }) {
    setUser(user);
    // No need to manage token manually, it's in cookies
  }

  async function logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    }
    
    // Clear all possible client-side storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear all cookies that might exist on client side
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Clear cookies for different paths and domains
    const cookiesToClear = [
      'accessToken', 'refreshToken', 'token', 'authToken', 'sessionToken',
      'access_key', 'refresh_key', 'auth_key', 'session_key'
    ];
    
    cookiesToClear.forEach(cookieName => {
      // Clear for current path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      // Clear for root path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      // Clear for parent domain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });
    
    // Reset auth state
    setUser(null);
    
    // Navigate to home page
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
