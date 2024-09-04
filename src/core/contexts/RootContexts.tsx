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
import {
  DashboardApplicationServiceResponseDto,
  DashboardsResponseDto,
} from '@core/dtos/DashboardDto';

import type {
  LoginRequestDto,
  LoginResponseDto,
  UserServiceResponseDto,
} from '@core/dtos/AuthDto';
import type { MembersResponseDto } from '@core/dtos/MembersDto';

interface ContextValue {
  user: UserServiceResponseDto | undefined;
  dashboardid: string | undefined;
  dashBoardList: Partial<DashboardsResponseDto>;
  dashBoardMembers: Partial<MembersResponseDto>;
  dashBoardDetail: Partial<DashboardApplicationServiceResponseDto>;
  setDashboardid: Dispatch<SetStateAction<string | undefined>>;
  redirectDashboard: (id: number) => void;
  login: (body: LoginRequestDto) => Promise<void>;
}

const RootContext = createContext<ContextValue>({
  user: undefined,
  dashboardid: undefined,
  dashBoardList: {},
  dashBoardMembers: {},
  dashBoardDetail: {},
  setDashboardid: () => {},
  redirectDashboard: () => {},
  login: async () => {},
});

const initialMembers: Partial<MembersResponseDto> = {
  members: [],
  totalCount: 0,
};

const initialDetail: Partial<DashboardApplicationServiceResponseDto> = {
  id: undefined,
  title: undefined,
  color: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  createdByMe: undefined,
  userId: undefined,
};

const initialDashboard: Partial<DashboardsResponseDto> = {
  cursorId: undefined,
  totalCount: undefined,
  dashboards: [],
};

export default function RootProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [dashboardid, setDashboardid] = useState<string | undefined>(undefined);
  const {
    data: dashBoardMembers = initialMembers,
    callApi: getDashBoardMembers,
  } = useApi<MembersResponseDto>(`/members`, 'GET');
  const { data: dashBoardDetail = initialDetail, callApi: getDashBoardDetail } =
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
      dashBoardMembers,
      dashBoardDetail,
      dashBoardList,
      setDashboardid,
      login,
      redirectDashboard,
    }),
    [
      user,
      dashboardid,
      login,
      dashBoardMembers,
      dashBoardDetail,
      dashBoardList,
      redirectDashboard,
    ]
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
