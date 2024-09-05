import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line sort-imports

import EditDashboard from '@components/edit/EditDashboard';
import InvitationList from '@components/edit/InvitationList';
import MemberList from '@components/edit/MemberList';


export default function DashBoardEditPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="h-[60px] w-full bg-white p-4 shadow-md md:h-[70px]">
        헤더
      </header>
      <div className="flex flex-1">

        <aside className="w-[60px] bg-gray-200 md:block md:w-[160px] xl:w-[300px]">

          사이드바
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {/* 경로 임시로 지정해둔 것 */}
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image
              src="/icons/arrow_left.png"
              alt="돌아가기"
              width={16}
              height={16}
            />
            <span className="font-lg-16px-medium">돌아가기</span>
          </Link>
          <div className="space-y-6">
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
        </main>
      </div>
    </div>
  );
}
