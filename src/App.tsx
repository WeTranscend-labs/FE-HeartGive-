import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Toaster } from './components/ui/toaster';
import ContextProvider from './contexts';

// Loading Component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const FundDetailsPage = lazy(() => import('./pages/FundDetailsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const VerifiedFundPage = lazy(() => import('./pages/VerifiedFundPage'));

function App() {
  return (
    <ContextProvider>
      <Router>
        <Toaster />
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/funds" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/fund/:id" element={<FundDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/verified" element={<VerifiedFundPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </ContextProvider>
  );
}

export default App;
