'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import UnAutherHeader from '@components/Common/UnAuthHeader';
import LandingBottom from '@components/Home/LandingBottom';
import LandingMain from '@components/Home/LandingMain';
import LandingTop from '@components/Home/LandingTop';
// import { useRoot } from '@core/contexts/RootContexts';

// 최신 dev 문제가 생겨 useRoot 이용에 제한이 생겨서
// 같은 형태의 데이터를 만들어서 사용했습니다.

const { user, dashBoardList } = {
  user: 1,
  dashBoardList: {
    dashboards: [
      {
        id: 0,
      },
    ],
  },
};

export default function Home() {
  // const { user, dashBoardList} = useRoot();
  const router = useRouter();

  useEffect(() => {
    function handleUserDashboardRedirect() {
      if (user && dashBoardList.dashboards?.length > 0) {
        const firstDashboardId = dashBoardList.dashboards[0].id;
        if (firstDashboardId !== undefined) {
          router.push(`/dashboard/${firstDashboardId}`);
        }
      }
    }

    handleUserDashboardRedirect();
  }, [router]);
  // useRoot 사용시 디펜던시 [user, dashBoardList, router]

  if (user) return null;

  return (
    <>
      <UnAutherHeader />
      <LandingTop />
      <LandingMain />
      <LandingBottom />
    </>
  );
}
