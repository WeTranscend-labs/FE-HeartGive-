import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse Funds', href: '/funds' },
      { label: 'Start Fundraising', href: '/register' },
      { label: 'How It Works', href: '/about' },
      { label: 'Success Stories', href: '/success-stories' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Guidelines', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'FAQs', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
];

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <Logo />
              <span className="text-xl font-bold text-gray-900">HeartGive</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Empowering organizations to make a difference through transparent blockchain solutions. Join us in revolutionizing community support.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                >
                  <span className="sr-only">{social.label}</span>
                  <i className={`fab fa-${social.icon}`}></i>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} HeartGive. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Built on blockchain for a transparent future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
