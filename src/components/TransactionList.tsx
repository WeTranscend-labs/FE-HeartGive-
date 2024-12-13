import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/format';
import { formatDistanceToNow } from '@/utils/date';
import { 
  ArrowUpRightIcon, 
  CheckCircleIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

// Types
interface Transaction {
  txHash: string;
  sender: string;
  amount: bigint;
  timestamp: Date;
  block: number;
}

interface TransactionListProps {
  transactions: Transaction[];
  onLoadMore?: () => void;
}

// Main Component
export function TransactionList({ transactions, onLoadMore }: TransactionListProps) {
  if (!transactions?.length) {
    return <EmptyTransactionState />;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <TransactionItem 
            key={transaction.txHash} 
            transaction={transaction} 
          />
        ))}
      </div>

      {transactions.length > 10 && (
        <LoadMoreButton onLoadMore={onLoadMore} />
      )}
    </div>
  );
}

// Sub-components
function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 hover:bg-gray-50 transition-all group"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Transaction Icon */}
        <div className="flex items-center space-x-4 flex-grow">
          <div className="relative">
            <div className="absolute -inset-1 bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <CheckCircleIcon className="h-6 w-6 text-green-500 relative z-10" />
          </div>

          {/* Transaction Details */}
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
              From: {transaction.sender}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Block #{transaction.block}
            </p>
          </div>
        </div>

        {/* Amount and Timestamp */}
        <div className="flex flex-col items-end">
          <div className="text-sm font-semibold text-green-600">
            + {formatCurrency(transaction.amount)} ADA
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(transaction.timestamp)} ago
          </div>
        </div>

        {/* External Link */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={`https://preview.cardanoscan.io/transaction/${transaction.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowUpRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
        </motion.a>
      </div>
    </motion.div>
  );
}

function EmptyTransactionState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12 px-4 rounded-xl bg-white border border-gray-100 shadow-lg"
    >
      <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <CurrencyDollarIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No Transactions Yet
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        Be the first to contribute to this campaign and make a difference!
      </p>
    </motion.div>
  );
}

function LoadMoreButton({ onLoadMore }: { onLoadMore?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100"
    >
      <button
        onClick={onLoadMore}
        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
      >
        Load More Transactions
      </button>
    </motion.div>
  );
}
