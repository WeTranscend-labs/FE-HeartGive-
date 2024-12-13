import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format';
import { useContext, useState } from 'react';
import SmartContractContext from '@/contexts/components/SmartContractContext';
import { toast } from '@/hooks/use-toast';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';


interface CancelDialogProps {
  fundId: string;
  currentAmount: bigint;
  fundOwner: string;
  className?: string;
}


export function CancelDialog({
  fundId,
  currentAmount,
  fundOwner,
  className,
}: CancelDialogProps) {
  const { cancelFund } =
    useContext<SmartContractContextType>(SmartContractContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleCancelFund = async () => {
    try {
      setIsLoading(true);
      const cancelTxHash = await cancelFund({
        txHash: fundId,
        fundOwner: fundOwner,
      });


      console.log(cancelTxHash);


      //   toast.success('Fund successfully canceled', {
      //     description: `Transaction Hash: ${cancelTxHash}`,
      //   });
    } catch (error) {
      //   toast.error('Failed to cancel fund', {
      //     description: error.message,
      //   });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className={`w-full text-lg relative group ${className}`}
        >
          <span className="relative z-10 flex items-center justify-center">
            Cancel Fund
            <svg
              className="w-5 h-5 ml-2 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-red-600">Cancel Fund</DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to cancel this fund and withdraw all contributions?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="p-4 bg-red-50 rounded-lg mb-6">
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-red-600">Total Contributions</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(currentAmount)}
              </span>
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 py-6"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleCancelFund}
              disabled={isLoading}
              className="flex-1 py-6"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Canceling...
                </span>
              ) : (
                'Confirm Cancel'
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}



