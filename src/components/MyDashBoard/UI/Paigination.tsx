export default function Pagination() {
  return (
    <div className="flex">
      <p>
        {} 페이지 중 {}
      </p>
      <div>
        <button type="button">{'<'}</button>
        <button type="button">{'>'}</button>
      </div>
    </div>
  );
}
