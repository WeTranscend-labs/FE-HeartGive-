import React, { ReactNode, useState } from 'react';
import WalletModalContext from '../components/WalletModalContext';

type Props = {
  children: ReactNode;
};

const WalletModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WalletModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </WalletModalContext.Provider>
  );
};

export default WalletModalProvider; 