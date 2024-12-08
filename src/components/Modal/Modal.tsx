import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  toggle: () => void;
  isShowing: boolean;
  transparent?: boolean;
};

const Modal = function ({ toggle, children, isShowing, transparent }: Props) {
  if (!isShowing) return null;

  return (
    <main className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center overflow-hidden z-[10]">
      <section
        className="absolute w-full h-full bg-black bg-opacity-30"
        onClick={toggle}
      />
      <div className="relative z-[20]">{children}</div>
    </main>
  );
};

export default Modal;
