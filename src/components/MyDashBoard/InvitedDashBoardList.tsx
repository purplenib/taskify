'use client';

import {
  INITIAL_INVITATIONS_REQUEST,
  INITIAL_INVITATIONS_RESPONSE,
} from '@lib/constants/initialValue';
import type { InvitationsResponseDto } from '@core/dtos/invitationsDto';
import getInvitations from '@core/api/getInvitations';
import NoDashBoard from './UI/NoDashBoard';
import InvitedDashBoard from './InvitedDashBoard';
import useApiGet from '@lib/hooks/useApiGet';

export default function InvitedDashBoardList() {
  const {
    data: invitationsData,
    loading,
    error,
  } = useApiGet<InvitationsResponseDto, typeof INITIAL_INVITATIONS_REQUEST>(
    getInvitations,
    INITIAL_INVITATIONS_REQUEST,
    INITIAL_INVITATIONS_RESPONSE
  );

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
        />
      )}
    </section>
  );
}
