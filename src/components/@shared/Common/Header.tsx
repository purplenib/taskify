import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <header>
      <Image width={24} height={27} src="/images/small_logo.png" alt="logo" />
    </header>
  );
}
