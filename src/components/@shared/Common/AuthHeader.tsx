import React from 'react';

import { Divider, Flex, Group } from '@mantine/core';
import Image from 'next/image';

import LinkButton from '../UI/Button/LinkButton';

import HeaderTitle from './HeaderTitle';
import MembersProfile from './MembersProfile';
import UserProfile from './UserProfile';

export default function AuthHeader() {
  return (
    <Flex className="fixed left-0 right-0 top-0 z-50 h-[60px] items-center justify-end gap-3 border-b-[1px] border-border-gray bg-white pl-[84px] pr-3 md:h-[70px] md:gap-6 md:px-10 md:pl-[200px] md:pr-10 xl:gap-8 xl:px-[70px] xl:pl-[340px] xl:pr-20">
      <HeaderTitle />
      <Group className="gap-[6px] font-md-14px-medium">
        <LinkButton href="/mypage">
          <Image
            className="hidden md:mr-2 md:inline"
            width={20}
            height={20}
            src="/icons/settings.png"
            alt="settings"
          />
          관리
        </LinkButton>
        <LinkButton href="/">
          <Image
            className="hidden md:mr-2 md:inline"
            width={20}
            height={20}
            src="/icons/add_box.png"
            alt="settings"
          />
          초대하기
        </LinkButton>
      </Group>
      <MembersProfile />
      <Divider className="bg-border-gray" my="sm" orientation="vertical" />
      <UserProfile />
    </Flex>
  );
}
