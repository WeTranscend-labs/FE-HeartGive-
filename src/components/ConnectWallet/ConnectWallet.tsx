import React, { ChangeEvent, useContext, useState } from 'react';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import { NetworkContextType } from '@/types/contexts/NetworkContextType';
import { ModalContextType } from '@/types/contexts/ModalContextType';
import LucidContext from '@/contexts/components/LucidContext';
import WalletContext from '@/contexts/components/WalletContext';
import NetworkContext from '@/contexts/components/NetworkContext';
import ModalContext from '@/contexts/components/ModalContext';
import Tippy from '@/components/Tippy';
import wallets from '@/constants/wallets';
import WalletDropdown from '../wallet/WalletDropdown';
import WalletButton from '../wallet/WalletButton';
import WalletModal from '../wallet/WalletModal';
import NetworkErrorModal from '../wallet/NetworkErrorModal';


type Props = {
  className?: string;
};

const ConnectWallet = function ({ className }: Props) {
  const {
    isShowingErrorNetwork,
    toogleErrorNetwork,
    isShowingWallet,
    toggleShowingWallet,
  } = useContext<ModalContextType>(ModalContext);
  const { network } = useContext<NetworkContextType>(NetworkContext);
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const { wallet, disconnect } = useContext<WalletContextType>(WalletContext);
  const [accept, setAccept] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShowTippy, setIsShowTippy] = useState<boolean>(false);

  const handleAccept = function (event: ChangeEvent<HTMLInputElement>) {
    setAccept(event.target.checked);
  };

  return (
    <div className={`relative ${className}`}>
      <Tippy
        onHide={() => setIsShowTippy(false)}
        onShow={() => setIsShowTippy(lucid ? true : false)}
        offset={[0, 0]}
        className="inline-flex items-center rounded-lg text-sm font-medium transition-all duration-300"
        trigger="click"
        interactive
        placement="bottom-end"
        render={
          wallet && (
            <WalletDropdown
              wallet={wallet}
              network={network}
              isCopied={isCopied}
              disconnect={disconnect}
              setIsCopied={setIsCopied}
            />
          )
        }
      >
        <WalletButton
          lucid={!!lucid}
          isShowTippy={isShowTippy}
          wallet={wallet}
          isShowingErrorNetwork={isShowingErrorNetwork}
          toggleShowingWallet={toggleShowingWallet}
        />
      </Tippy>

      {!lucid && (
        <WalletModal
          isShowing={isShowingWallet}
          toggle={toggleShowingWallet}
          accept={accept}
          handleAccept={handleAccept}
          wallets={wallets}
        />
      )}

      <NetworkErrorModal
        isShowing={isShowingErrorNetwork}
        toggle={toogleErrorNetwork}
        disconnect={disconnect}
      />
    </div>
  );
};

export default ConnectWallet;