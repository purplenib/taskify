'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import UnAutherHeader from '@components/Common/UnAuthHeader';
import LandingBottom from '@components/Home/LandingBottom';
import LandingMain from '@components/Home/LandingMain';
import LandingTop from '@components/Home/LandingTop';

// import { useRoot } from '@core/contexts/RootContexts';

const dashBoardList = {
  dashboards: [
    {
      id: 0,
      title: 'string',
      color: 'string',
      createdAt: '2024-09-04T19:24:44.143Z',
      updatedAt: '2024-09-04T19:24:44.143Z',
      createdByMe: true,
      userId: 0,
    },
  ],
};

const user = 1;

export default function Home() {
  // const { user, dashBoardList } = useRoot();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const { dashboards } = dashBoardList;
      if (dashboards && dashboards.length > 0) {
        const firstDashboardId = dashboards[0]?.id;
        if (firstDashboardId) {
          router.push(`/dashboard/${firstDashboardId}`);
        }
      }
    }
  }, [router]);

  // if (user) {
  //   return null;
  // }

  return (
    <>
      <UnAutherHeader />
      <LandingTop />
      <LandingMain />
      <LandingBottom />
    </>
  );
}
