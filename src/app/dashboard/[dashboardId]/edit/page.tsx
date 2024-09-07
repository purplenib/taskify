/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */

'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// eslint-disable-next-line import/order
import { useRoot } from '@core/contexts/RootContexts';

import EditDashboard from '@components/edit/EditDashboard';
import InvitationList from '@components/edit/InvitationList';
import MemberList from '@components/edit/MemberList';

import { deleteDashboard } from '@core/api/dashboardApi';

const AUTH_OBJECT = [
  'ex3222@gmail.com',
  'ex32221@gmail.com',
  'ex32222@gmail.com',
  'ex32223@gmail.com',
];

export default function DashBoardEditPage() {
  const { login } = useRoot();
  const pathname = usePathname();
  const router = useRouter();

  const dashboardId = pathname.split('/')[2];

  useEffect(() => {
    const handleLogin = async () => {
      await login({ email: AUTH_OBJECT[0], password: '123123123' });
    };
    handleLogin();
  }, [login]);

  // 돌아가기 버튼
  const handleGoBack = () => {
    router.push(`/dashboard/${dashboardId}`);
  };

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    await deleteDashboard(dashboardId);
    alert('대시보드 삭제 완료!');
    router.push('/');
  };

  return (
    <div className="relative left-12 mt-14 flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 md:left-40 md:mt-16 lg:mt-14 xl:left-[300px]">
      {/* 돌아가기 버튼 */}
      <button
        onClick={handleGoBack}
        className="absolute left-8 top-4 z-20 mb-4 flex items-center gap-2 md:left-8 md:top-6 lg:left-8 lg:top-8 xl:left-8"
      >
        <Image
          src="/icons/arrow_left.png"
          alt="돌아가기"
          width={16}
          height={16}
        />
        <span className="font-lg-16px-medium">돌아가기</span>
      </button>

      {/* 메인 콘텐츠 */}
      <div className="mt-8 space-y-6 px-4 md:mt-14">
        <EditDashboard dashboardId={Number(dashboardId)} />
        <MemberList dashboardId={Number(dashboardId)} />
        <InvitationList dashboardId={Number(dashboardId)} />
        <button
          onClick={handleDeleteDashboard}
          type="button"
          className="flex h-[52px] w-full max-w-[92%] items-center justify-center rounded-lg border border-solid border-gray-200 shadow font-lg-16px-medium md:w-[320px]"
        >
          대시보드 삭제하기
        </button>
      </div>
    </div>
  );
}
