import type {
  GetColumnsResponseDto,
  GetCardsResponseDto,
} from '@core/dtos/dashboardDto';
import axios from './instance';

export const getColumns = async (dashboard: number) => {
  const res = await axios.get<GetColumnsResponseDto>(
    `/columns?dashboardId=${dashboard}`
  );
  const { data } = res;
  return data;
};

export const getCards = async (columnId: number) => {
  const res = await axios.get<GetCardsResponseDto>(
    `/cards?size=10&columnId=${columnId}`
  );
  const { data } = res;
  return data;
};
