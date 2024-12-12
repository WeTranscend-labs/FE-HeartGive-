import React from 'react';
import Modal from '@/components/Modal';
import icons from '@/assets/icons';
import configs from '@/configs';
import { WalletType } from '@/types/GenericType';
import WalletItem from '@/components/WalletItem';

type WalletModalProps = {
  isShowing: boolean;
  toggle: () => void;
  accept: boolean;
  handleAccept: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wallets: WalletType[];
};

const WalletModal = ({
  isShowing,
  toggle,
  accept,
  handleAccept,
  wallets,
}: WalletModalProps) => {
  return (
    <Modal isShowing={isShowing} toggle={toggle}>
      <div className="bg-white rounded-2xl p-6 max-w-[480px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            Connect Wallet
          </h1>
          <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <img className="w-4 h-4" src={icons.close} alt="Close" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              onChange={handleAccept}
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              By checking this box and connecting my wallet, I confirm that I
              have read, understood, and agreed to the{' '}
              <a
                href={configs.routes.about}
                target="_blank"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>

        <div className="space-y-3">
          {wallets.map((wallet: WalletType, index: number) => (
            <WalletItem wallet={wallet} key={index} accept={accept} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
