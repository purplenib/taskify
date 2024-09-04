'use client';


import Pagination from '@components/edit/Pagination';
import usePagination from '@lib/hooks/usePaginavigation';


// 테스트용 더미 데이터 - 이름
interface Item {
  id: number;
  name: string;
}

const dummyNameData: Item[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `${i + 1}`,
}));

export default function MemberList() {
  const itemsPerPage = 4;
  const { currentPage, handlePageChange } = usePagination({
    totalItems: dummyNameData.length,
    itemsPerPage,
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyNameData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="max-w-md rounded-md bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">구성원</h2>
        <Pagination
          currentPage={currentPage}
          totalItems={dummyNameData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div>
        <div className="mb-2 text-gray-600 font-lg-16px-regular">이름</div>
        {/* 테스트용 */}
        {currentItems.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 py-2"
          >
            <div>{item.name}</div>
            <button
              type="button"
              className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
