import { WalletType } from '../GenericType';

export type WalletContextType = {
  connect: ({ name, api, image }: WalletType) => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
  wallet: WalletType;
};
