import { useEffect } from 'react';

import { DashboardsResponseDto } from '@core/dtos/DashboardDto';
import { initialDashboard } from '@lib/constants/initialValues';

import useApi from './useApi';

export default function useDashBoards() {
  const { data: dashBoardList = initialDashboard, callApi: getDashBoardList } =
    useApi<DashboardsResponseDto>('/dashboards', 'GET');

  useEffect(() => {
    getDashBoardList(undefined, {
      params: {
        navigationMethod: 'infiniteScroll',
        page: 1,
        size: 10,
      },
    });
  }, [getDashBoardList]);

  return { dashBoardList };
}
