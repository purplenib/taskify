import { useEffect } from 'react';

import { useRoot } from '@core/contexts/RootContexts';
import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardDto';
import { MembersResponseDto } from '@core/dtos/MembersDto';
import { initialDetail, initialMembers } from '@lib/constants/initialValues';

import useApi from './useApi';

export default function useDashBoardInfo(dashboardid: string | undefined) {
  const { user } = useRoot();
  const {
    data: dashBoardMembers = initialMembers,
    callApi: getDashBoardMembers,
  } = useApi<MembersResponseDto>(`/members`, 'GET');
  const { data: dashBoardDetail = initialDetail, callApi: getDashBoardDetail } =
    useApi<DashboardApplicationServiceResponseDto>(
      `/dashboards/${dashboardid}`,
      'GET'
    );

  useEffect(() => {
    const fetchMembers = async () => {
      await getDashBoardMembers(undefined, {
        params: {
          dashboardId: dashboardid,
        },
      });
    };
    const fetchDetail = async () => {
      await getDashBoardDetail(undefined);
    };
    if (dashboardid) {
      fetchMembers();
      fetchDetail();
    }
  }, [dashboardid, getDashBoardMembers, getDashBoardDetail, user]);

  return { dashBoardDetail, dashBoardMembers };
}
