import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  toggle: () => void;
  isShowing: boolean;
  width?: string; // Độ rộng của sidebar, ví dụ: "w-1/3", "w-full"
};

const Modal = function ({ toggle, children, isShowing, width = 'w-1/3' }: Props) {
  return (
    <main
      className={`fixed top-0 left-0 right-0 bottom-0 z-[50] ${isShowing ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
    >
      {/* Overlay */}
      <section
        className={`absolute w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={toggle}
      />
      {/* Sidebar Content */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${isShowing ? 'translate-x-0' : 'translate-x-full'
          } ${width}`}
      >
        {/* Close Button */}
        <button
          onClick={toggle}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close Sidebar"
        >
          ✖
        </button>
        {children}
      </div>
    </main>
  );
};

export default Modal;
