import SearchForm from './UI/SearchForm';
import NoInvitedDashBoard from './UI/NoInvitedDashBoard';
import InvitedDashBoard from './UI/InvitedDashBoard';

export default function InvitedDashBoardList() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1 className="font-2xl-24px-bold">초대받은 대시보드</h1>
      <NoInvitedDashBoard />
      <SearchForm />
      <div className="m-auto flex w-[798px] justify-between text-gray-300">
        <h2>이름</h2>
        <h2>초대자</h2>
        <h2>수락 여부</h2>
      </div>
      <InvitedDashBoard />
    </section>
  );
}
