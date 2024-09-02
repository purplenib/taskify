import JoinedDashBoardList from '@/src/components/MyDashBoard/JoinedDashBoardList';
import InvitedDashBoardList from '@/src/components/MyDashBoard/InvitedDashBoardList';

export default function MyDashBoard() {
  return (
    <>
      <header>헤더</header>
      <aside>사이드</aside>
      <main className="flex flex-col gap-12 bg-gray-50 px-6 pt-6">
        <JoinedDashBoardList />
        <InvitedDashBoardList />
      </main>
    </>
  );
}
