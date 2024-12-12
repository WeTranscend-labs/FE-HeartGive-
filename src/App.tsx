import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { FundDetailsPage } from './pages/FundDetailsPage';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import ContextProvider from './contexts';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Toaster/>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/funds" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/fund/:id" element={<FundDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ContextProvider>
  );
}

export default App;
