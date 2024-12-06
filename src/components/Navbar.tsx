import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/funds', label: 'Browse Funds' },
    { path: '/about', label: 'About Us' },
  ];

  const isHomePage = location.pathname === '/';
  const shouldUseTransparentBg = isHomePage && !isScrolled && !isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldUseTransparentBg 
          ? 'bg-transparent' 
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">VF</span>
            </motion.div>
            <span className={`text-xl font-bold ${
              shouldUseTransparentBg ? 'text-white' : 'text-gray-900'
            }`}>
              VolunteerFund
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  shouldUseTransparentBg 
                    ? 'text-white/90 hover:text-white' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      shouldUseTransparentBg ? 'bg-white' : 'bg-primary-500'
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/register"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                shouldUseTransparentBg
                  ? 'bg-white text-primary-600 hover:bg-white/90'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Start Fundraising
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className={`w-6 h-6 ${shouldUseTransparentBg ? 'text-white' : 'text-gray-900'}`} />
            ) : (
              <Bars3Icon className={`w-6 h-6 ${shouldUseTransparentBg ? 'text-white' : 'text-gray-900'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Start Fundraising
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}