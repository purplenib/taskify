'use client';

import { useEffect } from 'react';

import { useRoot } from '@/src/core/contexts/RootContexts';
import { MyDashboardProvider } from '@core/contexts/MyDashboardProvider';
import InvitedDashboardList from 'src/components/MyDashBoard/InvitedDashboardList';
import JoinedDashboardList from 'src/components/MyDashBoard/JoinedDashboardList';

const AUTH_OBJECT = ['zero@naver.com', 'two@naver.com'];

export default function MyDashBoard() {
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
