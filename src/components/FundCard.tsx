import { Fund } from '../types/fund';
import { formatCurrency } from '../utils/format';
import { ProgressBar } from './ProgressBar';
import { UserGroupIcon, TagIcon } from '@heroicons/react/24/outline';

interface FundCardProps {
  fund: Fund;
  onClick?: () => void;
}

export function FundCard({ fund, onClick }: FundCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="aspect-video relative">
        <img
          src={fund.imageUrl}
          alt={fund.organizationName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-semibold text-white">
            {fund.organizationName}
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {fund.category}
          </span>
          {fund.tags.length > 0 && (
            <div className="flex items-center text-gray-500 text-sm">
              <TagIcon className="w-4 h-4 mr-1" />
              {fund.tags.slice(0, 2).join(', ')}
              {fund.tags.length > 2 && ' ...'}
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {fund.purpose}
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(fund.currentAmount)}
            </span>
            <span className="text-sm text-gray-500">
              of {formatCurrency(fund.targetAmount)}
            </span>
          </div>
          
          <ProgressBar current={fund.currentAmount} target={fund.targetAmount} />
          
          <div className="flex items-center text-gray-500 text-sm">
            <UserGroupIcon className="w-5 h-5 mr-1.5" />
            {fund.supporterCount} supporter{fund.supporterCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}