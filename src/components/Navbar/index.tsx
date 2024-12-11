import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    mainNavItems: Array<{ path: string; label: string; }>;
    resourcesItems: Array<{ label: string; path: string; }>;
}

export function MobileMenu({ isOpen, onClose, mainNavItems, resourcesItems }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
        >
            <div className="container mx-auto px-4 py-4 space-y-4">
                {mainNavItems.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
                        className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="space-y-2">
                    <div className="font-medium text-gray-900">Resources</div>
                    {resourcesItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={onClose}
                            className="block py-2 pl-4 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Link
                    to="/register"
                    onClick={onClose}
                    className="block w-full text-center py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    Start Fundraising
                </Link>
            </div>
        </motion.div>
    );
}