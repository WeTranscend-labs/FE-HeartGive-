// src/components/stats/StatItem.tsx
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatItemProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    delay?: number;
}

export function StatItem({ label, value, icon: Icon, color, delay = 0 }: StatItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="space-y-2"
        >
            <div className="flex items-center space-x-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-sm text-gray-600">{label}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
        </motion.div>
    );
}
