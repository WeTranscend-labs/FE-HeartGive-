interface ProgressBarProps {
  current: number;
  target: number;
}

export function ProgressBar({ current, target }: ProgressBarProps) {
  const progress = (current / target) * 100;
  const percentage = Math.min(progress, 100);

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
          <span className="font-medium">{percentage.toFixed(1)}%</span>
          <span className="text-gray-500 ml-1">complete</span>
        </div>
        <span className="text-gray-500">{`${percentage >= 100 ? 'Goal reached!' : 'In progress'}`}</span>
      </div>
    </div>
  );
}