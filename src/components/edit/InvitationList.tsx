'use client';

import Image from 'next/image';
import Pagination from '@/src/components/edit/Pagination';
import usePagination from '@/src/lib/hooks/usePaginavigation';

// 테스트용 더미 데이터
interface Item {
  id: number;
  email: string;
}

const dummyEmailData: Item[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
}));

export default function InvitationList() {
  const itemsPerPage = 5;
  const { currentPage, handlePageChange } = usePagination({
    totalItems: dummyEmailData.length,
    itemsPerPage,
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyEmailData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="max-w-md rounded-md bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      {/* 초대 내역 + 페이지네이션 (초대하기 버튼은 아래로 이동) */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-lg-16px-bold md:font-xl-20px-bold">초대 내역</h2>
        <Pagination
          currentPage={currentPage}
          totalItems={dummyEmailData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* 이메일 레이블과 초대하기 버튼을 나란히 배치 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-gray-600 font-lg-16px-regular">이메일</div>
        {/* 초대하기 버튼 */}
        <button
          type="button"
          className="flex h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white shadow font-md-14px-medium"
        >
          <Image
            src="/icons/add_box.png"
            alt="초대하기"
            width={16}
            height={16}
          />
          초대하기
        </button>
      </div>

      {/* 테스트용 */}
      {currentItems.map(item => (
        <div key={item.id} className="w-full border-b border-gray-100">
          <div className="flex w-full items-center justify-between py-2">
            <div className="flex-1">{item.email}</div>
            <button
              type="button"
              className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
            >
              취소
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}