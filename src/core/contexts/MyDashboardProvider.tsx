'use Client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import getDashboards from '@core/api/getDashboards';
import { INIT_MYDASHBOARDS_CONTEXT } from '@lib/constants/initialValue';
import useApi from '@lib/hooks/useApi';

import type {
  DashboardApplicationServiceResponseDto,
  MyDashboardContextDto,
} from '@core/dtos/DashboardsDto';

const MyDashboardContext = createContext<MyDashboardContextDto>(
  INIT_MYDASHBOARDS_CONTEXT
);

export const MyDashboardProvider = ({ children }) => {
  const [fetchedDashboards, setFetchedDashboards] = useState<
    DashboardApplicationServiceResponseDto[]
  >([]);
  const [localDashboards, setLocalDashboards] = useState<
    DashboardApplicationServiceResponseDto[]
  >([]);

  const { data, isLoading, error, callApi } = useApi('/dashboards', 'GET');

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        params: {
          navigationMethod: 'pagination',
        },
      };
      await callApi(undefined, config);
    };

    fetchData();
  }, [callApi]);

  // 로컬 대시보드 추가
  const addDashboard = (
    newDashboard: DashboardApplicationServiceResponseDto
  ) => {
    setLocalDashboards(prev => [...prev, newDashboard]);
  };

  // 대시보드 데이터가 변경될 때마다 로컬 대시보드 상태 업데이트
  useEffect(() => {
    if (data && data.dashboards) {
      setFetchedDashboards(data.dashboards);
      setLocalDashboards(prev => [...prev, ...data.dashboards]);
    }
  }, [data]);

  // 대시보드 데이터 재패칭 함수
  const fetchDashboards = async () => {
    const response = await getDashboards();
    setFetchedDashboards(response.dashboards);
    setLocalDashboards(response.dashboards);
  };

  // Context 값 메모이제이션
  const value = useMemo(
    () => ({
      fetchedDashboards,
      localDashboards,
      loading: isLoading,
      error,
      addDashboard,
      fetchDashboards,
    }),
    [fetchDashboards, localDashboards, isLoading, error]
  );

  return (
    <MyDashboardContext.Provider value={value}>
      {children}
    </MyDashboardContext.Provider>
  );
};

export const useMyDashboard = () => {
  return useContext(MyDashboardContext);
};
