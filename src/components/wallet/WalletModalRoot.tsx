import React, { useContext } from 'react';
import WalletModalContext from '@/contexts/components/WalletModalContext';
import WalletModal from './WalletModal';
import useModal from '@/hooks/useModal';
import wallets from '@/constants/wallets';

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