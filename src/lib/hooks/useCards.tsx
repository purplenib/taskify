import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

import { getCards, getMembers, postCard } from '@core/api/cardApis';
import {
  CardServiceResponseDto,
  CreateCardRequestDto,
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
  } = useForm<CreateCardRequestDto>({
    mode: 'onSubmit',
    defaultValues: {
      dueDate: new Date().toString(),
      imageUrl: '',
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

  const createFormValidator = (fieldData: CreateCardRequestDto) => {
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
  const onSubmitCreateCard = async (fieldData: CreateCardRequestDto) => {
    const result = createFormValidator(fieldData);
    if (!result) {
      return;
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
  };
}
