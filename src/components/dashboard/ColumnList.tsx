'use client';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import CreateColumnModal from '@components/Modals/CreateColumnModal';
import useColumns from '@lib/hooks/useColumns';

import AddColumnButton from './UI/AddColumnButton';
import Column from './UI/Column';

export default function ColumnList() {
  const {
    columnList,
    dashboardColor,
    onSubmitCreateColumn,
    handleSubmit,
    register,
    errors,
  } = useColumns();
  const [opened, { open, close }] = useDisclosure(false);
  if (columnList === null) {
    return;
  }
  return (
    <>
      <div className="no-scrollbar flex min-h-[100vh] flex-col md:mx-0 md:max-w-full xl:max-w-[1062px] xl:flex-row xl:overflow-scroll">
        {columnList?.length > 0 &&
          columnList.map(column => (
            <Column
              key={column.id}
              column={column}
              dashboardColor={dashboardColor}
            />
          ))}
      </div>
      <AddColumnButton open={open} />
      <Modal
        opened={opened}
        padding={24}
        title={<div className="font-2xl-24px-bold">새 컬럼 생성</div>}
        onClose={close}
        centered
      >
        <CreateColumnModal
          onClose={close}
          onSubmit={onSubmitCreateColumn}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      </Modal>
    </>
  );
}
