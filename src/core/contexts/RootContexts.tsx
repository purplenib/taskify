'use client';

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useApi from '@/src/lib/hooks/useApi';
import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardDto';

import type {
  LoginRequestDto,
  LoginResponseDto,
  UserServiceResponseDto,
} from '@core/dtos/AuthDto';
import type { MembersResponseDto } from '@core/dtos/MembersDto';

type ContextDashboard = MembersResponseDto &
  DashboardApplicationServiceResponseDto;

interface ContextValue {
  user: Partial<UserServiceResponseDto> | undefined;
  dashboard: Partial<ContextDashboard> | undefined;
  setDashboardid: Dispatch<SetStateAction<string | undefined>>;
  login: (body: LoginRequestDto) => Promise<void>;
}

const RootContext = createContext<ContextValue>({
  user: {},
  dashboard: {},
  setDashboardid: () => {},
  login: async () => {},
});

export default function RootProvider({ children }: PropsWithChildren) {
  const [dashboardid, setDashboardid] = useState<string | undefined>(undefined);
  const { data: dashBoardMembersData, callApi: getDashBoardMembers } =
    useApi<MembersResponseDto>(`/members`, 'GET');
  const { data: dashBoardDetailData, callApi: getDashBoardDetail } =
    useApi<DashboardApplicationServiceResponseDto>(
      `/dashboards/${dashboardid}`,
      'GET'
    );
  const { data: loginData, callApi: postAuthLogin } = useApi<LoginResponseDto>(
    '/auth/login',
    'POST'
  );
  const { data: user, callApi: getMe } = useApi<UserServiceResponseDto>(
    '/users/me',
    'GET'
  );

  const login = useCallback(
    async (body: LoginRequestDto) => {
      await postAuthLogin(body);
      await getMe(undefined);
    },
    [postAuthLogin, getMe]
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
  }, [dashboardid, getDashBoardMembers, getDashBoardDetail, loginData]);

  useEffect(() => {
    if (loginData?.accessToken) {
      localStorage.setItem('accessToken', loginData?.accessToken);
    }
  }, [loginData]);

  useEffect(() => {
    getMe(undefined);
  }, [getMe]);

  const value = useMemo(
    () => ({
      user,
      dashboard: {
        ...dashBoardMembersData,
        ...dashBoardDetailData,
      },
      setDashboardid,
      login,
    }),
    [user, login, dashBoardMembersData, dashBoardDetailData]
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

export function useRoot() {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(
      'useRoot는 RootProvider 하위 컴포넌트에서 사용해야 합니다.'
    );
  }

  return context;
}
