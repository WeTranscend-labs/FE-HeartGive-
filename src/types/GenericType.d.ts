export type NetworkType = {
  networkName: Network;
  url: string;
  apiKey: string;
};

export type WalletType = {
  name: string;
  image: string;
  balance?: number;
  address?: string;
  stakeKey?: string;
  publicKeyHash: string;
  downloadApi?: string;
  api: () => Promise<any> | any;
  checkApi: () => Promise<any> | any;
};
