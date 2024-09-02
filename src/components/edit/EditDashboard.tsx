export default function EditDashboard() {
  return (
    <div className="max-w-md rounded-lg bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <h2 className="mb-4 text-xl font-bold">비브리지</h2>
      <div className="mb-4">
        <label htmlFor="dashboard-name" className="mb-2 block text-gray-700">
          대시보드 이름
        </label>
        <input
          id="dashboard-name"
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>
      <div className="mb-6">
        <div className="mb-2 block text-gray-700">색상 선택</div>
        <div>
          <span>색1 </span>
          <span>색2 </span>
          <span>색3</span>
        </div>
      </div>
      <button
        type="button"
        className="h-14 w-full rounded-lg bg-violet text-base text-white shadow md:h-16 md:text-lg"
      >
        변경
      </button>
    </div>
  );
}
