import { LucidContextType } from '@/types/contexts/LucidContextType';
import React, { ReactNode, useContext, useState, useEffect } from 'react';
import LucidContext from '../components/LucidContext';
import { ModalContextType } from '@/types/contexts/ModalContextType';
import ModalContext from '../components/ModalContext';
import { NetworkType, WalletType } from '@/types/GenericType';
import { NetworkContextType } from '@/types/contexts/NetworkContextType';
import NetworkContext from '../components/NetworkContext';
import { Blockfrost, Lucid, Network, UTxO } from 'lucid-cardano';
import WalletContext from '../components/WalletContext';
import { networks } from '@/constants/networks';
import wallets from '@/constants/wallets';
import checkNetwork from '@/helpers/check-network';
import fetchPublicKeyHash from '@/utils/fetchPublicKeyHash';

type Props = {
  children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
  const { lucid, setLucid } = useContext<LucidContextType>(LucidContext);
  const {
    toogleErrorNetwork,
    isShowingErrorNetwork,
    isShowingWallet,
    toggleShowingWallet,
    isShowingTestNetwork,
    toggleTestNetwork,
  } = useContext<ModalContextType>(ModalContext);
  const [wallet, setWallet] = useState<WalletType>(null!);
  const [loading, setLoading] = useState<boolean>(false);
  const { network } = useContext<NetworkContextType>(NetworkContext);

  useEffect(() => {
    const walletConnecttion = localStorage.getItem('wallet');
    if (walletConnecttion) {
      const walletConnected = JSON.parse(walletConnecttion);

      wallets.forEach(async function (wallet: WalletType) {
        const publicKeyHash = await fetchPublicKeyHash(lucid);

        if (wallet.name.toLowerCase() === walletConnected.name) {
          await connect({
            name: wallet.name,
            api: wallet.api,
            checkApi: wallet.checkApi,
            image: wallet.image,
            publicKeyHash: publicKeyHash,
          });
          return;
        }
      });
    }
    //  react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (wallet) {
      localStorage.setItem(
        'wallet',
        JSON.stringify({
          name: wallet.name.toLowerCase(),
          connectedAt: new Date().getTime(),
        })
      );
    }
    // react-hooks/exhaustive-deps
  }, [wallet]);

  const connect = async function ({ name, api, image, checkApi }: WalletType) {
    try {
      setLoading(true);
      const currentNetwork = networks.find(function ({ networkName }) {
        return networkName === network;
      });

      console.log(currentNetwork);

      const lucid = await Lucid.new(
        new Blockfrost(
          'https://cardano-preview.blockfrost.io/api/v0',
          'previewOUGYFtFqq5PnuAhyTBqea5P5Czm5f0oG'
        ),
        'Preview'
      );

      lucid.selectWallet(await api());

      const address: string = (await lucid.wallet.address()) as string;
      const networkConnection: Network = checkNetwork({
        address: address as string,
        pattern: 'test',
      });
      if (networkConnection !== network && !isShowingErrorNetwork) {
        toggleShowingWallet();
        toogleErrorNetwork();
        return;
      }

      if (network === 'Preview' && !isShowingTestNetwork) {
        toggleTestNetwork();
      }

      const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
      const utxos: Array<UTxO> = (await lucid.wallet.getUtxos()) as Array<UTxO>;
      const { poolId } = await lucid.delegationAt(stakeKey as string);
      const balance: number = utxos.reduce(function (
        balance: number,
        utxo: UTxO
      ) {
        return balance + Number(utxo.assets.lovelace) / 1000000;
      },
      0);

      const publicKeyHash = await fetchPublicKeyHash(lucid);

      setWallet(function (previous: WalletType) {
        return {
          ...previous,
          name: name,
          image: image,
          address: address,
          balance: balance,
          stakeKey: stakeKey,
          poolId: poolId,
          publicKeyHash: publicKeyHash,
        };
      });
      setLucid(lucid);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async function () {
    try {
      setWallet(null!);
      setLucid(null!);
      if (isShowingErrorNetwork) {
        toogleErrorNetwork();
      }

      localStorage.removeItem('wallet');
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async function () {
    try {
      setLoading(true);
      const address: string = await lucid.wallet.address();
      const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
      const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
      const { poolId } = await lucid.delegationAt(stakeKey as string);
      const balance: number = utxos.reduce(function (balance, utxo) {
        return balance + Number(utxo.assets.lovelace) / 1000000;
      }, 0);
      const publicKeyHash = await fetchPublicKeyHash(lucid);

      setWallet(function (previous: WalletType) {
        return {
          ...previous,
          address: address,
          balance: balance,
          stakeKey: stakeKey,
          poolId: poolId,
          publicKeyHash: publicKeyHash,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WalletContext.Provider
      value={{ connect, wallet, disconnect, refresh, loading }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
