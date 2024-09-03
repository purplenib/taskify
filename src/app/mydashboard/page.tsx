<<<<<<< HEAD
'use client';

import InvitedDashBoardList from 'src/components/MyDashBoard/InvitedDashBoardList';
import JoinedDashBoardList from 'src/components/MyDashBoard/JoinedDashBoardList';
import { MyDashboardProvider } from '@core/contexts/MyDashboardProvider';

export default function MyDashBoard() {
  return (
    <MyDashboardProvider>
=======
import JoinedDashBoardList from '@/src/components/MyDashBoard/JoinedDashBoardList';
import InvitedDashBoardList from '@/src/components/MyDashBoard/InvitedDashBoardList';

export default function MyDashBoard() {
  return (
    <>
>>>>>>> decc019688b55116340a2e1a34ca20ebfd0f5c7a
      <header>헤더</header>
      <aside>사이드</aside>
      <main className="flex flex-col gap-12 bg-gray-50 px-6 pt-6">
        <JoinedDashBoardList />
        <InvitedDashBoardList />
      </main>
<<<<<<< HEAD
    </MyDashboardProvider>
=======
    </>
>>>>>>> decc019688b55116340a2e1a34ca20ebfd0f5c7a
  );
}
