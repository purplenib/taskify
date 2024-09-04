import { PropsWithChildren } from 'react';

import Link from 'next/link';

interface LinkButtonProps {
  href: string;
}

export default function LinkButton({
  children,
  href,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-border-gray bg-transparent px-3 py-[3px] text-gray-400 hover:bg-gray-200 md:px-4 md:py-[6px]"
    >
      {children}
    </Link>
  );
}
