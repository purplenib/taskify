'use client';

import { useRoot } from '@/src/core/contexts/RootContexts';
import { useEffect } from 'react';

const AUTH_OBJECT = [
  'ex3222@gmail.com',
  'ex32221@gmail.com',
  'ex32222@gmail.com',
  'ex32223@gmail.com',
];

export default function Home() {
  const { login } = useRoot();

  useEffect(() => {
    const handleLogin = async () => {
      await login({ email: AUTH_OBJECT[0], password: '123123123' });
    };
    handleLogin();
  }, [login]);

  return <div className="font-3xl-32px-bold">hello</div>;
}
