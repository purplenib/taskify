import { useRoot } from '@core/contexts/RootContexts';
import { Avatar, Button, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AuthHeader() {
  const { dashboard } = useRoot();
  const { title, createdByMe, members } = dashboard!;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center justify-between border-b-[1px] border-gray-200 bg-white px-6 md:h-[70px] md:px-10 xl:px-[70px]">
      {dashboard && (
        <>
          <div>
            <h1>{title}</h1>
            {createdByMe && (
              <Image
                width={20}
                height={16}
                src="/icons/crown.png"
                alt="createByMe"
              />
            )}
          </div>
          <Group>
            <Button>
              <Link href="/mypage">관리</Link>
            </Button>
            <Button>초대하기</Button>
          </Group>
          <Avatar.Group>
            {members &&
              members.map(member => (
                <Avatar key={member.id}>
                  <Image
                    width={38}
                    height={38}
                    src={member.profileImageUrl ?? '/images/small_logo.png'}
                    alt="member profile"
                  />
                </Avatar>
              ))}
          </Avatar.Group>
        </>
      )}
    </header>
  );
}
