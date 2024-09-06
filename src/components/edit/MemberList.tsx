'use client';

import { useState } from 'react';

import Pagination from '@/src/components/edit/Pagination';
import usePagination from '@/src/lib/hooks/usePagination';
import { getMembers, deleteMember } from '@core/api/dashboardApi';

interface MemberListProps {
  dashboardId: number;
}

// 구성원 데이터 타입 정의
interface Member {
  id: number;
  nickname: string;
}

export default function MemberList({ dashboardId }: MemberListProps) {
  const itemsPerPage = 4;
  const [members, setMembers] = useState<Member[]>([]);
  const { currentPage, handlePageChange } = usePagination({
    totalItems: members.length,
    itemsPerPage,
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = Array.isArray(members)
    ? members.slice(startIdx, startIdx + itemsPerPage)
    : [];

  // 구성원 목록 불러오기
  const loadMembers = async () => {
    const response = await getMembers(dashboardId);

    if (response && Array.isArray(response.members)) {
      setMembers(response.members);
    }
  };
  loadMembers();

  // 멤버 삭제
  const handleDeleteMember = async (memberId: number) => {
    await deleteMember(dashboardId, memberId);
    setMembers(prevMembers =>
      prevMembers.filter(member => member.id !== memberId)
    );
  };

  return (
    <div className="max-w-[92%] rounded-md bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">구성원</h2>
        <Pagination
          currentPage={currentPage}
          totalItems={members.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div>
        <div className="mb-2 text-gray-600 font-lg-16px-regular">이름</div>
        {currentItems.map(member => (
          <div
            key={member.id}
            className="flex items-center justify-between border-b border-gray-100 py-2"
          >
            <div>{member.nickname}</div>
            <button
              type="button"
              onClick={() => handleDeleteMember(member.id)}
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
