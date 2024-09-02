import type { DashboardsResponseDto } from '@core/dtos/dashboardsDto';
import { getFromApi } from './apiService';

export interface GetDashboardsParams {
  navigationMethod: string;
  page: number;
  size: number;
}

const getDashboards = async (
  params: GetDashboardsParams
): Promise<DashboardsResponseDto> => {
  return getFromApi<DashboardsResponseDto>('dashboards', {
    ...params,
  });
};

export default getDashboards;
