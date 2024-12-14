// src/utils/stats.ts
import { FundTransaction } from "@/types/fund";

interface TransactionStats {
  totalContributions: bigint;
  uniqueContributors: number;
  averageContribution: bigint;
  recentTransactions: FundTransaction[];
}

export function calculateTransactionStats(
  transactions: FundTransaction[]
): TransactionStats {
  if (!transactions || transactions.length === 0) {
    return {
      totalContributions: BigInt(0),
      uniqueContributors: 0,
      averageContribution: BigInt(0),
      recentTransactions: [],
    };
  }

  // Get unique contributors
  const uniqueContributors = new Set(transactions.map((tx) => tx.sender)).size;

  // Calculate total contributions
  const totalContributions = transactions.reduce(
    (sum, tx) => sum + tx.amount,
    BigInt(0)
  );

  // Calculate average contribution
  const averageContribution =
    uniqueContributors > 0
      ? totalContributions / BigInt(uniqueContributors)
      : BigInt(0);

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  return {
    totalContributions,
    uniqueContributors,
    averageContribution,
    recentTransactions,
  };
}

export function calculateRoundStats(funds: FundTransaction[][]): {
  totalInRound: bigint;
  matchingPool: bigint;
  contributionsTotal: bigint;
  contributorsCount: number;
} {
  // Combine all transactions
  const allTransactions = funds.flat();

  // Calculate total contributions
  const contributionsTotal = allTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    BigInt(0)
  );

  // Get unique contributors across all funds
  const uniqueContributors = new Set(allTransactions.map((tx) => tx.sender))
    .size;

  // Calculate matching pool (90% of total contributions)
  const matchingPool = (contributionsTotal * BigInt(90)) / BigInt(100);

  // Total in round is contributions + matching pool
  const totalInRound = contributionsTotal + matchingPool;

  return {
    totalInRound,
    matchingPool,
    contributionsTotal,
    contributorsCount: uniqueContributors,
  };
}
