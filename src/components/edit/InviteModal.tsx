/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import Image from 'next/image';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 배경 > esc 누르면 모달 닫힘(오류 때문에 추가) */}
      <div
        className="fixed inset-0 bg-black-700 bg-opacity-80"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
      />

      {/* 모달 */}
      <div className="relative z-10 w-[327px] max-w-md rounded-lg bg-white p-6 md:w-[568px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">초대하기</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500">
            <Image src="/icons/X.png" alt="닫기" width={36} height={36} />
          </button>
        </div>
        <label
          htmlFor="InviteEmail"
          className="mb-3 text-black-600 font-2lg-18px-medium"
        >
          이메일
        </label>
        <input
          id="InviteEmail"
          type="email"
          placeholder="이메일을 입력하세요"
          className="mb-4 w-full rounded border border-gray-200 p-2"
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="w-full rounded border border-gray-200 px-4 py-2 text-gray-400"
          >
            취소
          </button>
          <button className="w-full rounded bg-violet px-4 py-2 text-white">
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
