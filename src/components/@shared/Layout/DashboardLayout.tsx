'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import { useRoot } from '@core/contexts/RootContexts';

import AuthHeader from '../Common/AuthHeader';
import SideBar from '../Common/SideBar';
import UnAuthHeader from '../Common/UnAuthHeader';

export default function DashboardLayout({
  children,
  dashboardid,
}: PropsWithChildren<{
  dashboardid: string | null;
}>) {
  const { user, dashboardid: id, setDashboardid } = useRoot();

  useEffect(() => {
    if (!id && dashboardid) {
      setDashboardid(dashboardid);
    }
  }, [dashboardid, setDashboardid, id]);

  return (
    <>
      {user ? <AuthHeader /> : <UnAuthHeader />}
      {user && <SideBar />}
      {children}
    </>
  );
}
