import '@mantine/core/styles.css';
import './globals.css';
import { MantineProvider } from '@mantine/core';
import localFont from 'next/font/local';
import { headers } from 'next/headers';

import DashboardLayout from '@components/@shared/Layout/DashboardLayout';
import DeviceProvider from '@core/contexts/DeviceContext';
import RootProvider from '@core/contexts/RootContexts';

import type { Metadata } from 'next';

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
  const responseHeader = headers();
  const dashboardid = responseHeader.get('x-dashboardid');

  return (
    <html lang="en">
      <body className={`${pretandard.variable}`}>
        <MantineProvider>
          <DeviceProvider>
            <RootProvider>
              <DashboardLayout
                params={{
                  dashboardid,
                }}
              >
                {children}
              </DashboardLayout>
            </RootProvider>
          </DeviceProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
