export function formatCurrency(amount: bigint): string {
  return `₳${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
