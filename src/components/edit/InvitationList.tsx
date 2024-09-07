/* eslint-disable import/order */

'use client';

import { useState } from 'react';
import Image from 'next/image';

import InviteModal from '@/src/components/edit/InviteModal';
import Pagination from '@/src/components/edit/Pagination';
import usePagination from '@/src/lib/hooks/usePagination';
import {
  addInvitation,
  getInvitations,
  deleteInvitation,
} from '@core/api/dashboardApi';

interface InvitationListProps {
  dashboardId: number;
}

interface EmailInvitation {
  id: number;
  email: string;
}

export default function InvitationList({ dashboardId }: InvitationListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitations, setInvitations] = useState<EmailInvitation[]>([]);
  const itemsPerPage = 5;

  const { currentPage, handlePageChange } = usePagination({
    totalItems: invitations.length,
    itemsPerPage,
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = invitations.slice(startIdx, startIdx + itemsPerPage);

  // 초대 리스트 불러오기
  const loadInvitations = async () => {
    if (dashboardId) {
      const response = await getInvitations(dashboardId.toString());
      setInvitations(response);
    }
  };

  if (invitations.length === 0) {
    loadInvitations();
  }

  // 모달 열기
  const handleInviteClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 초대 추가
  const handleAddInvitation = async (email: string) => {
    if (!dashboardId) return;

    const newInvitation = await addInvitation(dashboardId.toString(), email);
    if (newInvitation) {
      setInvitations(prevInvitations => [
        ...prevInvitations,
        { id: newInvitation.id, email: newInvitation.email },
      ]);
    }
    setIsModalOpen(false);
  };

  // 초대 삭제
  const handleDeleteInvitation = async (id: number) => {
    if (!dashboardId) return;

    await deleteInvitation(dashboardId.toString(), id);
    setInvitations(prevInvitations =>
      prevInvitations.filter(invitation => invitation.id !== id)
    );
  };

  return (
    <div className="max-w-[92%] rounded-lg bg-white p-6 shadow md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      {/* 초대 내역 + 페이지네이션 + 초대하기 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-lg-16px-bold md:font-xl-20px-bold">초대 내역</h2>
        <div className="flex items-center gap-4">
          <Pagination
            currentPage={currentPage}
            totalItems={invitations.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          <button
            type="button"
            onClick={handleInviteClick}
            className="hidden h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white shadow font-md-14px-medium md:flex"
          >
            <Image
              src="/icons/add_box.png"
              alt="초대하기"
              width={16}
              height={16}
            />
            초대하기
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="text-gray-600 font-lg-16px-regular">이메일</div>
        <button
          type="button"
          className="flex h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white shadow font-md-14px-medium md:hidden"
          onClick={handleInviteClick}
        >
          <Image
            src="/icons/add_box.png"
            alt="초대하기"
            width={16}
            height={16}
          />
          초대하기
        </button>
      </div>

      {/* 초대된 이메일 리스트 */}
      <div>
        {currentItems.length > 0 ? (
          currentItems.map(item => (
            <div
              key={item.id}
              className="flex w-full items-center justify-between border-b border-gray-100 py-2"
            >
              <div className="flex-1">{item.email}</div>
              <button
                type="button"
                onClick={() => handleDeleteInvitation(item.id)}
                className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">초대된 이메일이 없습니다.</div>
        )}
      </div>

      {/* 초대 모달 */}
      <InviteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddInvitation={handleAddInvitation}
      />
    </div>
  );
}
