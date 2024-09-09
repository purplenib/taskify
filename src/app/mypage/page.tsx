'use client';

import React from 'react';

import { Stack } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PasswordConfirmCard from '@components/MyPage/PasswordEditCard';
import ProfileAddCard from '@components/MyPage/ProfileEditCard';

export default function MyPage() {
  const router = useRouter();

  const handleReturnButtonClick = () => {
    router.back();
  };

  return (
    <main className="ml-[67px] mt-[60px] md:ml-[160px] md:mt-[70px] xl:ml-[300px]">
      <Stack className="max-w-[630px] gap-6 px-3 py-4">
        <button
          onClick={handleReturnButtonClick}
          className="flex items-center gap-2 font-md-14px-medium"
        >
          <Image
            width={18}
            height={18}
            src="/icons/arrow_left.png"
            alt="return back page"
          />
          돌아가기
        </button>
        <ProfileAddCard />
        <PasswordConfirmCard />
      </Stack>
    </main>
  );
}
