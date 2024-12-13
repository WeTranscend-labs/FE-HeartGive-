import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import ConnectWallet from './ConnectWallet';

const mainNavItems = [
  { path: '/funds', label: 'Browse Funds' },
  { path: '/about', label: 'About Us' },
];

const resourcesItems = [
  { label: 'Help Center', path: '#' },
  { label: 'Guidelines', path: '#' },
  { label: 'Blog', path: '#' },
  { label: 'FAQs', path: '#' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const shouldUseTransparentBg = isHomePage && !isScrolled && !isMobileMenuOpen;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        shouldUseTransparentBg
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-sm shadow-sm'
      )}
      style={{ minHeight: 'auto' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">VF</span>
            </motion.div>
            <span
              className={cn(
                'text-xl font-bold transition-colors duration-300',
                shouldUseTransparentBg ? 'text-gray-900' : 'text-gray-900'
              )}
            >
              VolunteerFund
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center  space-x-8">
            {mainNavItems.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-300',
                  shouldUseTransparentBg
                    ? 'text-gray-600 hover:text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                )}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={cn(
                      'absolute -bottom-1 left-0 right-0 h-0.5',
                      shouldUseTransparentBg ? 'bg-white' : 'bg-primary-500'
                    )}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium transition-colors duration-300',
                  shouldUseTransparentBg
                    ? 'text-gray-600 hover:text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                )}
              >
                <span>Resources</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border"
                  >
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/register"
              className={cn(
                'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                shouldUseTransparentBg
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              )}
            >
              Start Fundraising
            </Link>
            <ConnectWallet />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon
                className={cn(
                  'w-6 h-6',
                  shouldUseTransparentBg ? 'text-white' : 'text-gray-900'
                )}
              />
            ) : (
              <Bars3Icon
                className={cn(
                  'w-6 h-6',
                  shouldUseTransparentBg ? 'text-white' : 'text-gray-900'
                )}
              />
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
            <div className="container mx-auto px-4 py-4 space-y-4 flex">
              {mainNavItems.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Resources Menu */}
              <div className="space-y-2">
                <div className="font-medium text-gray-900">Resources</div>
                {resourcesItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 pl-4 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Start Fundraising
              </Link>

              <div className="pt-4 border-t">
                <ConnectWallet />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
