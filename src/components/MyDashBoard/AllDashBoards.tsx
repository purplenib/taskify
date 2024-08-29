import Pagination from './UI/Paigination';

export default function AllDashBoards() {
  return (
    <section>
      <div className="grid grid-cols-3 grid-rows-2">
        <button type="button">새로운 대시보드 +</button>
        <button type="button">대시보드 title1</button>
        <button type="button">대시보드 title2</button>
        <button type="button">대시보드 title3</button>
      </div>
      <Pagination />
    </section>
  );
}
