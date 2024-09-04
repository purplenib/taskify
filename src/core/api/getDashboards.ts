import type { DashboardsResponseDto } from '@core/dtos/DashboardsDto';
import { apiCall } from './apiCall';

export interface GetDashboardsParams {
  navigationMethod: string;
  page: number;
  size: number;
}

const getDashboards = async (
  params: GetDashboardsParams
): Promise<DashboardsResponseDto> => {
  return apiCall<DashboardsResponseDto>('GET', 'dashboards', undefined, {
    ...params,
  });
};

export default getDashboards;
