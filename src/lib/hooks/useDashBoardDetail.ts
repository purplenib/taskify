import { useEffect } from 'react';

import { useRoot } from '@core/contexts/RootContexts';
import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardDto';
import { initialDetail } from '@lib/constants/initialValues';

import useApi from './useApi';

export default function useDashboardDetail(dashboardid: string | undefined) {
  const { user } = useRoot();
  const { data: dashBoardDetail = initialDetail, callApi: getDashboardDetail } =
    useApi<DashboardApplicationServiceResponseDto>(
      `/dashboards/${dashboardid}`,
      'GET'
    );

  useEffect(() => {
    const fetchDetail = async () => {
      await getDashboardDetail(undefined);
    };
    if (dashboardid) {
      fetchDetail();
    }
  }, [dashboardid, getDashboardDetail, user]);

  return { dashBoardDetail };
}
