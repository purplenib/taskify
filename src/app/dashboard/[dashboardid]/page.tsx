'use client';

import { useEffect } from 'react';

import { useRoot } from '@/src/core/contexts/RootContexts';
import ColumnList from '@components/dashboard/ColumnList';
import DashBoardProvider from '@core/contexts/DashBoardContext';

const AUTH_OBJECT = [
  'ex3222@gmail.com',
  'ex32221@gmail.com',
  'ex32222@gmail.com',
  'ex32223@gmail.com',
];

function DashBoardPage() {
  const { login } = useRoot();

  useEffect(() => {
    const handleLogin = async () => {
      await login({ email: AUTH_OBJECT[0], password: '123123123' });
    };
    handleLogin();
  }, [login]);

  return (
    <DashBoardProvider>
      <div className="ml-[67px] mt-[60px] flex flex-col overflow-hidden pb-[49px] md:ml-[160px] md:mt-[70px] xl:ml-[300px] xl:max-h-[92vh] xl:flex-row">
        <ColumnList />
      </div>
    </DashBoardProvider>
  );
}

export default DashBoardPage;
