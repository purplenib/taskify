'use client';

import Image from 'next/image';
import Link from 'next/link';

import DashboardLayout from '@components/@shared/Layout/DashboardLayout';
import EditDashboard from '@components/edit/EditDashboard';
import InvitationList from '@components/edit/InvitationList';
import MemberList from '@components/edit/MemberList';

export default function DashBoardEditPage() {
  return (
    <DashboardLayout>
      <div className="relative mt-14 flex-1 overflow-y-auto bg-gray-50 p-4 md:mt-16 lg:mt-14">
        {/* 돌아가기 버튼 */}
        <Link
          href="/"
          className="absolute left-4 top-4 z-20 mb-4 flex items-center gap-2 md:left-6 md:top-6 lg:left-8 lg:top-8 xl:left-4"
        >
          <Image
            src="/icons/arrow_left.png"
            alt="돌아가기"
            width={16}
            height={16}
          />
          <span className="font-lg-16px-medium">돌아가기</span>
        </Link>

        {/* 메인 콘텐츠 */}
        <div className="mt-8 space-y-6 md:mt-14">
          <EditDashboard />
          <MemberList />
          <InvitationList />
          <button
            type="button"
            className="flex h-[52px] w-full max-w-md items-center justify-center rounded-lg border border-solid border-gray-200 shadow font-lg-16px-medium md:w-[320px]"
          >
            대시보드 삭제하기
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
