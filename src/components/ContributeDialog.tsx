import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TransactionForm } from './TransactionForm';
import { formatCurrency } from '@/utils/format';
import { useState } from 'react';


interface ContributeDialogProps {
  fundAddress: string;
  currentAmount: bigint;
  targetAmount: bigint;
}


export function ContributeDialog({
  fundAddress,
  currentAmount,
  targetAmount,
  className,
}: ContributeDialogProps & { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`w-full text-lg relative group ${className}`}
          size="lg"
        >
          <span className="relative z-10 flex items-center justify-center">
            Contribute Now
            <svg
              className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">Make a Contribution</DialogTitle>
          <p className="text-gray-600">Support this campaign by making a contribution</p>
        </DialogHeader>
        <div className="py-6">
          <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-gray-600">Current Amount</span>
              <span className="font-semibold text-primary-600">{formatCurrency(currentAmount)}</span>
            </div>
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-gray-600">Target Amount</span>
              <span className="font-semibold text-primary-600">{formatCurrency(targetAmount)}</span>
            </div>
          </div>
          <TransactionForm fundAddress={fundAddress} onSuccess={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
