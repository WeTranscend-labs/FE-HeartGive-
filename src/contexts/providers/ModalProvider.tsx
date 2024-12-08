import React, { ReactNode } from 'react';
import ModalContext from '../components/ModalContext';
import useModal from '@/hooks/useModal';

type Props = {
  children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
  const { isShowing: isShowingWallet, toggle: toggleShowingWallet } =
    useModal();
  const { isShowing: isShowingTestNetwork, toggle: toggleTestNetwork } =
    useModal();
  const { isShowing: isShowingErrorNetwork, toggle: toogleErrorNetwork } =
    useModal();

  return (
    <ModalContext.Provider
      value={{
        isShowingErrorNetwork,
        toogleErrorNetwork,
        isShowingWallet,
        toggleShowingWallet,
        isShowingTestNetwork,
        toggleTestNetwork,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
