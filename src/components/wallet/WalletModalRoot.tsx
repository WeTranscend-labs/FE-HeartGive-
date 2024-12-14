import wallets from '@/constants/wallets';
import WalletModalContext from '@/contexts/components/WalletModalContext';
import React, { useContext } from 'react';
import WalletModal from './WalletModal';

const WalletModalRoot = () => {
  const { isOpen, closeModal } = useContext(WalletModalContext);
  const [accept, setAccept] = React.useState(false);

  const handleAccept = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccept(event.target.checked);
  };

  return (
    <WalletModal
      isShowing={isOpen}
      toggle={closeModal}
      accept={accept}
      handleAccept={handleAccept}
      wallets={wallets}
    />
  );
};

export default WalletModalRoot;
