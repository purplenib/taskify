import React from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useRoot } from '@core/contexts/RootContexts';
import usedashboardInfo from '@lib/hooks/useDashBoardDetail';

function getTitleValue(pathname: string) {
  if (pathname === '/mydashboard') return '내 대시보드';
  if (pathname === '/mypage') return '계정 관리';
  return null;
}

export default function HeaderTitle() {
  const pathname = usePathname();
  const { dashboardid } = useRoot();
  const { dashboardDetail } = usedashboardInfo(dashboardid);
  const isManagedPage =
    pathname.includes('mydashboard') || pathname.includes('mypage');
  const titleValue = getTitleValue(pathname) || dashboardDetail?.title;

  return (
    <div
      className={`grow items-center font-xl-20px-bold xl:flex xl:gap-2 ${isManagedPage ? 'flex' : 'hidden'}`}
    >
      <h1>{titleValue}</h1>
      {!isManagedPage && dashboardDetail?.createdByMe && (
        <Image width={20} height={16} src="/icons/crown.png" alt="createByMe" />
      )}
    </div>
  );
}
