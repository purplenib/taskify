import { useEffect } from 'react';

import { useRoot } from '@core/contexts/RootContexts';
import { MembersResponseDto } from '@core/dtos/MembersDto';
import { initialMembers } from '@lib/constants/initialValues';

import useApi from './useApi';

export default function useDashboardMembers(dashboardid: string | undefined) {
  const { user } = useRoot();
  const {
    data: dashBoardMembers = initialMembers,
    callApi: getDashboardMembers,
  } = useApi<MembersResponseDto>(`/members`, 'GET');

  useEffect(() => {
    const fetchMembers = async () => {
      await getDashboardMembers(undefined, {
        params: {
          dashboardId: dashboardid,
        },
      });
    };

    if (dashboardid) {
      fetchMembers();
    }
  }, [dashboardid, getDashboardMembers, user]);

  return { dashBoardMembers };
}
