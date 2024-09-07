'use client';

import { useEffect } from 'react';

import useApi from '@lib/hooks/useApi';

import InvitedDashboard from './InvitedDashboard';
import NoDashboard from './UI/NoDashboard';

import type { InvitationsResponseDto } from '@core/dtos/InvitationsDto';

export default function InvitedDashboardList() {
  const {
    data: invitationsData,
    isLoading,
    error,
    callApi,
  } = useApi<InvitationsResponseDto>('/invitations', 'GET');

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      await callApi(undefined);
    };
    fetchData();
  }, [callApi]);

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1 className="font-2xl-24px-bold">초대받은 대시보드</h1>
      {invitationsData?.invitations?.length === 0 ? (
        <NoDashboard text="아직 초대받은 대시보드가 없어요" />
      ) : (
        <InvitedDashboard
          invitationsData={invitationsData}
          isLoading={isLoading}
          error={error}
        />
      )}
    </section>
  );
}
