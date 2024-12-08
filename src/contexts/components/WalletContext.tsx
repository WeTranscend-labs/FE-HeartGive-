import { WalletContextType } from '@/types/contexts/WalletContextType';
import { createContext } from 'react';

const WalletContext = createContext<WalletContextType>(null!);

export default WalletContext;
