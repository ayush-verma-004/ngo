import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from './components/ui/Skeleton';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Team = lazy(() => import('./pages/Team'));
const Media = lazy(() => import('./pages/Media'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Donate = lazy(() => import('./pages/Donate'));

// Admin pages
const Login = lazy(() => import('./pages/admin/Login'));
const DashboardLayout = lazy(() => import('./pages/admin/DashboardLayout'));
const ProjectManager = lazy(() => import('./pages/admin/ProjectManager'));
const TeamManager = lazy(() => import('./pages/admin/TeamManager'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const CareerManager = lazy(() => import('./pages/admin/CareerManager'));
const ContentManager = lazy(() => import('./pages/admin/ContentManager'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'));

const PageLoader = () => (
  <div className="min-h-screen flex flex-col p-8 space-y-8 animate-pulse">
    <div className="h-16 bg-neutral-200 rounded-xl w-full" />
    <div className="flex-grow flex gap-8">
      <div className="w-64 bg-neutral-200 rounded-xl hidden md:block" />
      <div className="flex-grow space-y-4">
        <div className="h-96 bg-neutral-200 rounded-2xl w-full" />
        <div className="h-12 bg-neutral-200 rounded-xl w-3/4" />
        <div className="h-12 bg-neutral-200 rounded-xl w-1/2" />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout><Outlet /></MainLayout>}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/team" element={<Team />} />
              <Route path="/media" element={<Media />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <DashboardLayout />
                </Suspense>
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<ProjectManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="careers" element={<CareerManager />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="admins" element={<AdminManagement />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
