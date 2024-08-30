'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import useApi from '@/src/lib/hooks/useApi';
import type {
  LoginRequestDto,
  LoginResponseDto,
  UserServiceReponseDto,
} from '@/src/core/dtos/loginDto';

export type UserType = UserServiceReponseDto;
export type LoginType = (body: LoginRequestDto) => Promise<void>;

export interface ContextValue {
  user: Partial<UserType> | undefined;
  login: (body: LoginRequestDto) => Promise<void>;
}

const RootContext = createContext<ContextValue>({
  user: {},
  login: async () => {},
});

export default function RootProvider({ children }: PropsWithChildren) {
  const { data, callApi } = useApi<LoginResponseDto>('/auth/login', 'POST');

  const login = useCallback(
    async (body: LoginRequestDto) => {
      await callApi(body);
    },
    [callApi]
  );

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data?.accessToken);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      user: data?.user,
      login,
    }),
    [data, login]
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
