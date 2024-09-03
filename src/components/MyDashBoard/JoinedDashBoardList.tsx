'use client';

import { useMyDashboard } from '@core/contexts/MyDashboardProvider';
import Pagination from './UI/Pagination';
import usePagination from '@lib/hooks/usePagination';

export default function JoinedDashBoardList() {
  const { joinedDashboards, loading, error, addDashboard, fetchDashboards } =
    useMyDashboard();

  const itemsPerPage = 6; // 페이지당 표시할 아이템 수
  const {
    currentPage: paginationCurrentPage,
    totalPages,
    handlePageChange,
  } = usePagination({
    totalItems: joinedDashboards.length,
    itemsPerPage,
  });

  const handleAddDashboard = async () => {
    const newDashboard = {
      id: Date.now(),
      title: `대시보드 ${joinedDashboards.length + 1}`,
    };

    if (newDashboard) {
      addDashboard(newDashboard);
      await fetchDashboards();
    }
  };

  // 현재 페이지에 해당하는 대시보드 항목 계산
  const startIndex = (paginationCurrentPage - 1) * itemsPerPage;
  const currentDashboards = joinedDashboards.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="flex flex-col gap-3">
      {loading && <div>나의 대시보드 목록을 불러오고 있습니다.</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 grid-rows-2 gap-3">
            <button type="button" onClick={handleAddDashboard}>
              새로운 대시보드 +
            </button>
            {currentDashboards.map(dashboard => (
              <button key={dashboard.id} type="button">
                {dashboard.title}
              </button>
            ))}
          </div>
          <Pagination
            totalCount={joinedDashboards.length}
            currentPage={paginationCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
