import React from 'react';

import { Avatar, Flex, Text } from '@mantine/core';
import Image from 'next/image';

import { useRoot } from '@core/contexts/RootContexts';

export default function UserProfile() {
  const { user } = useRoot();

  return (
    <Flex className="items-center gap-3">
      {user && (
        <>
          <Avatar>
            {user.profileImageUrl && (
              <Image
                width={38}
                height={38}
                src={user.profileImageUrl}
                alt="my profile"
              />
            )}
          </Avatar>
          <Text className="hidden font-lg-16px-medium md:block">
            {user.nickname}
          </Text>
        </>
      )}
    </Flex>
  );
}
