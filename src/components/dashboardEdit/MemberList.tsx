export default function MemberList() {
  return (
    <div className="max-w-md rounded-lg border bg-white p-6 shadow-sm md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">구성원</h2>
        <div>페이지네이션</div>
      </div>

      <div>
        <div>이름</div>
        <div className="mb-4 flex items-center justify-between">
          <div>강동준</div>
          <button
            type="button"
            className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
