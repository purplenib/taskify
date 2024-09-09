/* eslint-disable import/order */
import useDashboardDetail from '@lib/hooks/useDashboardDetail';
import DashboardColorPicker from './DashboardColorPicker';
import { updateDashboard } from '@core/api/columnApis';

interface EditDashboardProps {
  dashboardId: number;
}

export default function EditDashboard({ dashboardId }: EditDashboardProps) {
  const {
    dashboardName,
    setDashboardName,
    dashboardColor,
    setDashboardColor,
    refetch,
  } = useDashboardDetail(dashboardId);

  const handleUpdate = async () => {
    // 대시보드 업데이트
    await updateDashboard(dashboardId, {
      title: dashboardName,
      color: dashboardColor,
    });
    refetch();
    window.location.reload();
  };

  return (
    <div className="max-w-[92%] rounded-lg bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <h2 className="mb-4 text-xl font-bold">{dashboardName}</h2>
      <div className="mb-4">
        <label htmlFor="dashboard-name" className="mb-2 block text-gray-700">
          대시보드 이름
        </label>
        <input
          id="dashboard-name"
          className="w-full rounded border border-gray-300 p-2"
          value={dashboardName}
          onChange={e => setDashboardName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2 block text-gray-700">색상 선택</div>
        <div className="align-start flex w-full">
          <DashboardColorPicker
            color={dashboardColor}
            setColor={setDashboardColor}
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        type="button"
        className="h-14 w-full rounded-lg bg-violet text-base text-white shadow md:h-16 md:text-lg"
      >
        변경
      </button>
    </div>
  );
}
