'use client';

import { useEffect } from 'react';

import { useRoot } from '@/src/core/contexts/RootContexts';
import InvitedDashboardList from '@components/MyDashboard/InvitedDashboardList';
import JoinedDashboardList from '@components/MyDashboard/JoinedDashboardList';
import { MyDashboardProvider } from '@core/contexts/MyDashboardContext';

const AUTH_OBJECT = ['zero@naver.com', 'two@naver.com'];

export default function Mydashboard() {
  const { login } = useRoot();

  useEffect(() => {
    const handleLogin = async () => {
      await login({ email: AUTH_OBJECT[0], password: '12345678' });
    };
    handleLogin();
  }, [login]);

  return (
    <MyDashboardProvider>
      <main className="ml-[67px] mt-[60px] flex flex-col gap-12 bg-gray-50 px-6 pt-6 md:ml-[160px] md:mt-[70px] xl:ml-[300px]">
        <JoinedDashboardList />
        <InvitedDashboardList />
      </main>
    </MyDashboardProvider>
  );
}
