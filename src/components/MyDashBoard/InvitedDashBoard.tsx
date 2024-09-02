'use client';

import type {
  InvitationsDto,
  InvitationsResponseDto,
} from '@core/dtos/invitationsDto';
import { useState } from 'react';
import NoDashBoard from './UI/NoDashBoard';
import ReturnButton from './UI/ReturnButton';
import SearchForm from './UI/SearchForm';
import { useSearch } from '@lib/hooks/useSearch';

interface InvitedDashBoardProps {
  invitationsData: InvitationsResponseDto;
  loading: boolean;
  error: string | null;
}

export default function InvitedDashBoard({
  invitationsData,
  loading,
  error,
}: InvitedDashBoardProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { filteredResults, handleSearch, handleReset } = useSearch(
    {
      list: invitationsData.invitations,
      totalCount: invitationsData.invitations.length,
    },
    setCurrentPage,
    (invitation: InvitationsDto) => invitation.dashboard.title
  );

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <div className="m-auto flex w-full justify-around text-gray-300">
        <h2>이름</h2>
        <h2>초대자</h2>
        <h2>수락 여부</h2>
      </div>
      {loading && <p>초대 목록을 불러오고 있습니다.</p>}
      {error && <p>{error}</p>}
      <ul className="flex flex-col gap-[20px]">
        {filteredResults.length === 0 ? (
          <li className="mt-12 flex flex-col items-center justify-center gap-2">
            <NoDashBoard text="검색 결과에 해당하는 대시보드가 없어요." />
            <ReturnButton buttonText="전체 목록 보기" onClick={handleReset} />
          </li>
        ) : (
          filteredResults.map(invitation => (
            <li
              key={invitation.id}
              className="flex w-full justify-around border-b border-gray-100 pb-[20px] text-center text-black-600"
            >
              <p>{invitation.dashboard.title}</p>
              <p>{invitation.inviter.nickname}</p>
              <p>
                <button
                  type="button"
                  className="w-[84px] rounded-[4px] bg-violet px-4 py-2 text-white"
                >
                  수락
                </button>
                <button
                  type="button"
                  className="border-1 ml-2 w-[84px] rounded-[4px] border border-gray-200 px-4 py-2 text-violet"
                >
                  거절
                </button>
              </p>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
