'use client';

import { useMyDashboard } from '@core/contexts/MyDashboardProvider';
import postDashboard from '@core/api/postDashboards';
import usePagination from '@lib/hooks/usePagination';
import Pagination from './UI/Pagination';

export default function JoinedDashboardList() {
  const { myDashboards, loading, error, addDashboard, fetchDashboards } =
    useMyDashboard();

  const itemsPerPage = 6;
  const {
    currentPage: paginationCurrentPage,
    totalPages,
    handlePageChange,
  } = usePagination({
    totalItems: myDashboards.length,
    itemsPerPage,
  });

  // 대시보드 생성 로직 구현 중입니다.
  const handleCreateDashboard = async (title: string, color: string) => {
    try {
      const createdDashboard = await postDashboard(title, color);

      // 로컬 상태에 추가
      addDashboard(createdDashboard);

      // 대시보드 목록 재패칭
      await fetchDashboards();
    } catch (err) {
      console.error('handleCreateDashboard fialed:', err);
    }
  };

  // 현재 페이지에 해당하는 대시보드 항목 계산
  const startIndex = (paginationCurrentPage - 1) * itemsPerPage;
  const currentDashboards = myDashboards.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // createdByMe가 true인 대시보드, false인 대시보드 분리
  const createdByMeDashboards = currentDashboards.filter(
    dashboard => dashboard.createdByMe
  );
  const notCreatedByMeDashboards = currentDashboards.filter(
    dashboard => !dashboard.createdByMe
  );

  return (
    <section className="flex flex-col gap-3">
      {loading && <div>나의 대시보드 목록을 불러오고 있습니다.</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 grid-rows-2 gap-3">
            <button type="button" onClick={handleCreateDashboard}>
              새로운 대시보드 +
            </button>
            {createdByMeDashboards.map(myDashboard => (
              <button key={myDashboard.id} type="button">
                {myDashboard.title}
              </button>
            ))}
            {notCreatedByMeDashboards.map(notCreatedByMeDashboard => (
              <button key={notCreatedByMeDashboard.id} type="button">
                {notCreatedByMeDashboard.title}
              </button>
            ))}
          </div>
          <Pagination
            totalCount={myDashboards.length}
            currentPage={paginationCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
