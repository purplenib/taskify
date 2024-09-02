'use client';

import {
  INIT_INVITATIONS_REQUEST,
  INIT_INVITATIONS_RESPONSE,
} from '@lib/constants/initialValue';
import type {
  InvitationsResponseDto,
  InvitationsDto,
} from '@core/dtos/invitationsDto';
import getInvitations from '@core/api/getInvitations';
import { useMyDashboard } from '@core/contexts/MyDashboardProvider';
import NoDashBoard from './UI/NoDashBoard';
import InvitedDashBoard from './InvitedDashBoard';
import useApi from '@lib/hooks/useApi';

export default function InvitedDashBoardList() {
  const {
    data: invitationsData,
    loading,
    error,
  } = useApi<InvitationsResponseDto, typeof INIT_INVITATIONS_REQUEST>(
    getInvitations,
    INIT_INVITATIONS_REQUEST,
    INIT_INVITATIONS_RESPONSE
  );

  const { addDashboard } = useMyDashboard();

  const handleAccept = (invitation: InvitationsDto) => {
    const newDashboard = {
      id: invitation.dashboard.id,
      title: invitation.dashboard.title,
    };
    addDashboard(newDashboard); // Context에 대시보드 추가
  };

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1 className="font-2xl-24px-bold">초대받은 대시보드</h1>
      {invitationsData?.invitations?.length === 0 ? (
        <NoDashBoard text="아직 초대받은 대시보드가 없어요" />
      ) : (
        <InvitedDashBoard
          invitationsData={invitationsData}
          loading={loading}
          error={error}
          onAccept={handleAccept}
        />
      )}
    </section>
  );
}
