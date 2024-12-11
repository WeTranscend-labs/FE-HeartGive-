import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import convertString from '@/helpers/convert-string';
import icons from '@/assets/icons';
import Tippy from '../Tippy/Tippy';

type WalletDropdownProps = {
    wallet: any;
    network: string;
    isCopied: boolean;
    disconnect: () => void;
    setIsCopied: (value: boolean) => void;
};

const WalletDropdown = ({
    wallet,
    network,
    isCopied,
    disconnect,
    setIsCopied
}: WalletDropdownProps) => {
    return (
        <section className="w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[300px] backdrop-blur-lg">
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-100">
                            <img
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                                src={wallet?.image}
                                alt="Wallet"
                            />
                        </div>
                        <div>
                            <p className="text-base font-semibold capitalize text-gray-900">{wallet.name}</p>
                            <div className="flex items-center mt-0.5">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700">
                                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-1.5 animate-pulse"></span>
                                    {network}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50/80 rounded-xl p-3.5 group hover:bg-gray-100/80 transition-colors">
                    <p className="text-sm text-gray-600 font-medium">
                        {convertString({
                            inputString: String(wallet.address),
                            numberOfFirstChar: 12,
                            numberOfLastChar: -12,
                        })}
                    </p>
                    <Tippy
                        hideOnClick={false}
                        placement="top"
                        render={isCopied ? <div>Copied!</div> : <div>Copy address</div>}
                    >
                        <CopyToClipboard
                            onCopy={() => setIsCopied(true)}
                            text={wallet?.address as string}
                        >
                            <button className="p-1.5 hover:bg-white rounded-lg transition-all opacity-60 group-hover:opacity-100">
                                <img className="w-4 h-4" src={icons.copy} alt="Copy" />
                            </button>
                        </CopyToClipboard>
                    </Tippy>
                </div>

                <div className="flex items-center justify-between bg-gray-50/80 rounded-xl p-3.5 hover:bg-gray-100/80 transition-colors">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 p-1.5 bg-primary-50 rounded-lg">
                            <img
                                className="w-full h-full object-cover"
                                src={icons.cardanoChartCoin}
                                alt="ADA"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">ADA</p>
                            <p className="text-xs text-gray-500">Cardano</p>
                        </div>
                    </div>
                    <p className="text-base font-bold text-gray-900">{wallet?.balance?.toFixed(5)} ₳</p>
                </div>
            </div>

            <button
                onClick={disconnect}
                className="w-full p-4 text-primary-600 hover:bg-gray-50 transition-colors text-sm font-semibold border-t flex items-center justify-center space-x-2"
            >
                <span>Disconnect</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </section>
    );
};

export default WalletDropdown;