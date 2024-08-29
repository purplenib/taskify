import AllDashBoards from '@/components/MyDashBoard/AllDashBoards';
import InvitedDashBoards from '@/components/MyDashBoard/InvitedDashBoards';

export default function MyDashBoard() {
  return (
    <>
      <header>헤더</header>
      <aside>사이드</aside>
      <main>
        <AllDashBoards />
        <InvitedDashBoards />
      </main>
    </>
  );
}
