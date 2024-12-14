interface ProgressBarProps {
  current: bigint;
  target: bigint;
}

export function ProgressBar({ current, target }: ProgressBarProps) {
  // Tính phần trăm với độ chính xác cao nhất sử dụng BigInt
  const percentage =
    target > 0n
      ? Math.max(
          Math.min(Number((current * 10000n) / target) / 100, 100),
          current > 0n ? Number((current * 10000n) / target) / 100 : 0
        )
      : 0;

  const formatPercentage = (value: number) => {
    // Chuyển đổi sang chuỗi với 2 chữ số thập phân
    const formatted = value.toFixed(2);
    // Loại bỏ các số 0 thừa sau dấu thập phân
    return formatted.replace(/\.?0+$/, '');
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-sm">
        <div>
          <span className="font-medium">{formatPercentage(percentage)}%</span>
          <span className="text-gray-500 ml-1">complete</span>
        </div>
        <span className="text-gray-500">
          {percentage >= 100 ? 'Goal reached!' : 'In progress'}
        </span>
      </div>
    </div>
  );
}
