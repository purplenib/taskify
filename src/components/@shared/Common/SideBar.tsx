'use client';

import { MouseEvent, PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Flex, Modal, Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';

import postCreateDashboard from '@core/api/postDashboard';
import { useRoot } from '@core/contexts/RootContexts';
import COLORS from '@lib/constants/themeConst';
import useDevice, { DEVICE } from '@lib/hooks/useDevice';
import cn from '@lib/utils/cn';

import PrimaryButton from '../UI/Button/PrimaryButton';
import SecondaryButton from '../UI/Button/SecondaryButton';

import Input from './Input';

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
  const { redirectDashboard } = useRoot();
  const device = useDevice();
  const [color, setColor] = useState<ColorType>(COLORS.green);

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    let res;
    try {
      res = await postCreateDashboard({ title, color });
      redirectDashboard(res.data.id);
    } catch {
      // eslint-disable-next-line no-console
      console.log('네트워크 에러가 발생하였습니다. 잠시 후 다시 시도해주세요');
    }
  };

  const handleColorClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    const { color: colorSet } = target.dataset;
    setColor(colorSet as ColorType);
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
            <SecondaryButton onClick={onClose}>취소</SecondaryButton>
            <PrimaryButton onClick={handleSubmit(onSubmit)}>확인</PrimaryButton>
          </Flex>
        </Stack>
      </Modal>
      {children}
    </>
  );
};

export default function SideBar() {
  const { dashboardid, dashBoardList, redirectDashboard } = useRoot();
  const device = useDevice();
  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = device === 'mobile';

  const { dashboards } = dashBoardList;

  const handleDashboardClick = (id: number) => {
    redirectDashboard(id);
  };

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
      <Stack>
        {dashboards &&
          dashboards?.map(dashboard => (
            <button
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded hover:border-2 hover:border-blue',
                dashboard.id === Number(dashboardid) && 'bg-violet-white'
              )}
              key={dashboard.id}
              onClick={() => handleDashboardClick(dashboard.id)}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dashboard.color }}
                aria-label="link button"
              />
            </button>
          ))}
      </Stack>
      <Stack />
    </Stack>
  );
}
