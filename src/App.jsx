import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/authContext';
import Layout from './components/Layout';
import LoadingAnimation from './components/LoadingAnimation';
import Shimmer from './components/Shimmer';
import Landing from './pages/Landing';
import UserDashboard from './pages/UserDashboard';
import Batches from './pages/Batches';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Purchases from './pages/Purchases';
import CourseAccess from './pages/CourseAccess';
import MonthContent from './pages/MonthContent';
import Webinars from './pages/Webinars';
import Announcements from './pages/Announcements';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CancellationRefund from './pages/CancellationRefund';
import ShippingDelivery from './pages/ShippingDelivery';

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

  // Animation runs every time the app loads (no localStorage check)
  const handleAnimationComplete = () => {
    setShowLoadingAnimation(false);
  };

  // Function to replay animation (can be called from anywhere)
  const replayAnimation = () => {
    setShowLoadingAnimation(true);
    setAnimationKey(prev => prev + 1); // Force remount of animation component
  };

  // Make replayAnimation available globally
  window.replayBCAAnimation = replayAnimation;

  return (
    <AuthProvider navigate={navigate}>
      {showLoadingAnimation && (
        <LoadingAnimation key={animationKey} onComplete={handleAnimationComplete} />
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Protected><UserDashboard /></Protected>} />
          <Route path="/batches" element={<Protected><Batches /></Protected>} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/purchases" element={<Protected><Purchases /></Protected>} />
          <Route path="/course/:courseId/access" element={<Protected><CourseAccess /></Protected>} />
          <Route path="/course/:courseId/month/:monthNumber" element={<Protected><MonthContent /></Protected>} />
          <Route path="/webinars" element={<Protected><Webinars /></Protected>} />
          <Route path="/announcements" element={<Protected><Announcements /></Protected>} />
          {/* Legal Pages - Open Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
