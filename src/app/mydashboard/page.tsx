'use client';

import InvitedDashboardList from 'src/components/MyDashBoard/InvitedDashboardList';
import JoinedDashboardList from 'src/components/MyDashBoard/JoinedDashboardList';
import { MyDashboardProvider } from '@core/contexts/MyDashboardProvider';

export default function MyDashBoard() {
  return (
    <MyDashboardProvider>
      <header>헤더</header>
      <aside>사이드</aside>
      <main className="flex flex-col gap-12 bg-gray-50 px-6 pt-6">
        <JoinedDashboardList />
        <InvitedDashboardList />
      </main>
    </MyDashboardProvider>
  );
}
