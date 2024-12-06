import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    ...pathnames.map((value, index) => ({
      name: value.charAt(0).toUpperCase() + value.slice(1),
      href: `/${pathnames.slice(0, index + 1).join('/')}`
    }))
  ];

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            )}
            <Link
              to={breadcrumb.href}
              className={`flex items-center text-sm ${
                index === breadcrumbs.length - 1
                  ? 'text-gray-700 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {index === 0 && <HomeIcon className="w-4 h-4 mr-1" />}
              {breadcrumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}