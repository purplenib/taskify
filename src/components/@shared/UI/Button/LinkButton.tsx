import { PropsWithChildren } from 'react';

import Link from 'next/link';

import cn from '@lib/utils/cn';

interface LinkButtonProps {
  href: string;
  className?: string;
}

export default function LinkButton({
  children,
  href,
  className = '',
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg border border-border-gray bg-transparent px-3 py-[3px] text-gray-400 hover:bg-gray-200 md:px-4 md:py-[6px]',
        className
      )}
    >
      {children}
    </Link>
  );
}
