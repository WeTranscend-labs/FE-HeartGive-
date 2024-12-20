import { Network } from 'lucid-cardano';

type Props = {
  address: string;
  pattern: string;
};

const checkNetwork = function ({ address, pattern }: Props): Network {
  if (address.includes(pattern)) {
    return 'Preview';
  }
  return 'Mainnet';
};

export default checkNetwork;
