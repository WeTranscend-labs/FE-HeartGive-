import React from 'react';
import { formatCurrency } from '../utils/format';
import { formatDistanceToNow } from '../utils/date';
import { ArrowUpRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Transaction {
  txHash: string;
  sender: string;
  amount: bigint;
  timestamp: Date;
  block: number;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  // Nếu không có giao dịch
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No transactions yet</div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.txHash}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Transaction Icon */}
                <CheckCircleIcon className="h-6 w-6 text-green-500" />

                {/* Sender Address */}
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    From: {transaction.sender}
                  </p>
                  <p className="text-xs text-gray-500">
                    Block #{transaction.block}
                  </p>
                </div>
              </div>

              {/* Transaction Amount */}
              <div className="flex flex-col items-end">
                <div className="text-sm font-semibold text-green-600">
                  + {formatCurrency(BigInt(transaction.amount))} ADA
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(transaction.timestamp)} ago
                </div>
              </div>

              {/* Transaction Link */}
              <a
                href={`https://preview.cardanoscan.io/transaction/${transaction.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
              >
                <ArrowUpRightIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination or Load More (optional) */}
      {transactions.length > 10 && (
        <div className="px-4 py-3 bg-gray-50 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700">
            Load More Transactions
          </button>
        </div>
      )}
    </div>
  );
}
