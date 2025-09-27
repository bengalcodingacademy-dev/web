import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./lib/authContext";
import { ErrorProvider, ErrorNotifications } from "./contexts/ErrorContext";
import Layout from "./components/Layout";
import LoadingAnimation from "./components/LoadingAnimation";
import ErrorBoundary from "./components/ErrorBoundary";
import Shimmer from "./components/Shimmer";
import VisitorTracker from "./components/VisitorTracker";
import DurgaPujoWish from "./components/DurgaPujoWish";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserDashboard";
import Batches from "./pages/Batches";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Purchases from "./pages/Purchases";
import CourseAccess from "./pages/CourseAccess";
import MonthContent from "./pages/MonthContent";
import Webinars from "./pages/Webinars";
import Announcements from "./pages/Announcements";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TermsConditions from "./pages/TermsConditions";
import CancellationRefund from "./pages/CancellationRefund";
import ShippingDelivery from "./pages/ShippingDelivery";
import MyPrivacyPolicy from "./pages/MyPrivacyPolicy";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <Shimmer type="text" height="60px" width="200px" className="mx-auto" />
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
}

function RedirectToLanding({ hash }) {
  return <Navigate to={`/${hash}`} replace />;
}

export default function App() {
  const navigate = useNavigate();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  // Show animation only on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");

    if (hasVisited) {
      setShowLoadingAnimation(false);
    } else {
      localStorage.setItem("visited", "true");
      setShowLoadingAnimation(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowLoadingAnimation(false);
  };

  // Optional: allow replay from anywhere
  window.replayBCAAnimation = () => {
    setShowLoadingAnimation(true);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <ErrorProvider>
      <ErrorBoundary>
        <AuthProvider navigate={navigate}>
      {/* Neon Background Effects */}
      <div className="neon-orb neon-orb-1"></div>
      <div className="neon-orb neon-orb-2"></div>
      <div className="neon-orb neon-orb-3"></div>
      <div className="neon-grid"></div>
      
      {/* Moving Neon Lines */}
      <div className="neon-line neon-line-1"></div>
      <div className="neon-line neon-line-2"></div>
      <div className="neon-line neon-line-3"></div>
      
      {/* Floating Particles */}
      <div className="neon-particle neon-particle-1"></div>
      <div className="neon-particle neon-particle-2"></div>
      <div className="neon-particle neon-particle-3"></div>
      <div className="neon-particle neon-particle-4"></div>
      
      {showLoadingAnimation ? (
        <LoadingAnimation
          key={animationKey}
          onComplete={handleAnimationComplete}
        />
      ) : (
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/my-privacy-policy" element={<MyPrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route
              path="/cancellation-refund"
              element={<CancellationRefund />}
            />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <UserDashboard />
                </Protected>
              }
            />
            <Route
              path="/batches"
              element={
                <Protected>
                  <Batches />
                </Protected>
              }
            />
            <Route path="/course/:slug" element={<CourseDetail />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/purchases"
              element={
                <Protected>
                  <Purchases />
                </Protected>
              }
            />
            <Route
              path="/course/:courseId/access"
              element={
                <Protected>
                  <CourseAccess />
                </Protected>
              }
            />
            <Route
              path="/course/:courseId/month/:monthNumber"
              element={
                <Protected>
                  <MonthContent />
                </Protected>
              }
            />
            <Route
              path="/webinars"
              element={
                <Protected>
                  <Webinars />
                </Protected>
              }
            />
            <Route
              path="/announcements"
              element={
                <Protected>
                  <Announcements />
                </Protected>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      )}
        </AuthProvider>
        <ErrorNotifications />
        <VisitorTracker />
      </ErrorBoundary>
    </ErrorProvider>
  );
}
