import React, { useContext, useEffect, useState } from 'react';
import { WalletType } from '@/types/GenericType';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import WalletContext from '@/contexts/components/WalletContext';

type Props = {
  wallet: WalletType;
  accept: boolean;
};

const WalletItem = function ({ wallet, accept }: Props) {
  const [isDownload, setIsDownload] = useState<boolean>(true);
  const { connect, loading } = useContext<WalletContextType>(WalletContext);

  const handleConnectWallet = async function () {
    if (!accept) return;

    await connect({
      api: wallet.api,
      name: wallet.name,
      image: wallet.image,
      checkApi: wallet.checkApi,
    });
  };

  useEffect(() => {
    (async function () {
      setIsDownload(await wallet.checkApi());
    })();
  }, []);

  return (
    <div
      onClick={handleConnectWallet}
      className={`
        group
        relative
        flex
        items-center
        justify-between
        p-4
        rounded-xl
        border
        border-gray-100
        transition-all
        duration-200
        ${accept ? 'cursor-pointer hover:border-primary-200 hover:bg-primary-50/30' : 'opacity-50 cursor-not-allowed'}
      `}
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 p-2 group-hover:bg-white transition-colors">
          <img
            src={wallet.image}
            alt={wallet.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <h3 className="text-base font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
            {wallet.name}
          </h3>
          {!isDownload && (
            <p className="text-sm text-gray-500">
              Not installed
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {!isDownload && (
          <a
            href={wallet.downloadApi as string}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
          >
            Install
            <svg
              className="w-3.5 h-3.5 ml-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}

        {isDownload && (
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${accept ? 'text-primary-500 group-hover:translate-x-1' : 'text-gray-300'
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default WalletItem;