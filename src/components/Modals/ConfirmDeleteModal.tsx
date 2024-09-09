import { MouseEventHandler } from 'react';

import { Button } from '@mantine/core';

interface ConfirmDeleteModalProps {
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
  closeConfirm: () => void;
  closeEdit: () => void;
}

export default function ConfirmDeleteModal({
  onClickDelete,
  closeConfirm,
  closeEdit,
}: ConfirmDeleteModalProps) {
  return (
    <>
      <div className="flex justify-center pb-10 font-xl-20px-medium">
        컬럼의 모든 카드가 삭제됩니다.
      </div>
      <div className="flex h-[54px]">
        <Button
          onClick={closeConfirm}
          type="button"
          className="h-full grow border-gray-200 bg-white text-gray-400"
        >
          취소
        </Button>
        <Button
          onClick={e => {
            onClickDelete(e);
            closeConfirm();
            closeEdit();
          }}
          type="submit"
          className="h-full grow bg-violet"
        >
          삭제
        </Button>
      </div>
    </>
  );
}
