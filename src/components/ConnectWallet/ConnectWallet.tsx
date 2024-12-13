import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import LucidContext from '@/contexts/components/LucidContext';
import WalletContext from '@/contexts/components/WalletContext';
import WalletModalContext from '@/contexts/components/WalletModalContext';
import { Button } from '@/components/ui/button';
import {
  ChevronDownIcon,
  WalletIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const ConnectWallet = () => {
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const { wallet, disconnect } = useContext<WalletContextType>(WalletContext);
  const { openModal } = useContext(WalletModalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 7)}...${address.slice(-6)}`;
  };

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!wallet || !lucid) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={openModal}
          className="relative overflow-hidden group bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl px-6 py-3 shadow-md hover:shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Connect Wallet
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            'relative overflow-hidden group px-5 py-3 rounded-xl',
            'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg',
            'transition-all duration-300'
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-semibold flex items-center">
                {wallet.balance?.toFixed(6)}
                <span className="ml-1 font-normal">₳</span>
              </p>
              <p className="text-xs opacity-80 font-mono">
                {formatAddress(wallet?.address)}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 shadow-inner">
              <img
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                src={wallet.image}
                alt="Wallet"
              />
            </div>
            <ChevronDownIcon
              className={cn(
                'w-4 h-4 transition-transform duration-300',
                isDropdownOpen ? 'rotate-180' : ''
              )}
            />
          </div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
          >
            <div className="px-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Wallet Details
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {}}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                    title="Refresh"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </button>
                  <a
                    href={`https://cardanoscan.io/address/${wallet.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                    title="View on Explorer"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Balance</span>
                    <span className="text-sm font-medium text-gray-900">
                      {wallet.balance?.toFixed(6)} ₳
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Address</span>
                    <button
                      onClick={copyAddress}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Copy Address"
                    >
                      {copied ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <ClipboardIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-gray-500 break-all">
                    {wallet.address}
                  </p>
                </div>
                <div className="px-5 mt-4">
                  <Link to="/verified">
                    <Button className="w-full bg-primary-600 text-white hover:bg-primary-500 transition-colors mb-3">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={disconnect}
                    variant="outline"
                    className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectWallet;
