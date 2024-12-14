import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import ContextProvider from './contexts';
import WalletModalProvider from './contexts/providers/WalletModalProvider';
import { MainLayout } from './layouts/MainLayout';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const FundDetailsPage = lazy(() => import('./pages/FundDetailsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <WalletModalProvider>
      <TooltipProvider>
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
                </Routes>
              </Suspense>
            </MainLayout>
          </Router>
        </ContextProvider>
      </TooltipProvider>
    </WalletModalProvider>
  );
}

export default App;
