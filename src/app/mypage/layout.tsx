import React, { PropsWithChildren } from 'react';
import DashboardLayout from '@components/@shared/Layout/DashboardLayout';

export default function Layout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    dashboardid: string;
  };
}>) {
  return <DashboardLayout params={params}>{children}</DashboardLayout>;
}
