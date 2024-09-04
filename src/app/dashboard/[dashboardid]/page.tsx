'use client';

import { useEffect } from 'react';

import { useRoot } from '@/src/core/contexts/RootContexts';
import ColumnList from '@components/dashboard/ColumnList';

const AUTH_OBJECT = [
  'ex3222@gmail.com',
  'ex32221@gmail.com',
  'ex32222@gmail.com',
  'ex32223@gmail.com',
];

export default function DashBoardPage() {
  const { login } = useRoot();

  useEffect(() => {
    const handleLogin = async () => {
      await login({ email: AUTH_OBJECT[0], password: '123123123' });
    };
    handleLogin();
  }, [login]);

  return (
    <div className="ml-[67px] mt-[60px] flex flex-col pb-[49px] md:ml-[160px] md:mt-[70px] xl:ml-[300px] xl:flex-row">
      <ColumnList />
    </div>
  );
}
