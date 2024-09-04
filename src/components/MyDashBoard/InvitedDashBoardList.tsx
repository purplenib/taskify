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
import useApi from '@lib/hooks/useApi';
import InvitedDashboard from './InvitedDashboard';
import NoDashboard from './UI/NoDashboard';

export default function InvitedDashboardList() {
  const {
    data: invitationsData,
    loading,
    error,
  } = useApi<InvitationsResponseDto, typeof INIT_INVITATIONS_REQUEST>(
    getInvitations,
    INIT_INVITATIONS_REQUEST,
    INIT_INVITATIONS_RESPONSE
  );

  const onAccept = (invitation: InvitationsDto) => {
    // putInvitaions 추가
    console.log('Invitation accepted:', invitation);
  };

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1 className="font-2xl-24px-bold">초대받은 대시보드</h1>
      {invitationsData?.invitations?.length === 0 ? (
        <NoDashboard text="아직 초대받은 대시보드가 없어요" />
      ) : (
        <InvitedDashboard
          invitationsData={invitationsData}
          loading={loading}
          error={error}
          onAccept={onAccept}
        />
      )}
    </section>
  );
}
