'use Client';

import {
  INIT_DASHBOARDS_REQUEST,
  INIT_DASHBOARDS_RESPONSE,
} from '@lib/constants/initialValue';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import type { DashboardDto } from '@core/dtos/DashboardsDto';
import type { MyDashboardContextDto } from '@core/dtos/DashboardsDto';
import useApi from '@lib/hooks/useApi';
import getDashboards from '@core/api/getDashboards';

const INIT_MYDASHBOARD = {
  joinedDashboards: [],
  loading: true,
  error: null,
  addDashboard: () => {},
  fetchDashboards: () => {},
};

const MyDashboardContext =
  createContext<MyDashboardContextDto>(INIT_MYDASHBOARD);

export const MyDashboardProvider = ({ children }) => {
  const [joinedDashboards, setJoinedDashboards] = useState<DashboardDto[]>([]);

  //  참여중인 대시보드 데이터 패칭, Context로 관리
  const { data, loading, error } = useApi(
    getDashboards,
    INIT_DASHBOARDS_REQUEST,
    INIT_DASHBOARDS_RESPONSE
  );

  // 대시보드 데이터 설정
  useEffect(() => {
    if (data && data.dashboards) {
      setJoinedDashboards(data.dashboards);
    }
  }, [data]);

  const addDashboard = (newDashboard: DashboardDto) => {
    setJoinedDashboards(prev => [...prev, newDashboard]);
  };

  // 대시보드 데이터 가져오기
  const fetchDashboards = async () => {
    const response = await getDashboards();
    setJoinedDashboards(response.dashboards);
  };

  // Context 값 메모이제이션
  const value = useMemo(
    () => ({
      joinedDashboards,
      loading,
      error,
      addDashboard,
      fetchDashboards,
    }),
    [joinedDashboards, loading, error]
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
