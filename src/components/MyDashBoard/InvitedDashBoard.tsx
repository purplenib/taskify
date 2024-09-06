'use client';

import { useEffect, useState } from 'react';

import putInvitations from '@core/api/putInvitations';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';
import { useSearch } from '@lib/hooks/useSearch';

import InviteHeader from './UI/InviteHeader';
import NoDashboard from './UI/NoDashboard';
import ReturnButton from './UI/ReturnButton';
import SearchForm from './UI/SearchForm';
import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';

import type {
  invitationListDto,
  invitationListResponseDto,
} from '@core/dtos/invitationListDto';

interface InvitedDashboardProps {
  invitationListData: invitationListResponseDto;
  loading: boolean;
  error: string | null;
}

export default function InvitedDashboard({
  invitationListData,
  loading,
  error,
}: InvitedDashboardProps) {
  const { addDashboard } = useMyDashboard();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [invitationList, setInvitationList] = useState<invitationListDto[]>([]);

  // invitationListData가 변경될 때 invitationList 상태 업데이트
  useEffect(() => {
    if (invitationListData) {
      setInvitationList(invitationListData.invitationList);
    }
  }, [invitationListData]);

  // 대시보드 검색
  const { filteredResults, handleSearch, handleReset } = useSearch(
    {
      list: invitationList,
      totalCount: invitationList.length,
    },
    setCurrentPage,
    (invitation: invitationListDto) => invitation.dashboard.title
  );

  // 대시보드 초대 수락
  const handleAccept = async (invitation: invitationListDto) => {
    setIsProcessing(true);
    try {
      await putInvitations(invitation.id, true);
      const newInvitedDashboard = {
        id: invitation.dashboard.id,
        title: invitation.dashboard.title,
      };
      addDashboard(newInvitedDashboard); // 로컬에 대시보드 추가
      setInvitationList(prev => prev.filter(item => item.id !== invitation.id));
      alert('초대를 수락했습니다. 내 대시보드를 확인해보세요!');
    } catch (err) {
      console.error('handleAccept 처리 중 에러 발생:', err);
      alert('초대 수락에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 대시보드 초대 거절
  const handleReject = async (invitation: invitationListDto) => {
    setIsProcessing(true);
    try {
      await putInvitations(invitation.id, false);
      setInvitationList(prev => prev.filter(item => item.id !== invitation.id));
      alert('초대를 거절했습니다.');
    } catch (err) {
      console.error('handleReject 처리 중 에러 발생:', err);
      alert('초대 거절에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <InviteHeader />
      {loading && <p>초대 목록을 불러오고 있습니다.</p>}
      {error && <p>오류가 발생했습니다: {error}</p>}
      <ul className="flex flex-col gap-[20px]">
        {filteredResults.length === 0 ? (
          <li className="mt-12 flex flex-col items-center justify-center gap-2">
            <NoDashboard text="검색 결과에 해당하는 대시보드가 없어요." />
            <ReturnButton buttonText="전체 목록 보기" onClick={handleReset} />
          </li>
        ) : (
          filteredResults.map((invitation: invitationListDto) => (
            <li
              key={invitation.id}
              className="flex w-full justify-around border-b border-gray-100 pb-[20px] text-center text-black-600"
            >
              <p>{invitation.dashboard.title}</p>
              <p>{invitation.inviter.nickname}</p>
              <p>
                <PrimaryButton onClick={() => handleAccept(invitation)}>
                  수락
                </PrimaryButton>
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
