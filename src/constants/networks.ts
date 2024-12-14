import { NetworkType } from '@/types/GenericType';

const networks: NetworkType[] = [
  {
    networkName: 'Mainnet',
    url: import.meta?.env.VITE_BLOCKFROST_RPC_URL_MAINNET || '',
    apiKey: import.meta?.env.VITE_BLOCKFROST_PROJECT_API_KEY_MAINNET,
  },
  {
    networkName: 'Preprod',
    url: import.meta?.env.VITE_BLOCKFROST_RPC_URL_PREPROD,
    apiKey: import.meta?.env.VITE_BLOCKFROST_PROJECT_API_KEY_PREPROD,
  },
  {
    networkName: 'Preview',
    url: import.meta.env.VITE_BLOCKFROST_RPC_URL_PREVIEW,
    apiKey: import.meta.env.VITE_BLOCKFROST_PROJECT_API_KEY_PREVIEW,
  },
];

export { networks };
