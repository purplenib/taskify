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

  // 빈 초대 목록일 경우 업데이트
  const handleUpdateInvitations = () => {
    callApi(undefined);
  };

  // 초대 데이터 유효성 검사
  const hasNoInvitations =
    !invitationsData || !invitationsData.invitations?.length;

  const renderLoading = () => <p>로딩 중...</p>;

  const renderError = () => <p>오류가 발생했습니다</p>;

  // 렌더링할 콘텐츠
  const renderNoDashboard = () => (
    <NoDashboard text="아직 초대받은 대시보드가 없어요" />
  );

  const renderInvitedDashboard = () => (
    <InvitedDashboard
      invitationsData={invitationsData!}
      isLoading={isLoading}
      error={error}
      onUpdateInvitations={handleUpdateInvitations}
    />
  );

  // 렌더링할 콘텐츠를 결정하는 조건 함수
  const renderContent = () => {
    if (isLoading) return renderLoading();
    if (error) return renderError();
    if (hasNoInvitations) return renderNoDashboard();
    return renderInvitedDashboard();
  };

  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white px-6 pb-8 pt-6">
      <h1
        className="whitespace-normal break-words font-2xl-24px-bold max-md:font-xl-20px-bold"
        style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
      >
        초대받은 대시보드
      </h1>
      {renderContent()}
    </section>
  );
}
