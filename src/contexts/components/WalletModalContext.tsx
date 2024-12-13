import { createContext } from 'react';

type WalletModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const WalletModalContext = createContext<WalletModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export default WalletModalContext; 