import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import PurpleAddIcon from '@components/@shared/UI/PurpleAddIcon';
import CreateCardModal from '@components/Modals/CreateCardModal';
import setting from '@icons/settings.png';
import useCards from '@lib/hooks/useCards';

import Card from './Card';

import type { ColumnServiceResponseDto } from '@core/dtos/ColumnsDto';

interface ColumnProps {
  column: ColumnServiceResponseDto;
  dashboardColor: string;
  onClickEditOpen: (id: number, defaultValue: string) => void;
}

export default function Column({
  column,
  dashboardColor,
  onClickEditOpen,
}: ColumnProps) {
  const [createCardModal, { open: openCreateCard, close: closeCreateCard }] =
    useDisclosure(false);
  const {
    cardList,
    loadMembers,
    members,
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    getValues,
    watch,
    onSubmitCreateCard,
    isAllInputFilled,
  } = useCards(column.id);
  if (cardList === null) {
    return;
  }

  return (
    <>
      <div className="no-scrollbar mb-4 w-full min-w-[354px] border-b border-gray-100 px-3 pb-6 md:px-5 xl:mb-0 xl:h-full xl:max-h-[100vh] xl:overflow-scroll xl:border-b-0 xl:border-r">
        <div className="mb-6 mt-4 flex h-[22px] justify-between">
          <div className="flex items-center gap-2 rounded-md">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `${dashboardColor}` }}
            />
            <span className="pr-1 font-2lg-18px-bold">{column.title}</span>
            <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-gray-400 font-xs-12px-medium">
              {cardList.length}
            </div>
          </div>
          <button
            onClick={() => {
              onClickEditOpen(column.id, column.title);
            }}
          >
            <Image src={setting} width={22} height={22} alt="컬럼 수정 버튼" />
          </button>
        </div>
        <Button
          onClick={() => {
            openCreateCard();
            loadMembers();
          }}
          className="flex h-8 w-full items-center justify-center border border-gray-200 bg-white md:h-10"
        >
          <PurpleAddIcon />
        </Button>
        {cardList.length > 0 &&
          cardList.map(card => <Card key={card.id} card={card} />)}
      </div>
      <Modal
        centered
        title={<div className="font-2xl-24px-bold">할 일 생성</div>}
        opened={createCardModal}
        onClose={closeCreateCard}
      >
        <CreateCardModal
          members={members}
          columnId={column.id}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
          onSubmitCreateCard={onSubmitCreateCard}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          closeCreateCard={closeCreateCard}
          isAllInputFilled={isAllInputFilled}
        />
      </Modal>
    </>
  );
}
