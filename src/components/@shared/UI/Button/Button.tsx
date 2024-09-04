import React, { MouseEvent, PropsWithChildren } from 'react';

import cn from '@lib/utils/cn';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function Button({
  type = 'button',
  children,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'flex h-[54px] w-36 items-center justify-center rounded-lg font-md-14px-medium md:w-64',
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
