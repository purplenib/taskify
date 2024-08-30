import React, { PropsWithChildren } from 'react';
import Header from '../Common/Header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
