'use client';

import type {
  InvitationsDto,
  InvitationsResponseDto,
} from '@core/dtos/invitationsDto';
import { useState } from 'react';
import { useSearch } from '@lib/hooks/useSearch';
import InviteHeader from './UI/InviteHeader';
import NoDashBoard from './UI/NoDashBoard';
import ReturnButton from './UI/ReturnButton';
import SearchForm from './UI/SearchForm';

interface InvitedDashBoardProps {
  invitationsData: InvitationsResponseDto;
  loading: boolean;
  error: string | null;
  onAccept: (invitation: InvitationsDto) => void;
}

export default function InvitedDashBoard({
  invitationsData,
  loading,
  error,
  onAccept,
}: InvitedDashBoardProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [invitations, setInvitations] = useState<InvitationsDto[]>(
    invitationsData.invitations
  );

  const { filteredResults, handleSearch, handleReset } = useSearch(
    {
      list: invitationsData.invitations,
      totalCount: invitationsData.invitations.length,
    },
    setCurrentPage,
    (invitation: InvitationsDto) => invitation.dashboard.title
  );

  const handleAccept = (invitation: InvitationsDto) => {
    onAccept(invitation);
    setInvitations(prev => prev.filter(item => item.id !== invitation.id));
  };

  const handleReject = (invitation: InvitationsDto) => {
    setInvitations(prev => prev.filter(item => item.id !== invitation.id));
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <InviteHeader />
      {loading && <p>초대 목록을 불러오고 있습니다.</p>}
      {error && <p>{error}</p>}
      <ul className="flex flex-col gap-[20px]">
        {filteredResults.length === 0 ? (
          <li className="mt-12 flex flex-col items-center justify-center gap-2">
            <NoDashBoard text="검색 결과에 해당하는 대시보드가 없어요." />
            <ReturnButton buttonText="전체 목록 보기" onClick={handleReset} />
          </li>
        ) : (
          filteredResults.map((invitation: InvitationsDto) => (
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
                  onClick={() => handleAccept(invitation)}
                >
                  수락
                </button>
                <button
                  type="button"
                  className="border-1 ml-2 w-[84px] rounded-[4px] border border-gray-200 px-4 py-2 text-violet"
                  onClick={() => handleReject(invitation)}
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
