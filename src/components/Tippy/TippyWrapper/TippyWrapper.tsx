import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TippyWrapper = function ({ children, className }: Props) {
  return (
    <div
      className={`
            backdrop-blur-sm 
            bg-gradient-to-b 
            from-[rgba(53,52,74,0.72)] 
            to-[#313862] 
            border 
            border-[#7054d1] 
            p-4 
            rounded-xl 
            break-words 
            text-[1.2rem] 
            text-white 
            whitespace-normal 
            max-w-[25rem] 
            min-w-[15rem] 
            w-max 
            leading-[22px]
            ${className || ''}
        `}
    >
      {children}
    </div>
  );
};

export default TippyWrapper;
