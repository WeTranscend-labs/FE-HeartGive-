import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from "@/lib/utils";

interface ResourcesDropdownProps {
    isTransparent: boolean;
}

const resourcesItems = [
    { label: 'Help Center', path: '#' },
    { label: 'Guidelines', path: '#' },
    { label: 'Blog', path: '#' },
    { label: 'FAQs', path: '#' }
];

export function ResourcesDropdown({ isTransparent }: ResourcesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors duration-300",
                    isTransparent
                        ? "text-gray-600 hover:text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                )}
            >
                <span>Resources</span>
                <ChevronDownIcon className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {isOpen && (
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
    );
}