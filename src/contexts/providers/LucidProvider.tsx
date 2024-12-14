import { networks } from '@/constants/networks';
import { NetworkContextType } from '@/types/contexts/NetworkContextType';
import { Blockfrost, Lucid, Network } from 'lucid-cardano';
import { ReactNode, useContext, useEffect, useState } from 'react';
import LucidContext from '../components/LucidContext';
import NetworkContext from '../components/NetworkContext';

type Props = {
  children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
  const { network } = useContext<NetworkContextType>(NetworkContext);
  const [lucid, setLucid] = useState<Lucid>(null!);
  const [loading, setLoading] = useState<boolean>(false);
  const [lucidPlatform, setLucidPlatform] = useState<Lucid>(null!);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const currentNetwork = networks.find(function ({ networkName }) {
        return networkName === network;
      });
      const lucid = await Lucid.new(
        new Blockfrost(
          currentNetwork?.url as string,
          currentNetwork?.apiKey as string
        ),
        currentNetwork?.networkName as Network
      );
      setLucidPlatform(lucid);
      setLoading(false);
    })();
  }, [network]);

  return (
    <LucidContext.Provider value={{ loading, lucid, setLucid, lucidPlatform }}>
      {children}
    </LucidContext.Provider>
  );
};

export default LucidProvider;
