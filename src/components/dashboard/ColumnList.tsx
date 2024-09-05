'use client';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import CreateColumnModal from '@components/Modals/CreateColumnModal';
import EditColumnModal from '@components/Modals/EditColumnModal';
import useColumns from '@lib/hooks/useColumns';

import AddColumnButton from './UI/AddColumnButton';
import Column from './UI/Column';

export default function ColumnList() {
  const {
    columnList,
    dashboardColor,
    onSubmitCreateColumnForm,
    onSubmitEditColumnForm,
    handleSubmit,
    register,
    errors,
    setValue,
    setTargetColumnId,
    onClickDeleteAtEditModal,
  } = useColumns();
  const [createColumnModal, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [editColumnModal, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [confirmDeleteModal, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);

  const onClickEditOpen = (id: number, defaultValue: string) => {
    setTargetColumnId(id);
    setValue('editedTitle', defaultValue);
    openEdit();
  };
  const onClickCreateOpen = () => {
    setValue('title', '');
    openCreate();
  };

  if (columnList === null) {
    return;
  }
  return (
    <>
      <div className="no-scrollbar flex min-h-[100vh] flex-col md:mx-0 md:max-w-full xl:max-w-[1062px] xl:flex-row xl:overflow-scroll">
        {columnList?.length > 0 &&
          columnList.map(column => (
            <Column
              onClickEditOpen={onClickEditOpen}
              key={column.id}
              column={column}
              dashboardColor={dashboardColor}
            />
          ))}
      </div>
      <AddColumnButton open={onClickCreateOpen} />
      <Modal
        opened={createColumnModal}
        padding={24}
        title={<div className="font-2xl-24px-bold">새 컬럼 생성</div>}
        onClose={closeCreate}
        centered
      >
        <CreateColumnModal
          onClose={closeCreate}
          onSubmit={onSubmitCreateColumnForm}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      </Modal>

      <Modal
        opened={editColumnModal}
        padding={24}
        title={<div className="font-2xl-24px-bold">컬럼 관리</div>}
        onClose={closeEdit}
        centered
      >
        <EditColumnModal
          closeEdit={closeEdit}
          onSubmit={onSubmitEditColumnForm}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onClickDelete={onClickDeleteAtEditModal}
          confirmDeleteModal={confirmDeleteModal}
          openConfirm={openConfirm}
          closeConfirm={closeConfirm}
        />
      </Modal>
    </>
  );
}
