import { createContext, useContext, useEffect, useState } from "react";
import { onLogout, api, setInitialCheckComplete } from "./api";

const AuthContext = createContext(null);

function isPublicPage() {
  const pathname = window.location.pathname;
  return (
    pathname === "/" ||
    pathname === "/batches" ||
    pathname === "/webinars" ||
    pathname === "/announcements" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/my-privacy-policy" ||
    pathname === "/terms-conditions" ||
    pathname === "/cancellation-refund" ||
    pathname === "/shipping-delivery" ||
    pathname.startsWith("/course/") // course details public
  );
}

export function AuthProvider({ children, navigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, [navigate]);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/me/summary");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
      setInitialCheckComplete();

      // Setup global logout handler
      onLogout((message) => {
        setUser(null);

        // Redirect only if it’s an auth error & NOT on a public page
        if (message && !isPublicPage()) {
          navigate("/login");
          alert(message);
        }
        // Explicit logout (manual) will redirect in logout() below
      });
    }
  };

  function login({ expiresInSec, user }) {
    setUser(user);
    // cookies handle tokens
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // ignore errors
    }

    // Clear local/session storage
    localStorage.clear();
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    const cookiesToClear = [
      "accessToken",
      "refreshToken",
      "token",
      "authToken",
      "sessionToken",
      "access_key",
      "refresh_key",
      "auth_key",
      "session_key",
    ];

    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });

    // Reset state
    setUser(null);

    // Go home
    navigate("/");
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
