import Image from 'next/image';
import EditDashboard from '@/src/components/dashboardEdit/EditDashboard';
import MemberList from '@/src/components/dashboardEdit/MemberList';
import InvitationList from '@/src/components/dashboardEdit/InvitationList';

export default function DashBoardEditPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="h-[60px] w-full bg-white p-4 shadow-md md:h-[70px]">
        헤더
      </header>
      <div className="flex flex-1">
        <aside className="w-[67px] bg-gray-100 md:block md:w-[160px] xl:w-[300px]">
          사이드바
        </aside>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-center gap-2">
            <Image
              src="/icons/arrow_left.png"
              alt="돌아가기"
              width={16}
              height={16}
            />
            <span className="font-lg-16px-medium">돌아가기</span>
          </div>
          <div className="space-y-6">
            <EditDashboard />
            <MemberList />
            <InvitationList />
            <button
              type="button"
              className="flex h-[52px] w-full max-w-md items-center justify-center rounded-lg border border-solid border-gray-200 font-lg-16px-medium md:w-[320px]"
            >
              대시보드 삭제하기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
