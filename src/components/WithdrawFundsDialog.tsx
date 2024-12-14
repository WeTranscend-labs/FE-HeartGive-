// @/components/WithdrawFundsDialog.tsx
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SmartContractContext from '@/contexts/components/SmartContractContext';
import { toast } from '@/hooks/use-toast';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import { formatCurrency } from '@/utils/format';
import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { ClipboardCopyIcon } from 'lucide-react';
import { useContext, useState } from 'react';

interface WithdrawFundsDialogProps {
  fundId: string;
  fundAddress: string;
  currentAmount: bigint;
  fundOwner: string;
  className?: string;
  walletAddress: string;
  randomHashKey: string;
}

export function WithdrawFundsDialog({
  fundId,
  fundAddress,
  currentAmount,
  fundOwner,
  className,
  walletAddress,
  randomHashKey,
}: WithdrawFundsDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<bigint>(currentAmount);

  const { withdrawFunds } =
    useContext<SmartContractContextType>(SmartContractContext);

  const handleWithdraw = async () => {
    try {
      if (!fundOwner) {
        toast({
          title: 'Error',
          description: 'Wallet not connected',
          variant: 'destructive',
        });
        return;
      }

      if (withdrawAmount <= 0n) {
        toast({
          title: 'Error',
          description: 'Withdrawal amount must be greater than zero',
          variant: 'destructive',
        });
        return;
      }

      if (withdrawAmount > currentAmount) {
        toast({
          title: 'Error',
          description: 'Withdrawal amount exceeds available balance',
          variant: 'destructive',
        });
        return;
      }

      setIsLoading(true);

      const txHash = await withdrawFunds({
        fundAddress,
        withdrawAmount,
        fundOwner,
        walletAddress,
        randomHashKey,
      });

      toast({
        title: 'Success',
        description: `Funds withdrawn successfully. Transaction Hash: ${txHash}`,
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast({
        title: 'Error',
        description: 'Failed to withdraw funds. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={`
            group relative overflow-hidden 
            bg-emerald-500 hover:bg-emerald-600 
            text-white font-semibold 
            py-3 px-6 rounded-xl 
            transition-all duration-300 
            flex items-center justify-center
            ${className}
          `}
        >
          <CurrencyDollarIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Withdraw Funds
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="
          bg-white 
          rounded-2xl 
          shadow-2xl 
          border-none 
          max-w-md 
          w-full 
          mx-auto
        "
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-amber-50 rounded-full mx-auto">
            <ExclamationTriangleIcon className="w-8 h-8 text-amber-500" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Withdraw Funds
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Are you sure you want to withdraw
            <span className="font-bold text-emerald-600 ml-1">
              {formatCurrency(currentAmount)}
            </span>{' '}
            from this fund?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 rounded-xl p-4 mt-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Available Balance</span>
            <span className="font-semibold text-emerald-600">
              {formatCurrency(currentAmount)}
            </span>
          </div>
        </div>

        <DialogFooter className="mt-6 space-y-4 block">
          {/* Balance Display with Truncated Fund Address */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Available Balance</span>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(currentAmount)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Fund Address</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-gray-200 rounded-full"
                    onClick={() => {
                      navigator.clipboard.writeText(fundAddress);
                      toast({
                        title: 'Address Copied',
                        description: 'Fund address copied to clipboard',
                        variant: 'default',
                      });
                    }}
                  >
                    <ClipboardCopyIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                  </Button>
                </div>
                <span className="font-mono text-xs text-gray-700">
                  {fundAddress.slice(0, 6) + '...' + fundAddress.slice(-4)}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 ease-in-out py-3 rounded-lg font-semibold group flex items-center justify-center"
            >
              <span className="text-center w-full group-hover:-translate-x-1 transition-transform">
                Cancel
              </span>
            </Button>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md shadow-emerald-500/50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 flex flex-col items-center justify-center gap-2 group"
              disabled={isLoading}
              onClick={handleWithdraw} // Thêm sự kiện onClick ở đây
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-center">Withdrawing...</span>
                </>
              ) : (
                <>
                  <span className="text-center w-full h-full group-hover:translate-x-1 transition-transform ">
                    Confirm Withdrawal
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
