'use client';

import { useRoot } from '@/src/core/contexts/RootContexts';
import { useEffect } from 'react';

export default function Home() {
  const { login } = useRoot();

  useEffect(() => {
    const handleLogin = async () => {
      await login({ email: 'ex3222@gmail.com', password: '123123123' });
    };
    handleLogin();
  }, [login]);

  return <div className="font-3xl-32px-bold">hello</div>;
}
