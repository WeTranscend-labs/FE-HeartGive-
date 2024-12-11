import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface NavLinkProps {
    to: string;
    label: string;
    isTransparent: boolean;
}

export function NavLink({ to, label, isTransparent }: NavLinkProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "relative text-sm font-medium transition-colors duration-300",
                isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-gray-600 hover:text-primary-600"
            )}
        >
            {label}
            {isActive && (
                <motion.div
                    layoutId="navbar-indicator"
                    className={cn(
                        "absolute -bottom-1 left-0 right-0 h-0.5",
                        isTransparent ? "bg-white" : "bg-primary-500"
                    )}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
        </Link>
    );
}