import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/authContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import UserDashboard from './pages/UserDashboard';
import Batches from './pages/Batches';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Purchases from './pages/Purchases';
import CourseAccess from './pages/CourseAccess';
import Webinars from './pages/Webinars';
import Announcements from './pages/Announcements';
import Actions from './pages/Actions';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-bca-black flex items-center justify-center">
        <div className="text-bca-gold text-xl">Loading...</div>
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
  return (
    <AuthProvider navigate={navigate}>
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
          <Route path="/actions" element={<Protected><Actions /></Protected>} />
          <Route path="/webinars" element={<Protected><Webinars /></Protected>} />
          <Route path="/announcements" element={<Protected><Announcements /></Protected>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
