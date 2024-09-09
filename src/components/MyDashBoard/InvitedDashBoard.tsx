'use client';

import { useEffect, useState } from 'react';

import putInvitations from '@core/api/putInvitations';
import { useMyDashboard } from '@core/contexts/MyDashboardContext';
import useDevice from '@lib/hooks/useDevice';
import useSearch from '@lib/hooks/useSearch';

import AcceptButton from './UI/AcceptButton';
import InviteHeader from './UI/InviteHeader';
import NoDashboard from './UI/NoDashboard';
import ReturnButton from './UI/ReturnButton';
import SearchForm from './UI/SearchForm';

import type {
  InvitationsDto,
  InvitationsResponseDto,
} from '@core/dtos/InvitationsDto';

interface InvitedDashboardProps {
  invitationsData: InvitationsResponseDto;
  isLoading: boolean;
  error: unknown;
  onUpdateInvitations: () => void;
}

interface NewInvitedDashboard {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

export default function InvitedDashboard({
  invitationsData,
  isLoading,
  error,
  onUpdateInvitations,
}: InvitedDashboardProps) {
  const { addDashboard } = useMyDashboard();
  const deviceType = useDevice();
  const [invitationList, setInvitationList] = useState<InvitationsDto[]>([]);

  // invitationsData가 변경될 때 invitationList 상태 업데이트
  useEffect(() => {
    if (invitationsData) {
      setInvitationList(invitationsData.invitations);
    }
  }, [invitationsData]);

  // 대시보드 검색
  const { filteredResults, handleSearch, handleReset } = useSearch(
    {
      list: invitationList,
      totalCount: invitationList.length,
    },
    () => {},
    (invitation: InvitationsDto) => invitation.dashboard.title
  );

  // 대시보드 초대 수락
  const handleAccept = async (invitation: InvitationsDto) => {
    try {
      await putInvitations(invitation.id, true);
      const newInvitedDashboard: NewInvitedDashboard = {
        id: invitation.dashboard.id,
        title: invitation.dashboard.title,
        color: '#000',
        createdByMe: false,
      };
      addDashboard(newInvitedDashboard); // 로컬에 대시보드 추가
      setInvitationList(prev => prev.filter(item => item.id !== invitation.id));
      onUpdateInvitations(); // 부모 컴포넌트에 알림
      // eslint-disable-next-line no-alert
      alert('초대를 수락했습니다. 내 대시보드를 확인해보세요!');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('초대 수락 중 오류:', err);
      // eslint-disable-next-line no-alert
      alert('초대 수락에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 대시보드 초대 거절
  const handleReject = async (invitation: InvitationsDto) => {
    try {
      await putInvitations(invitation.id, false);
      setInvitationList(prev => prev.filter(item => item.id !== invitation.id));
      onUpdateInvitations();
      // eslint-disable-next-line no-alert
      alert('초대를 거절했습니다.');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('초대 거절 중 오류:', err);
      // eslint-disable-next-line no-alert
      alert('초대 거절에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {(deviceType === 'tablet' || deviceType === 'desktop') && (
        <InviteHeader />
      )}
      {isLoading && <p>초대 목록을 불러오고 있습니다...</p>}
      {error && <p>오류가 발생했습니다</p>}
      <ul className="flex flex-col gap-[20px]">
        {filteredResults.length === 0 ? (
          <li className="mt-12 flex flex-col items-center justify-center gap-2">
            <NoDashboard text="검색 결과에 해당하는 대시보드가 없어요." />
            <ReturnButton buttonText="전체 목록 보기" onClick={handleReset} />
          </li>
        ) : (
          filteredResults.map((invitation: InvitationsDto) => (
            <li
              key={invitation.id}
              className="relative block w-full border-b border-gray-100 pb-[20px] text-center text-black-600 font-md-14px-regular md:flex md:font-lg-16px-regular xl:px-10"
            >
              {deviceType === 'mobile' && <InviteHeader />}
              <p className="absolute left-16 top-0 w-4/6 truncate md:static md:w-1/3 md:text-left">
                {invitation.dashboard.title}
              </p>
              <p className="absolute left-16 top-7 w-4/6 md:static md:w-1/3 md:text-left">
                {invitation.inviter.nickname}
              </p>
              <div className="mt-[14px] flex justify-center gap-[10px] md:mt-0 md:w-1/3 md:gap-0">
                <AcceptButton
                  divClassName="bg-violet "
                  buttonClassName="text-white"
                  onClick={() => handleAccept(invitation)}
                >
                  수락
                </AcceptButton>
                <AcceptButton
                  divClassName="border-1 md:ml-2 border border-gray-200 "
                  buttonClassName=" text-violet"
                  onClick={() => handleReject(invitation)}
                >
                  거절
                </AcceptButton>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
