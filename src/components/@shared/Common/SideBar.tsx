import { MouseEvent, PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Flex, Modal, Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';

import useDevice, { DEVICE } from '@lib/hooks/useDevice';

import PrimaryButton from '../UI/Button/PrimaryButton';
import SecondaryButton from '../UI/Button/SecondaryButton';

import Input from './Input';

const COLORS: {
  [key: string]: string;
} = {
  green: '#7AC555',
  purple: '#760DDE',
  orange: '#FFA500',
  blue: '#76A5EA',
  pink: '#E876EA',
} as const;

type ColorType = keyof typeof COLORS;

interface Inputs {
  title: string;
}

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

const DashBoardAddModal = ({
  children,
  opened,
  onClose,
}: PropsWithChildren<{
  opened: boolean;
  onClose: () => void;
}>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
    },
  });
  const device = useDevice();
  const [color, setColor] = useState<ColorType>(COLORS.green);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  const handleColorClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    const colorset = target.dataset.color as ColorType;
    setColor(colorset);
  };

  return (
    <>
      <Modal
        size={MODAL_SIZE[device]}
        radius={MODAL_RADIUS[device]}
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        centered
      >
        <Stack className="gap-4 md:p-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-xl-20px-bold">새로운 대시보드</h2>
          <Input
            className="border border-border-gray"
            id="title"
            label="대시보드 이름"
            type="text"
            placeholder="뉴프로젝트"
            register={register}
            errors={errors}
            validation={{
              required: '대시보드 이름을 입력해주세요',
            }}
          />
          <Flex className="gap-2">
            {Object.keys(COLORS).map(colorKey => (
              <button
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full"
                style={{ backgroundColor: COLORS[colorKey] }}
                key={colorKey}
                data-color={COLORS[colorKey]}
                onClick={handleColorClick}
                type="button"
              >
                {color === COLORS[colorKey] && (
                  <Image
                    width={24}
                    height={24}
                    src="/icons/check.png"
                    alt="color check"
                  />
                )}
              </button>
            ))}
          </Flex>
          <Flex className="mt-4 gap-2">
            <SecondaryButton onClick={() => {}}>취소</SecondaryButton>
            <PrimaryButton onClick={() => {}}>확인</PrimaryButton>
          </Flex>
        </Stack>
      </Modal>
      {children}
    </>
  );
};

export default function SideBar() {
  const device = useDevice();
  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = device === 'mobile';

  return (
    <Stack className="fixed bottom-0 left-0 top-0 z-50 w-[67px] items-center border-r border-border-gray bg-white pt-5">
      <Link href="/">
        {isMobile && (
          <Image
            width={24}
            height={28}
            src="/images/small_logo.png"
            alt="logo"
          />
        )}
        {!isMobile && (
          <Image
            width={110}
            height={33}
            src="/images/large_logo.png"
            alt="logo"
          />
        )}
      </Link>
      <DashBoardAddModal opened={opened} onClose={close}>
        <UnstyledButton
          className="relative mt-4 flex h-5 w-5 items-center justify-center"
          onClick={open}
        >
          <Image fill src="/icons/add_box.png" alt="dashboard create" />
        </UnstyledButton>
      </DashBoardAddModal>
      <Stack />
    </Stack>
  );
}
