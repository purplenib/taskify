import Pagination from './UI/Paigination';

export default function JoinedDashBoardList() {
  return (
    <section className="flex flex-col gap-3">
      <div className="grid grid-cols-3 grid-rows-2 gap-3">
        <button type="button">새로운 대시보드 +</button>
        <button type="button">대시보드 title1</button>
        <button type="button">대시보드 title2</button>
        <button type="button">대시보드 title3</button>
      </div>
      <Pagination />
    </section>
  );
}
