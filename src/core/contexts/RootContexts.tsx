'use client';

import instance from '@/lib/api/instance';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const RootContext = createContext({
  dashboards: {},
});

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU0OCwidGVhbUlkIjoiOC0zIiwiaWF0IjoxNzI0OTE1NDA1LCJpc3MiOiJzcC10YXNraWZ5In0.2lD9BNxxWs-UzgrO606_5BRI3vasRuUl--GpuQaOEBs';

export default function RootProvider({ children }: PropsWithChildren) {
  const [dashboards, setDashboards] = useState({});

  useEffect(() => {
    const fetchMyDashBoards = async () => {
      const res = await instance.get('/dashboards', {
        params: {
          navigationMethod: 'infiniteScroll',
        },
      });
      const { data } = res;
      setDashboards(data);
    };
    localStorage.setItem('accessToken', token);
    fetchMyDashBoards();
  }, []);

  const value = useMemo(
    () => ({
      dashboards,
    }),
    [dashboards]
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
