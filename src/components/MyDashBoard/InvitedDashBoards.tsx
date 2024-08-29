import EmptyDashBoard from '@/components/MyDashBoard/UI/EmptyDashBoard';
import SearchForm from './UI/SearchForm';

export default function InvitedDashBoards() {
  return (
    <section className="py-8">
      <h1>초대받은 대시보드</h1>
      <EmptyDashBoard />
      <SearchForm />

      <div className="flex">
        <h2>이름</h2>
        <h2>초대자</h2>
        <h2>수락 여부</h2>
      </div>

      <ul className="flex flex-col">
        <li className="flex">필터링할 데이터</li>
      </ul>
    </section>
  );
}
