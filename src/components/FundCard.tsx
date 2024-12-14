import { format, parseISO } from 'date-fns';
import { CalendarDaysIcon, ClockIcon } from 'lucide-react';

import { Fund } from '../types/fund';
import { formatCurrency } from '../utils/format';
import { ProgressBar } from './ProgressBar';

interface FundCardProps {
  fund: Fund;
  onClick?: () => void;
}

function calculateFundStatus(startDate: string, endDate: string) {
  const now = new Date();
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (now < start) {
    const daysUntilStart = Math.ceil(
      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      status: 'Upcoming',
      statusClass: 'bg-yellow-100 text-yellow-800',
      timeLabel: `Starts in ${daysUntilStart} days`,
    };
  } else if (now > end) {
    return {
      status: 'Closed',
      statusClass: 'bg-red-100 text-red-800',
      timeLabel: 'Campaign Ended',
    };
  } else {
    const daysRemaining = Math.ceil(
      (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      status: 'Active',
      statusClass: 'bg-green-100 text-green-800',
      timeLabel: `${daysRemaining} days left`,
    };
  }
}

export function formatDateRange(startDate: string, endDate: string) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
}

export function FundCard({ fund, onClick }: FundCardProps) {
  const fundStatus = calculateFundStatus(fund.startDate, fund.endDate);
  const formattedDateRange = formatDateRange(fund.startDate, fund.endDate);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="aspect-video relative">
        <img
          src={fund.image}
          alt={fund.organizationName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`
              px-3 py-1 rounded-full text-sm font-medium ${fundStatus.statusClass}
            `}
          >
            {fundStatus.status}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-semibold text-white">
            {fund.organizationName}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {fund.category}
            </span>
            {/* <div className="flex items-center text-gray-500 text-sm">
              <TagIcon className="w-4 h-4 mr-1" />
              {fund.category}
            </div> */}
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <ClockIcon className="w-4 h-4 mr-1" />
            {fundStatus.timeLabel}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(fund.currentAmount)}
            </span>
            <span className="text-sm text-gray-500">
              of {formatCurrency(fund.targetAmount)}
            </span>
          </div>

          <ProgressBar
            current={fund.currentAmount}
            target={fund.targetAmount}
          />

          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center">
              <CalendarDaysIcon className="w-5 h-5 mr-1.5" />
              <span className="font-medium">{formattedDateRange}</span>
            </div>
            <div className="text-primary-600 font-semibold">
              {fundStatus.timeLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
