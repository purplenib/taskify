import React, { MouseEvent, PropsWithChildren } from 'react';

import cn from '@lib/utils/cn';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function AcceptButton({
  type = 'button',
  children,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-[4px] font-md-14px-medium',
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
