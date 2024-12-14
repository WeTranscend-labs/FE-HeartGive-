// src/components/stats/RoundPeriod.tsx
import { CalendarDays } from 'lucide-react';

interface RoundPeriodProps {
    startDate: Date;
    endDate: Date;
}

export function RoundPeriod({ startDate, endDate }: RoundPeriodProps) {
    return (
        <div className="p-6 border-b">
            <div className="flex items-center space-x-2 text-gray-600">
                <CalendarDays className="w-5 h-5" />
                <span className="font-medium">Round Period</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">
                {startDate.toLocaleDateString()} – {endDate.toLocaleDateString()}
            </h3>
        </div>
    );
}
