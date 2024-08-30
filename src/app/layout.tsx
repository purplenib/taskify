import '@mantine/core/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import RootProvider from '@core/contexts/RootContexts';
import Layout from '@components/@shared/Layout/Layout';

const pretandard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'taskify',
  description: '대시보드를 통해 일정을 공유해보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretandard.variable}`}>
        <RootProvider>
          <Layout>{children}</Layout>
        </RootProvider>
      </body>
    </html>
  );
}
