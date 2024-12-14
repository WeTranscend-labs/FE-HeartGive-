// src/components/Round/RoundStatsContainer.tsx
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import CountUp from 'react-countup';

interface RoundStatsContainerProps {
  roundStats: {
    totalInRound: bigint;
    matchingPool: bigint;
    contributionsTotal: bigint;
    contributorsCount: number;
  } | null;
  className?: string;
}

export function RoundStatsContainer({
  roundStats,
  className,
}: RoundStatsContainerProps) {
  const startDate = 'Jun 10, 2024';
  const endDate = 'Jan 10, 2025';

  // Loading state
  if (!roundStats) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  const getRemainingTime = () => {
    const end = new Date('2025-01-10'); // Chính xác ngày 10/1/2024
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Round ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Nếu còn dưới 24h, hiển thị giờ và phút
    if (days === 0) {
      return `${hours}h ${minutes}m remaining`;
    }

    return `${days}d ${hours}h remaining`;
  };

  // Tính phần trăm tiến độ
  const getProgress = () => {
    const start = new Date('2024-08-10').getTime();
    const end = new Date('2025-01-10').getTime();
    const now = new Date().getTime();

    // Đảm bảo không vượt quá 100%
    if (now >= end) return 100;
    if (now <= start) return 0;

    const total = end - start;
    const current = now - start;
    return Math.min(Math.max((current / total) * 100, 0), 100);
  };

  const stats = [
    {
      icon: ChartBarIcon,
      label: 'Total in Round',
      value: Number(roundStats.totalInRound),
    },
    {
      icon: CurrencyDollarIcon,
      label: 'Matching Pool',
      value: Number(roundStats.matchingPool),
    },
    {
      icon: CurrencyDollarIcon,
      label: 'Contributions',
      value: Number(roundStats.contributionsTotal),
    },
    {
      icon: UserGroupIcon,
      label: 'Contributors',
      value: roundStats.contributorsCount,
      isCount: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-5 h-5 text-primary-600" />
            <div>
              <h3 className="font-medium text-gray-900">Round Period</h3>
              <p className="text-sm text-gray-500">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">{getRemainingTime()}</span>
            <span className="text-gray-500">{getProgress().toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              className="h-full bg-primary-600 rounded-full"
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="divide-y divide-gray-100">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <stat.icon className="w-5 h-5 text-primary-600 " />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stat.isCount ? (
                      <CountUp end={stat.value} separator="," />
                    ) : (
                      <CountUp
                        end={stat.value}
                        suffix="₳"
                        separator=","
                        decimals={2}
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
