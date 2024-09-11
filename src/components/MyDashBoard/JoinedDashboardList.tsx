'use client';

import { useState } from 'react';

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

  const { currentPage: paginationCurrentPage, handlePageChange } =
    usePagination({
      totalItems: localDashboards.length,
      itemsPerPage,
    });

  // 현재 페이지에 해당하는 대시보드 항목 계산
  const startIndex = (paginationCurrentPage - 1) * itemsPerPage;
  const currentDashboards = localDashboards.slice(
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
      {!loading && !error && (
        <>
          <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-6 gap-3 md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
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
            totalCount={localDashboards.length}
            currentPage={paginationCurrentPage}
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