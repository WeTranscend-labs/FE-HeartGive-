import React, { ChangeEvent, useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from '@/components/Modal';
import icons from '@/assets/icons';
import configs from '@/configs';
import wallets from '@/constants/wallets';
import { WalletType } from '@/types/GenericType';
import WalletItem from '@/components/WalletItem';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import LucidContext from '@/contexts/components/LucidContext';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import WalletContext from '@/contexts/components/WalletContext';
import convertString from '@/helpers/convert-string';
import Tippy from '@/components/Tippy';
import { NetworkContextType } from '@/types/contexts/NetworkContextType';
import NetworkContext from '@/contexts/components/NetworkContext';
import { ModalContextType } from '@/types/contexts/ModalContextType';
import ModalContext from '@/contexts/components/ModalContext';
import { Button } from '../ui/button';

type Props = {
  className?: string;
};

const ConnectWallet = function ({ className }: Props) {
  const {
    isShowingErrorNetwork,
    toogleErrorNetwork,
    isShowingWallet,
    toggleShowingWallet,
    isShowingTestNetwork,
    toggleTestNetwork,
  } = useContext<ModalContextType>(ModalContext);
  const { network } = useContext<NetworkContextType>(NetworkContext);
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const { wallet, disconnect } = useContext<WalletContextType>(WalletContext);
  const [accept, setAccept] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShowTippy, setIsShowTippy] = useState<boolean>(false);

  const handleAccept = function (event: ChangeEvent<HTMLInputElement>) {
    setAccept(event.target.checked);
  };

  return (
    <div className={`relative ${className}`}>
      <Tippy
        onHide={() => setIsShowTippy(false)}
        onShow={() => setIsShowTippy(lucid ? true : false)}
        offset={[0, 0]}
        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        trigger="click"
        interactive
        placement="bottom-start"
        render={
          <div>
            {wallet && (
              <section className="w-full bg-gradient-to-b from-[#1D2345] to-[#3A426F] rounded-b-lg text-white">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full object-cover"
                        src={wallet?.image}
                        alt="Wallet"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold capitalize">
                          {wallet.name}
                        </p>
                        <p className="flex items-center bg-[#444C7C] rounded-md px-2 text-xs font-normal">
                          <span className="bg-[#86F7B3] rounded-full w-3 h-3 inline-block mr-1"></span>
                          {network}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        {convertString({
                          inputString: String(wallet.address),
                          numberOfFirstChar: 13,
                          numberOfLastChar: -16,
                        })}
                        <Tippy
                          hideOnClick={false}
                          placement={'top-end'}
                          render={
                            isCopied ? (
                              <div>Copied.</div>
                            ) : (
                              <div>Copy to clipboard.</div>
                            )
                          }
                        >
                          <CopyToClipboard
                            onCopy={() => setIsCopied(true)}
                            text={wallet?.address as string}
                          >
                            <img
                              className="w-4 h-4 cursor-pointer"
                              src={icons.copy}
                              alt="Copy Address"
                            />
                          </CopyToClipboard>
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-t border-[#444C7C] p-4">
                  <div className="mr-4 w-7 h-7">
                    <img
                      className="w-full h-full object-cover"
                      src={icons.cardanoChartCoin}
                      alt="ADA"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="font-bold">ADA</p>
                      <p className="text-sm">Cardano</p>
                    </div>
                    <div className="text-lg font-semibold">
                      {wallet?.balance?.toFixed(5)} ₳
                    </div>
                  </div>
                </div>
                <div
                  onClick={disconnect}
                  className="p-4 text-[#D5AA68] text-center cursor-pointer"
                >
                  Disconnect
                </div>
              </section>
            )}
          </div>
        }
      >
        <Button
          onClick={toggleShowingWallet}
          className={`flex items-center justify-center text-lg font-medium p-4 rounded-xl border transition-all duration-200 ease-out ${isShowTippy && wallet ? 'bg-gradient-to-br from-[#7054D1] to-[#AB56C9]' : 'bg-transparent border-[#DBDBDB] text-[#333] hover:bg-gray-100'}`}
        >
          {lucid ? (
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-xs">
                  {wallet?.balance && wallet.balance.toFixed(6)} ₳
                </p>
                <p className="text-sm">
                  {convertString({
                    inputString: String(wallet?.address),
                    numberOfFirstChar: 7,
                    numberOfLastChar: -6,
                  })}
                </p>
              </div>
              <img className="w-6 h-6" src={wallet?.image} alt="Wallet" />
              <img
                className="w-4 h-4"
                src={icons.arrowBottom}
                alt="Arrow Down"
              />
            </div>
          ) : (
            <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
              {isShowingErrorNetwork ? 'Wrong Network' : 'Connect Wallet'}
            </span>
          )}
        </Button>
      </Tippy>

      {!lucid && (
        <Modal isShowing={isShowingWallet} toggle={toggleShowingWallet}>
          <div className="bg-white rounded-lg p-8 max-w-[57rem] max-h-[80vh] overflow-y-auto">
            <section
              onClick={toggleShowingWallet}
              className="absolute top-4 right-4 p-2 cursor-pointer rounded-full hover:bg-gray-100"
            >
              <img className="w-4 h-4" src={icons.close} alt="Close" />
            </section>
            <h1 className="text-2xl font-semibold mb-6">Connect Wallet</h1>
            <section className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  onChange={handleAccept}
                  type="checkbox"
                  className="mr-2"
                />
                <label className="text-sm">
                  By checking this box and connecting my wallet, I confirm that
                  I have read, understood, and agreed to the
                  <a
                    href={configs.routes.about}
                    target="_blank"
                    className="underline text-[#333]"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </section>
            <section className="">
              {wallets.map(function (wallet: WalletType, index: number) {
                return (
                  <WalletItem wallet={wallet} key={index} accept={accept} />
                );
              })}
            </section>
          </div>
        </Modal>
      )}

      <Modal toggle={toogleErrorNetwork} isShowing={isShowingErrorNetwork}>
        <div className="bg-[#444C7C] text-white rounded-lg p-8 max-w-[450px] mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Wallet Network Error</h2>
          <p className="text-lg mb-6">
            Please change the network to preprod or disconnect
          </p>
          <div className="flex justify-center">
            <Button
              onClick={disconnect}
              className="bg-gradient-to-br from-[#7054D1] to-[#AB56C9] text-white p-4 rounded-lg"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConnectWallet;
