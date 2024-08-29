'use client';

import './globals.css';
import localFont from 'next/font/local';

const pretandard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootLayout>
        <body className={`${pretandard.variable}`}>{children}</body>
      </RootLayout>
    </html>
  );
}
