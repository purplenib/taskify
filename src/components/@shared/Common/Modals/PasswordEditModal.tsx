import { PropsWithChildren } from 'react';

import { Flex, Modal, Stack } from '@mantine/core';

import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';

type DeviceKeyObject = {
  [key in keyof typeof DEVICE]: string;
};

const MODAL_SIZE: DeviceKeyObject = {
  mobile: '327px',
  tablet: '584px',
  desktop: '584px',
};

const MODAL_RADIUS: DeviceKeyObject = {
  mobile: '8px',
  tablet: '16px',
  desktop: '16px',
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
      size={MODAL_SIZE[device]}
      radius={MODAL_RADIUS[device]}
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
    >
      <Stack className="gap-4 md:p-4">
        <h2 className="font-xl-20px-bold">{children}</h2>
        <Flex className="mt-4 gap-2">
          <PrimaryButton disabled={false} onClick={onClose}>
            확인
          </PrimaryButton>
        </Flex>
      </Stack>
    </Modal>
  );
}
