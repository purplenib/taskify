import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useDevice from '@lib/hooks/useDevice';

export default function Logo() {
  const device = useDevice();

  const isMobile = device === 'mobile';

  return (
    <Link href="/">
      {isMobile && (
        <Image width={24} height={28} src="/images/small_logo.png" alt="logo" />
      )}
      {!isMobile && (
        <Image
          width={110}
          height={33}
          src="/images/large_logo.png"
          alt="logo"
        />
      )}
    </Link>
  );
}
