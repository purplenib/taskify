import axios from './instance';

import type {
  CreateCardRequestDto,
  GetCardsResponseDto,
} from '@core/dtos/CardsDto';

export const getCards = async (columnId: number) => {
  const res = await axios.get<GetCardsResponseDto>(
    `/cards?size=10&columnId=${columnId}`
  );
  const { data } = res;
  return data;
};

export const postCard = async (formData: CreateCardRequestDto) => {
  await axios.post('/cards', formData);
};
