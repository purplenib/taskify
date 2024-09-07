import { useEffect } from 'react';

import { DashboardsResponseDto } from '@core/dtos/DashboardDto';
import { initialDashboard } from '@lib/constants/initialValues';

import useApi from './useApi';

export default function useDashboards() {
  const { data: dashBoardList = initialDashboard, callApi: getDashboardList } =
    useApi<DashboardsResponseDto>('/dashboards', 'GET');

  useEffect(() => {
    getDashboardList(undefined, {
      params: {
        navigationMethod: 'infiniteScroll',
        page: 1,
        size: 10,
      },
    });
  }, [getDashboardList]);

  return { dashBoardList };
}
