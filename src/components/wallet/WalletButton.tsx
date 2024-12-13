import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  WalletIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

type WalletButtonProps = {
  lucid: boolean;
  isShowTippy: boolean;
  wallet: any;
  isShowingErrorNetwork: boolean;
  toggleShowingWallet: () => void;
};

const WalletButton = ({
  lucid,
  isShowTippy,
  wallet,
  isShowingErrorNetwork,
  toggleShowingWallet,
}: WalletButtonProps) => {
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 7)}...${address.slice(-6)}`;
  };

  return (
    <Button
      onClick={toggleShowingWallet}
      className={cn(
        'flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl',
        isShowTippy && wallet
          ? 'bg-primary-600 text-white hover:bg-primary-700'
          : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-400 hover:bg-gray-50'
      )}
    >
      {lucid ? (
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-semibold">
              {wallet?.balance?.toFixed(6)}
              <span className="ml-1 font-normal">₳</span>
            </p>
            <p className="text-xs opacity-80 font-mono">
              {formatAddress(wallet?.address)}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
            <img
              className="w-full h-full object-cover"
              src={wallet?.image}
              alt="Wallet"
            />
          </div>

          <ChevronDownIcon className="w-4 h-4" />
        </div>
      ) : (
        <div className="flex items-center space-x-2.5 text-sm font-medium">
          {isShowingErrorNetwork ? (
            <>
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              <span className="text-red-600">Wrong Network</span>
            </>
          ) : (
            <>
              <WalletIcon className="w-5 h-5" />
              <span>Connect Wallet</span>
            </>
          )}
        </div>
      )}
    </Button>
  );
};

export default WalletButton;
