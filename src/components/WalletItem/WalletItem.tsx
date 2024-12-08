import React, { useContext, useEffect, useState } from 'react';
import { WalletType } from '@/types/GenericType';
import icons from '@/assets/icons';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import WalletContext from '@/contexts/components/WalletContext';
import { Link } from 'react-router-dom';

type Props = {
  wallet: WalletType;
  accept: boolean;
};

const WalletItem = function ({ wallet, accept }: Props) {
  const [isDownload, setIsDownload] = useState<boolean>(true);
  const { connect, loading } = useContext<WalletContextType>(WalletContext);

  const handleConnectWallet = async function () {
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
      className={`flex items-center border-t border-[#373c62] h-[50px] pointer-events-none ${accept ? 'pointer-events-auto cursor-pointer opacity-100' : ''} ${isDownload ? 'bg-[url("../../assets/icons/arrow-right.png")]' : ''} hover:bg-[rgba(0,0,0,0.1)] last:border-b last:border-[#373c62]`}
      onClick={handleConnectWallet}
    >
      <div className="flex mr-[3%] pl-[3%]">
        <img
          className={`w-[22px] h-[22px] object-cover font-bold ${accept ? 'opacity-100' : 'opacity-40'}`}
          src={wallet.image}
          alt={wallet.name}
        />
      </div>
      <div className="w-full flex items-center justify-between pr-[3%] cursor-default">
        <div
          className={`text-[18px] font-light capitalize ${accept ? 'opacity-100' : 'opacity-40'}`}
        >
          {wallet.name}
        </div>

        {!isDownload && (
          <div className="text-[var(--text-color)] text-[14px] font-normal opacity-100 z-10">
            <Link
              className="text-[var(--text-color)] text-[1.4rem] font-normal no-underline"
              to={wallet.downloadApi as string}
              target="_blank"
            >
              Not installed
              <img
                className="w-[1.8rem] h-[1.8rem] object-cover ml-[0.4rem]"
                src={icons.install}
                alt="install icons"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletItem;
