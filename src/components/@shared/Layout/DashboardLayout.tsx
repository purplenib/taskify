'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import { useRoot } from '@core/contexts/RootContexts';

import AuthHeader from '../Common/AuthHeader';
import SideBar from '../Common/SideBar';
import UnAuthHeader from '../Common/UnAuthHeader';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { user, dashboardid, setDashboardid } = useRoot();

  useEffect(() => {
    if (dashboardid) {
      setDashboardid(dashboardid);
    }
  }, [dashboardid, setDashboardid]);

  return (
    <>
      {user ? <AuthHeader /> : <UnAuthHeader />}
      {user && <SideBar />}
      {children}
    </>
  );
}
