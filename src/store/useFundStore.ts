import { create } from 'zustand';
import { Fund, Transaction } from '../types/fund';
import { mockFunds } from '../mockData/funds';
import { mockTransactions } from '../mockData/transactions';

interface FundStore {
  funds: Fund[];
  transactions: Transaction[];
  addFund: (fund: Omit<Fund, 'id' | 'createdAt' | 'currentAmount'>) => Fund;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getFundById: (id: string) => Fund | undefined;
  getFundTransactions: (fundId: string) => Transaction[];
}

export const useFundStore = create<FundStore>((set, get) => ({
  funds: mockFunds,
  transactions: mockTransactions,
  
  addFund: (fundData) => {
    const newFund: Fund = {
      ...fundData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      currentAmount: 0,
    };
    
    set((state) => ({
      funds: [...state.funds, newFund],
    }));

    return newFund;
  },
  
  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    
    set((state) => {
      // Update fund's current amount
      const updatedFunds = state.funds.map(fund => {
        if (fund.id === transactionData.fundId) {
          return {
            ...fund,
            currentAmount: fund.currentAmount + transactionData.amount,
            supporterCount: fund.supporterCount + 1,
          };
        }
        return fund;
      });

      return {
        funds: updatedFunds,
        transactions: [...state.transactions, newTransaction],
      };
    });
  },
  
  getFundById: (id) => {
    return get().funds.find((fund) => fund.id === id);
  },
  
  getFundTransactions: (fundId) => {
    return get().transactions
      .filter((tx) => tx.fundId === fundId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  },
}));