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
import WalletModalContext from '../components/WalletModalContext';

type Props = {
  children: ReactNode;
};

const adminAddresses: String[] = [
  'addr_test1qraxvmzu6p389au4gw4al58x6k93dmxu6zpx478lw8yv9waasan8r2pmhp044yugrqy4hvee6843tewn7hkvuws9lezqtfgu9f',
  'addr_test1qquve965erclvur9z3allf85h4xck7lm7hx3fsgkpmft9cdkhqt9cfgur0e6vygwrcarzgn0ck3yrnuq99cp0g4w4eyqjtg669',
];

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

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { closeModal } = useContext(WalletModalContext);


  useEffect(() => {
    autoConnectWallet();
  }, []);

  // useEffect(() => {
  //   if (wallet) {
  //     localStorage.setItem(
  //       'walletConnecttion',
  //       JSON.stringify({
  //         name: wallet.name.toLowerCase(),
  //         connectedAt: new Date().getTime(),
  //       })
  //     );
  //   }
  //   // react-hooks/exhaustive-deps
  // }, [wallet]);

  // Hàm lưu thông tin ví vào localStorage
  const saveWalletToLocalStorage = (walletInfo: {
    name: string;
    address: string;
    publicKeyHash: string;
  }) => {
    localStorage.setItem(
      'walletConnection',
      JSON.stringify({
        name: walletInfo.name.toLowerCase(),
        address: walletInfo.address,
        publicKeyHash: walletInfo.publicKeyHash,
        connectedAt: new Date().getTime(),
      })
    );
  };

  const getWalletFromLocalStorage = () => {
    const storedWallet = localStorage.getItem('walletConnection');
    return storedWallet ? JSON.parse(storedWallet) : null;
  };

  // Hàm kết nối ví tự động từ localStorage
  const autoConnectWallet = async () => {
    const storedWallet = getWalletFromLocalStorage();

    if (storedWallet) {
      try {
        // Tìm wallet phù hợp trong danh sách wallets
        const matchedWallet = wallets.find(
          (wallet) => wallet.name.toLowerCase() === storedWallet.name
        );

        if (matchedWallet) {
          await connect({
            name: matchedWallet.name,
            api: matchedWallet.api,
            checkApi: matchedWallet.checkApi,
            image: matchedWallet.image,
            publicKeyHash: storedWallet.publicKeyHash,
          });
        }
      } catch (error) {
        console.error('Auto connect failed:', error);
        // Xóa localStorage nếu kết nối thất bại
        localStorage.removeItem('walletConnection');
      }
    }
  };

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

      const isAdmin = adminAddresses.includes(address);
      setIsAdmin(isAdmin);

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

      saveWalletToLocalStorage({
        name,
        address,
        publicKeyHash,
      });

      closeModal();

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
      setIsAdmin(false);
      if (isShowingErrorNetwork) {
        toogleErrorNetwork();
      }

      localStorage.removeItem('walletConnection');
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

  console.log(isAdmin);

  return (
    <WalletContext.Provider
      value={{ connect, wallet, disconnect, refresh, loading, isAdmin }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
