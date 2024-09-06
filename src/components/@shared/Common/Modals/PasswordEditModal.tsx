import { PropsWithChildren } from 'react';

import { Flex, Modal, Stack } from '@mantine/core';

import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';

type DeviceKeyObject = {
  [key in keyof typeof DEVICE]: string;
};

const MODAL_SIZE: DeviceKeyObject = {
  mobile: '272px',
  tablet: '368px',
  desktop: '368px',
};

export default function PasswordEditModal({
  children,
  opened,
  onClose,
}: PropsWithChildren<{
  opened: boolean;
  onClose: () => void;
}>) {
  const device = useDevice();

  return (
    <Modal
      p="0px"
      size={MODAL_SIZE[device]}
      radius="16px"
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
    >
      <Stack className="items-center gap-4 p-4">
        <h2 className="font-lg-16px-medium md:font-xl-20px-medium">
          {children}
        </h2>
        <Flex className="mt-4 gap-2">
          <PrimaryButton disabled={false} onClick={onClose}>
            확인
          </PrimaryButton>
        </Flex>
      </Stack>
    </Modal>
  );
}
