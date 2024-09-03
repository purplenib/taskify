<<<<<<< HEAD
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

  const onAccept = (invitation: InvitationsDto) => {
    // putInvitaions 추가
    console.log('Invitation accepted:', invitation);
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
          onAccept={onAccept}
        />
      )}
=======
import SearchForm from './UI/SearchForm';
import NoInvitedDashBoard from './UI/NoInvitedDashBoard';
import InvitedDashBoard from './UI/InvitedDashBoard';

export default function InvitedDashBoardList() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1 className="font-2xl-24px-bold">초대받은 대시보드</h1>
      <NoInvitedDashBoard />
      <SearchForm />
      <div className="m-auto flex w-[798px] justify-between text-gray-300">
        <h2>이름</h2>
        <h2>초대자</h2>
        <h2>수락 여부</h2>
      </div>
      <InvitedDashBoard />
>>>>>>> decc019688b55116340a2e1a34ca20ebfd0f5c7a
    </section>
  );
}
