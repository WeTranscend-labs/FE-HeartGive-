import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { FundDetailsPage } from './pages/FundDetailsPage';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="top-right" />
        <Navbar />
        <div className="h-20">
          {/* Spacer for fixed navbar */}
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/funds" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/fund/:id" element={<FundDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;