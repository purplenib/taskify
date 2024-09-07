import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

import { getCards, getMembers, postCard, putCard } from '@core/api/cardApis';
import {
  CardServiceResponseDto,
  CreateCardRequestDto,
  UpdateCardRequestDto,
} from '@core/dtos/CardsDto';
import { MemberApplicationServiceResponseDto } from '@core/dtos/MembersDto';

export default function useCards(columnId: number) {
  const [cardList, setCardList] = useState<CardServiceResponseDto[] | null>(
    null
  );
  const [members, setMembers] = useState<MemberApplicationServiceResponseDto[]>(
    []
  );
  const { dashboardid } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
    setError,
    reset,
    clearErrors,
  } = useForm<CreateCardRequestDto>({
    mode: 'onSubmit',
    defaultValues: {
      dueDate: new Date().toString(),
    },
  });

  const loadCards = useCallback(async () => {
    const data = await getCards(columnId);
    const Cards: CardServiceResponseDto[] = data.cards;
    setCardList(Cards);
  }, [columnId]);

  const loadMembers = useCallback(async () => {
    const nextMembers = await getMembers(Number(dashboardid));
    if (!nextMembers) {
      return;
    }
    setMembers(nextMembers as MemberApplicationServiceResponseDto[]);
  }, [dashboardid]);

  // 카드 생성, 수정시 폼데이터 검사
  const requestCardFormValidator = (fieldData: CreateCardRequestDto) => {
    let result = true;
    if (!fieldData.assigneeUserId) {
      setError('assigneeUserId', {
        type: 'required',
        message: '담당자를 선택해 주세요.',
      });
      result = false;
    }
    if (!fieldData.imageUrl) {
      setError('imageUrl', {
        type: 'required',
        message: '이미지를 업로드 해주세요.',
      });
      result = false;
    }
    if (!fieldData.description) {
      setError('description', {
        type: 'required',
        message: '설명을 입력해 주세요.',
      });
      result = false;
    }
    if (!fieldData.title) {
      setError('title', {
        type: 'required',
        message: '제목을 입력해 주세요.',
      });
      result = false;
    }
    return result;
  };
  // 카드생성 submit
  const onSubmitCreateCard = async (fieldData: CreateCardRequestDto) => {
    const result = requestCardFormValidator(fieldData);
    if (!result) {
      return false;
    }

    const formattedDueDate = dayjs(fieldData.dueDate).format(
      'YYYY-MM-DD HH:mm'
    );
    const formData: CreateCardRequestDto = {
      assigneeUserId: Number(fieldData.assigneeUserId),
      dashboardId: Number(dashboardid),
      columnId: Number(columnId),
      title: fieldData.title,
      description: fieldData.description,
      dueDate: formattedDueDate,
      tags: fieldData.tags,
      imageUrl: fieldData.imageUrl,
    };

    const data = await postCard(formData);
    setCardList(prev => {
      if (prev === null) {
        return [data];
      }
      return [...prev, data];
    });
    return true;
  };

  // 카드수정 submit
  const onSubmitEditCard = async (
    cardId: number,
    fieldData: CreateCardRequestDto
  ) => {
    const result = requestCardFormValidator(fieldData);
    if (!result) {
      return false;
    }

    const formattedDueDate = dayjs(fieldData.dueDate).format(
      'YYYY-MM-DD HH:mm'
    );
    const formData: UpdateCardRequestDto = {
      assigneeUserId: Number(fieldData.assigneeUserId),
      columnId: Number(columnId),
      title: fieldData.title,
      description: fieldData.description,
      dueDate: formattedDueDate,
      tags: fieldData.tags,
      imageUrl: fieldData.imageUrl,
    };

    const data = await putCard(Number(cardId), formData);

    setCardList(prev => {
      if (prev === null || cardList === null) {
        return [];
      }
      // 수정한 카드의 컬럼 아이디가 수정 후 컬럼과 다르면 컬럼에서 제거
      if (Number(data.columnId) !== columnId) {
        const CardListWithOutCurrentCard = cardList.filter(
          card => card.id === cardId
        );
        return [...CardListWithOutCurrentCard];
      }
      // 같으면 해당 컬럼에서 업데이트
      if (Number(data.columnId) === columnId) {
        const updatedCardList = cardList.map(card =>
          card.id === cardId ? { ...card, ...data } : card
        );
        return [...updatedCardList];
      }

      return [...prev, data];
    });
    return true;
  };

  useEffect(() => {
    loadCards();
    loadMembers();
  }, [columnId, loadCards, loadMembers]);

  return {
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
    onSubmitEditCard,
    reset,
    clearErrors,
  };
}
