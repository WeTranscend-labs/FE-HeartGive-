import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  isVisible?: boolean;
};

const TippyWrapper = function ({ children, className, isVisible = true }: Props) {
  if (!isVisible) return null;

  return (
    <div
      className={`
        transform
        transition-all
        duration-200
        ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
        bg-white
        shadow-xl
        shadow-gray-100/10
        border
        border-gray-100
        rounded-xl
        overflow-hidden
        backdrop-blur-lg
        backdrop-saturate-150
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
};

export default TippyWrapper;