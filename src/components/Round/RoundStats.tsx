// src/components/Round/RoundStats.tsx
import { formatCurrency } from '@/utils/format';
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface RoundStatsProps {
    totalInRound: bigint;
    matchingPool: bigint;
    contributionsTotal: bigint;
    contributorsCount: number;
    startDate: string;
    endDate: string;
}

export function RoundStats({
    totalInRound,
    matchingPool,
    contributionsTotal,
    contributorsCount,
    startDate,
    endDate,
}: RoundStatsProps) {
    const stats = [
        { label: 'Total in Round', value: formatCurrency(totalInRound) },
        { label: 'Matching Pool', value: formatCurrency(matchingPool) },
        { label: 'Contributions', value: formatCurrency(contributionsTotal) },
        { label: 'Contributors', value: contributorsCount.toString() },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-gray-500" />
                        <h3 className="font-medium text-gray-900">Round Period</h3>
                    </div>
                    <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        Active
                    </span>
                </div>
            </div>

            {/* Date Range */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                    <div>
                        <div className="text-gray-500">Start</div>
                        <div className="font-medium">{startDate}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-500">End</div>
                        <div className="font-medium">{endDate}</div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="p-6 space-y-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <span className="font-medium text-gray-900">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Progress */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Time Remaining</span>
                    <span className="text-primary-600 font-medium">
                        {getRemainingTime(endDate)}
                    </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(startDate, endDate)}%` }}
                        className="h-full bg-primary-600 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}

// Helper functions
function getRemainingTime(endDate: string): string {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Round ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h remaining`;
}

function getProgressPercentage(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();

    const total = end - start;
    const current = now - start;
    const percentage = (current / total) * 100;

    return Math.min(Math.max(percentage, 0), 100);
}
