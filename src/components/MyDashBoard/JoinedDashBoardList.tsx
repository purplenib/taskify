'use client';

import { useState } from 'react';
import { useMyDashboard } from '@core/contexts/MyDashboardProvider';
import Pagination from './UI/Paigination';

export default function JoinedDashBoardList() {
  const { joinedDashboards, loading, error, addDashboard } = useMyDashboard();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleAddDashboard = () => {
    const newDashboard = {
      id: Date.now(),
      title: `대시보드 ${joinedDashboards.length + 1}`,
    };
    addDashboard(newDashboard); // Context에 대시보드 추가
  };

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
            {joinedDashboards.map(dashboard => (
              <button key={dashboard.id} type="button">
                {dashboard.title}
              </button>
            ))}
          </div>
          <Pagination
            totalCount={joinedDashboards.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
