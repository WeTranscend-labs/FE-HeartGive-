import { useState } from 'react';
import { Transaction } from '../types/fund';
import { formatCurrency } from '../utils/format';
import { formatDistanceToNow } from '../utils/date';
import { TransactionModal } from './TransactionModal';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <>
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              onClick={() => setSelectedTransaction(tx)}
              className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">
                  From: <span className="font-mono">{tx.fromWallet.slice(0, 16)}...</span>
                </p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(tx.timestamp)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">
                  +{formatCurrency(tx.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No transactions yet. Be the first to contribute!
        </p>
      )}

      <TransactionModal
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
}