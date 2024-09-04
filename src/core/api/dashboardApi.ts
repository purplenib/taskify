import axios from './instance';

import type {
  GetColumnsResponseDto,
  GetCardsResponseDto,
  CreateColumnRequestDto,
  ColumnServiceResponseDto,
  DashboardApplicationServiceResponseDto,
} from '@core/dtos/DashboardDto';

export const getColumns = async (dashboardId: number) => {
  const res = await axios.get<GetColumnsResponseDto>(
    `/columns?dashboardId=${dashboardId}`
  );
  const { data } = res;
  return data;
};

export const postColumn = async (formData: CreateColumnRequestDto) => {
  try {
    const res = await axios.post<ColumnServiceResponseDto>('columns', formData);
    const { data } = res;
    return data;
  } catch (error) {
    return null;
  }
};

export const getCards = async (columnId: number) => {
  const res = await axios.get<GetCardsResponseDto>(
    `/cards?size=10&columnId=${columnId}`
  );
  const { data } = res;
  return data;
};

export const getDashboardDetail = async (dashboardId: number) => {
  const res = await axios.get<DashboardApplicationServiceResponseDto>(
    `/dashboards/${dashboardId}`
  );
  const { data } = res;
  return data;
};
