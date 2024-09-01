import React, { PropsWithChildren } from 'react';

import { Avatar, Button, Divider, Flex, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useRoot } from '@core/contexts/RootContexts';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';

const HeaderButton = ({ children }: PropsWithChildren) => {
  return (
    <Button className="rounded-lg border-gray-200 bg-transparent px-3 py-[3px] text-gray-400 hover:bg-gray-200 md:px-4 md:py-[6px]">
      {children}
    </Button>
  );
};

function getMemberLengthByDevice(device: keyof typeof DEVICE) {
  if (device === 'desktop') return 4;
  return 2;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMemberMoreLength(arr: any[] | undefined, ProfileCount: number) {
  if (!arr) return 0;
  const MoreLength = arr.length - ProfileCount;
  if (MoreLength < 1) return 0;
  return MoreLength;
}

function getTitleValue(pathname: string) {
  if (pathname === '/mydashboard') return '내 대시보드';
  if (pathname === '/mypage') return '계정 관리';
  return null;
}

export default function AuthHeader() {
  const pathname = usePathname();
  const device = useDevice();
  const { user, dashBoardMembers, dashBoardDetail } = useRoot()!;

  const ProfileCount = getMemberLengthByDevice(device);
  const ProfileMore = getMemberMoreLength(
    dashBoardMembers?.members,
    ProfileCount
  );
  const isManagedPage =
    pathname.includes('mydashboard') || pathname.includes('mypage');
  const titleValue = getTitleValue(pathname) || dashBoardDetail?.title;

  return (
    <Flex className="fixed left-0 right-0 top-0 z-50 h-[60px] items-center justify-end gap-3 border-b-[1px] border-border-gray bg-white pl-[84px] pr-3 md:h-[70px] md:gap-6 md:px-10 md:pl-[200px] md:pr-10 xl:gap-8 xl:px-[70px] xl:pl-[340px] xl:pr-20">
      <div
        className={`grow items-center font-xl-20px-bold xl:flex xl:gap-2 ${isManagedPage ? 'flex' : 'hidden'}`}
      >
        <h1>{titleValue}</h1>
        {!isManagedPage && dashBoardDetail?.createdByMe && (
          <Image
            width={20}
            height={16}
            src="/icons/crown.png"
            alt="createByMe"
          />
        )}
      </div>
      <Group className="gap-[6px] font-md-14px-medium">
        <HeaderButton>
          <Image
            className="hidden md:mr-2 md:inline"
            width={20}
            height={20}
            src="/icons/settings.png"
            alt="settings"
          />
          <Link href="/mypage">관리</Link>
        </HeaderButton>
        <HeaderButton>
          <Image
            className="hidden md:mr-2 md:inline"
            width={20}
            height={20}
            src="/icons/add_box.png"
            alt="settings"
          />
          초대하기
        </HeaderButton>
      </Group>
      {dashBoardMembers?.members && dashBoardMembers?.members.length !== 0 && (
        <Avatar.Group className="h-[38px]">
          {dashBoardMembers?.members &&
            dashBoardMembers?.members.slice(0, ProfileCount).map(member => (
              <Avatar key={member.id}>
                <Image
                  width={38}
                  height={38}
                  src={member.profileImageUrl ?? '/images/small_logo.png'}
                  alt="member profile"
                />
              </Avatar>
            ))}
          {ProfileMore !== 0 && <Avatar>+{ProfileMore}</Avatar>}
        </Avatar.Group>
      )}
      <Divider className="bg-border-gray" my="sm" orientation="vertical" />
      {user && (
        <Flex className="items-center gap-3">
          <Avatar>
            {user.profileImageUrl && (
              <Image src={user.profileImageUrl} alt="my profile" />
            )}
          </Avatar>
          <Text className="hidden font-lg-16px-medium md:block">
            {user.nickname}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
