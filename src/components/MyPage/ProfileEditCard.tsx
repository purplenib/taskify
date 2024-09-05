'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Stack } from '@mantine/core';

import FileInput from '@components/@shared/Common/Inputs/FileInput';
import Input from '@components/@shared/Common/Inputs/Input';
import PrimaryButton from '@components/@shared/UI/Button/PrimaryButton';
import { useRoot } from '@core/contexts/RootContexts';
import postImageUpload from '@lib/api/postImageUpload';
import putMyProfile from '@lib/api/putMyProfile';

interface FormData {
  email: string;
  nickname: string;
  image: File | string;
}

export default function ProfileEditCard() {
  const { user, refreshUser } = useRoot();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    if (
      data.image === user?.profileImageUrl &&
      data.nickname === user.nickname
    ) {
      // eslint-disable-next-line no-console
      console.log('이전과 프로필 정보가 같습니다.');
      return;
    }
    const { nickname, image } = data;
    const formData = new FormData();
    let imgURL = image;
    if (image instanceof File) {
      formData.append('image', image);
      imgURL = await postImageUpload(formData);
    }
    const res = await putMyProfile({
      nickname,
      profileImageUrl: imgURL,
    });
    if ('message' in res) {
      return;
    }
    refreshUser();
  };

  const watchImage = watch('image');

  useEffect(() => {
    const setInitialInputs = async () => {
      if (user) {
        setValue('email', user.email, { shouldValidate: true });
        setValue('nickname', user.nickname, { shouldValidate: true });
        setValue('image', user.profileImageUrl!, { shouldValidate: true });
      }
    };
    setInitialInputs();
  }, [user, setValue]);

  return (
    <form className="z-10 flex flex-col gap-10 rounded-lg bg-white p-4">
      <h1 className="font-2lg-18px-bold">프로필</h1>
      <FileInput
        id="image"
        value={watchImage}
        setValue={setValue}
        register={register}
        errors={errors}
        validation={{
          validate: {
            required: (file: File | string) => {
              if (typeof file === 'string') return true;
              if (!file) return '파일을 선택해주세요';
              return true;
            },
            acceptedFormats: (file: File | string) => {
              if (typeof file === 'string') return true;
              if (!['image/jpeg', 'image/png'].includes(file.type))
                return 'PNG 또는 JPG 파일만 업로드 가능합니다.';
              return true;
            },
          },
        }}
      />
      <Stack className="gap-6">
        <Input
          id="email"
          label="이메일 (수정 불가능)"
          type="email"
          placeholder="이메일을 입력해 주세요"
          register={register}
          readOnly
          validation={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '잘못된 이메일 형식입니다.',
            },
          }}
          errors={errors}
        />
        <Input
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          register={register}
          validation={{
            required: '닉네임을 입력해주세요',
            maxLength: {
              value: 10,
              message: '닉네임은 10자 이하로 작성해주세요.',
            },
          }}
          errors={errors}
        />
        <PrimaryButton
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          disabled={!isValid}
        >
          저장
        </PrimaryButton>
      </Stack>
    </form>
  );
}
