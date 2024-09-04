'use Client';

import {
  INIT_DASHBOARDS_REQUEST,
  INIT_DASHBOARDS_RESPONSE,
  INIT_MYDASHBOARDS_CONTEXT,
} from '@lib/constants/initialValue';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import type {
  DashboardDto,
  MyDashboardContextDto,
} from '@core/dtos/DashboardsDto';
import getDashboards from '@core/api/getDashboards';
import useApi from '@lib/hooks/useApi';

const MyDashboardContext = createContext<MyDashboardContextDto>(
  INIT_MYDASHBOARDS_CONTEXT
);

export const MyDashboardProvider = ({ children }) => {
  const [myDashboards, setMyDashboards] = useState<DashboardDto[]>([]);
  const [localDashboards, setLocalDashboards] = useState<DashboardDto[]>([]);

  //  사용자의 대시보드 데이터 패칭
  const { data, loading, error } = useApi(
    getDashboards,
    INIT_DASHBOARDS_REQUEST,
    INIT_DASHBOARDS_RESPONSE
  );

  // 대시보드 데이터가 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (data && data.dashboards) {
      setMyDashboards(data.dashboards);
    }
  }, [data]);

  const addDashboard = (newDashboard: DashboardDto) => {
    setLocalDashboards(prev => [...prev, newDashboard]); // 로컬 대시보드 추가
  };

  // 대시보드 데이터 재패칭
  const fetchDashboards = async () => {
    const response = await getDashboards();
    setMyDashboards(response.dashboards);
  };

  // Context 값 메모이제이션
  const value = useMemo(
    () => ({
      myDashboards,
      localDashboards,
      loading,
      error,
      addDashboard,
      fetchDashboards,
    }),
    [myDashboards, localDashboards, loading, error]
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
