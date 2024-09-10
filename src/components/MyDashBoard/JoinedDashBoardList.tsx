'use client';

import { useState, useCallback } from 'react';

import DashboardAddModal from '@components/@shared/Common/Modals/DashboardAddModal';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';
import usePagination from '@lib/hooks/usePagination';

import CreateDashboardButton from './UI/CreateDashboardButton';
import DashboardCard from './UI/DashboardCard';
import Pagination from './UI/Pagination';

export default function JoinedDashboardList() {
  const { localDashboards, loading, error } = useMyDashboard();
  const [modalOpened, setModalOpened] = useState(false);

  const itemsPerPage = 5;

  const fetchDashboards = useCallback(
    async (page: number, size: number) => {
      const startIndex = (page - 1) * size;
      return localDashboards.slice(startIndex, startIndex + size);
    },
    [localDashboards]
  );

  const {
    currentPage: paginationCurrentPage,
    handlePageChange,
    data: currentDashboards,
  } = usePagination({
    fetchData: fetchDashboards,
    totalItems: localDashboards.length,
    itemsPerPage,
  });

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
            <CreateDashboardButton onClick={() => setModalOpened(true)} />
            {createdByMeDashboards.map(myDashboard => (
              <DashboardCard key={myDashboard.id} value={myDashboard} />
            ))}
            {notCreatedByMeDashboards.map(notCreatedByMeDashboard => (
              <DashboardCard
                key={notCreatedByMeDashboard.id}
                value={notCreatedByMeDashboard}
              />
            ))}
          </div>
          <Pagination
            currentPage={paginationCurrentPage}
            totalItems={localDashboards.length}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
          <DashboardAddModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
        </>
      )}
    </section>
  );
}
