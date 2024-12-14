// src/utils/currency.ts
export function formatCurrency(
  amount: bigint | number,
  currency: string = "ADA"
): string {
  // Convert bigint to number if needed
  const numericAmount = typeof amount === "bigint" ? Number(amount) : amount;

  // Format the number with 2 decimal places
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);

  // Return formatted string with currency
  return `${formattedAmount} ${currency}`;
}

// Additional currency utility functions
export function lovelaceToAda(lovelace: bigint): number {
  return Number(lovelace) / 1_000_000;
}

export function adaToLovelace(ada: number): bigint {
  return BigInt(Math.floor(ada * 1_000_000));
}

// Format for display in compact notation (e.g., 1.2K, 1.2M)
export function formatCompactCurrency(
  amount: bigint | number,
  currency: string = "ADA"
): string {
  const numericAmount = typeof amount === "bigint" ? Number(amount) : amount;

  return (
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(numericAmount) + ` ${currency}`
  );
}

// Format percentage
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
}
