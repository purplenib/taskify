import React, { MouseEvent, PropsWithChildren } from 'react';

import cn from '@lib/utils/cn';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonClassName?: string;
  divClassName?: string;
}

export default function AcceptButton({
  type = 'button',
  children,
  onClick,
  divClassName,
  buttonClassName,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center rounded-[4px]',
        divClassName
      )}
    >
      <button
        className={cn(
          'py-[7px] font-md-14px-medium md:px-[6px]',
          buttonClassName
        )}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
