import React from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import TippyWrapper from './TippyWrapper';
import { Placement } from 'tippy.js';

type Props = {
  children: React.ReactNode;
  render: React.ReactNode;
  placement?: Placement;
  interactive?: boolean;
  hideOnClick?: boolean;
  trigger?: string;
  className?: string;
  offset?: [number, number];
  onShow?: () => void;
  onHide?: () => void;
};

const Tippy = function ({
  children,
  onShow,
  onHide,
  offset,
  render,
  className,
  trigger = 'mouseenter',
  placement = 'top-start',
  hideOnClick = true,
  interactive = true,
}: Props) {
  return (
    <HeadlessTippy
      hideOnClick={hideOnClick}
      onShow={onShow}
      onHide={onHide}
      offset={offset}
      trigger={trigger}
      placement={placement}
      interactive={interactive}
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          <TippyWrapper className={className}>{render}</TippyWrapper>
        </div>
      )}
    >
      {/* Chỉ sử dụng lớp Tailwind CSS w-fit mà không có classNames */}
      <div className={`w-fit ${className || ''}`}>{children}</div>
    </HeadlessTippy>
  );
};

export default Tippy;
