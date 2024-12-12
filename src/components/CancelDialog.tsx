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
}

export function CancelDialog({
  fundId,
  currentAmount,
  fundOwner,
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
        <Button variant="destructive" className="w-full text-lg py-6">
          Cancel Fund
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cancel Fund</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this fund and withdraw all
            contributions?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-between items-baseline mb-4 text-sm text-gray-600">
            <span>Total Contributions</span>
            <span className="font-medium text-red-600">
              {formatCurrency(currentAmount)}
            </span>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleCancelFund}
              disabled={isLoading}
            >
              {isLoading ? 'Canceling...' : 'Confirm Cancel'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
