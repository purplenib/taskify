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

import { usePathname, useRouter } from 'next/navigation';

import useApi from '@/src/lib/hooks/useApi';
import { DashboardsResponseDto } from '@core/dtos/DashboardDto';
import { initialDashboard } from '@lib/constants/initialValues';

import type {
  LoginRequestDto,
  LoginResponseDto,
  UserServiceResponseDto,
} from '@core/dtos/AuthDto';

interface ContextValue {
  user: UserServiceResponseDto | undefined;
  dashboardid: string | undefined;
  dashBoardList: Partial<DashboardsResponseDto>;

  setDashboardid: Dispatch<SetStateAction<string | undefined>>;
  redirectDashboard: (id: number) => void;
  login: (body: LoginRequestDto) => Promise<void>;
}

const RootContext = createContext<ContextValue>({
  user: undefined,
  dashboardid: undefined,
  dashBoardList: {},

  setDashboardid: () => {},
  redirectDashboard: () => {},
  login: async () => {},
});

export default function RootProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [dashboardid, setDashboardid] = useState<string | undefined>(undefined);

  const { data: loginData, callApi: postAuthLogin } = useApi<LoginResponseDto>(
    '/auth/login',
    'POST'
  );
  const { data: user, callApi: getMe } = useApi<UserServiceResponseDto>(
    '/users/me',
    'GET'
  );
  const { data: dashBoardList = initialDashboard, callApi: getDashBoardList } =
    useApi<DashboardsResponseDto>('/dashboards', 'GET');

  const redirectDashboard = useCallback(
    (id: number) => {
      setDashboardid(String(id));
      router.push(`/dashboard/${id}`);
    },
    [router]
  );

  const login = useCallback(
    async (body: LoginRequestDto) => {
      await postAuthLogin(body);
      await getMe(undefined);
    },
    [postAuthLogin, getMe]
  );

  useEffect(() => {
    if (loginData?.accessToken) {
      localStorage.setItem('accessToken', loginData?.accessToken);
    }
    getMe(undefined);
    getDashBoardList(undefined, {
      params: {
        navigationMethod: 'infiniteScroll',
        page: 1,
        size: 10,
      },
    });
  }, [loginData, getMe, getDashBoardList, router, pathname]);

  const value = useMemo(
    () => ({
      user,
      dashboardid,
      dashBoardList,
      setDashboardid,
      login,
      redirectDashboard,
    }),
    [user, dashboardid, login, dashBoardList, redirectDashboard]
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
