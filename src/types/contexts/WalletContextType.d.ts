import { WalletType } from '../GenericType';

export type WalletContextType = {
  connect: ({ name, api, image }: any) => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
  wallet: WalletType;
  isAdmin: boolean;
};
