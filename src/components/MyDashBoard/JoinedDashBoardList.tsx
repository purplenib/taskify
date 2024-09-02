'use client';

import {
  INITIAL_DASHBOARDS_REQUEST,
  INITIAL_DASHBOARDS_RESPONSE,
} from '@lib/constants/initialValue';
import { useState } from 'react';
import useApiGet from '@lib/hooks/useApiGet';
import getDashboards from '@core/api/getDashboards';
import Pagination from './UI/Paigination';

export default function JoinedDashBoardList() {
  const [currentPage, setCurrentPage] = useState<number>(
    INITIAL_DASHBOARDS_REQUEST.page
  );

  const { data, loading, error } = useApiGet(
    getDashboards,
    INITIAL_DASHBOARDS_REQUEST,
    INITIAL_DASHBOARDS_RESPONSE
  );

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  return (
    <section className="flex flex-col gap-3">
      {loading && <div>나의 대시보드 목록을 불러오고 있습니다.</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 grid-rows-2 gap-3">
            <button type="button">새로운 대시보드 +</button>
            {data.dashboards.map(dashboard => (
              <button key={dashboard.id} type="button">
                {dashboard.title}
              </button>
            ))}
          </div>
          <Pagination
            totalCount={data.totalCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
