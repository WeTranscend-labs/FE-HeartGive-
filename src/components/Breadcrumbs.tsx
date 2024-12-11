import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  name: string;
  href: string;
}

const PATH_NAMES: Record<string, string> = {
  'funds': 'Browse Funds',
  'fund': 'Fund Details',
  'register': 'Register Fund',
  'about': 'About Us'
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    ...pathnames.map((value, index) => ({
      name: PATH_NAMES[value] || value.charAt(0).toUpperCase() + value.slice(1),
      href: `/${pathnames.slice(0, index + 1).join('/')}`
    }))
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <nav className="py-2" aria-label="Breadcrumb">
          <ol className="flex items-center h-8">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="w-3 h-3 text-gray-400 mx-1.5 flex-shrink-0" />
                )}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    to={breadcrumb.href}
                    className={`group flex items-center px-2 py-1 rounded-md transition-all duration-200 ${index === breadcrumbs.length - 1
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                  >
                    {index === 0 ? (
                      <HomeIcon className="w-3.5 h-3.5 mr-1 flex-shrink-0 group-hover:text-primary-500 transition-colors" />
                    ) : null}
                    <span className="text-xs whitespace-nowrap">
                      {breadcrumb.name}
                    </span>
                    {index === breadcrumbs.length - 1 && (
                      <motion.div
                        layoutId="active-breadcrumb"
                        className="absolute inset-0 rounded-md bg-primary-50 -z-10"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}