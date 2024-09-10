/* eslint-disable import/order */

'use client';

import {
  SubmitHandler,
  useForm,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useState, useMemo } from 'react';
import Image from 'next/image';

import { signIn } from 'next-auth/react';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

interface FormValues {
  nickname?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  terms?: boolean;
}

interface InputFieldProps {
  id: keyof FormValues;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>[keyof FormValues] | undefined;
  validation: object;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputField = ({
  id,
  type = 'text',
  placeholder,
  autoComplete,
  showPassword,
  setShowPassword,
  register,
  errors,
  validation,
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {placeholder}
    </label>
    <div className="relative">
      <input
        id={id}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id, validation)}
        className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 focus:outline-none ${
          errors ? 'border-red' : 'border-[#D9D9D9]'
        } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
      />
      {type === 'password' && setShowPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute inset-y-0 right-0 top-5 flex -translate-y-1/2 transform items-center px-3"
          aria-label="Toggle password visibility"
        >
          <Image
            src={`/icons/${
              showPassword ? 'visibility_off' : 'visibility_on'
            }.png`}
            alt={showPassword ? '비밀번호 숨기기' : '비밀번호 표시하기'}
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
    {errors && <p className="mt-1 text-sm text-red">{errors.message}</p>}
  </div>
);

export default function AuthPage({ mode }: AuthPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      router.push(mode === 'login' ? '/mydashboard' : '/login');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Authentication failed:', error);
    }
  };

  const isFormValid = useMemo(() => {
    if (mode === 'signup') {
      return (
        termsAccepted &&
        !Object.keys(errors).length &&
        watch('password') === watch('passwordConfirm')
      );
    }
    return watch('email') && watch('password') && !Object.keys(errors).length;
  }, [errors, watch, mode, termsAccepted]);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleKakaoSign = () => {
    signIn('kakao', {
      callbackUrl: '/mydashboard',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg p-6">
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/images/main_logo.png"
            alt="Taskify logo"
            width={200}
            height={200}
            className="cursor-pointer"
            onClick={handleLogoClick}
          />
          <p className="mt-4 text-[18px] text-black-500 font-2lg-18px-medium">
            {mode === 'login'
              ? '오늘도 만나서 반가워요!'
              : '첫 방문을 환영합니다!'}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <InputField
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              register={register}
              errors={errors.nickname}
              validation={{
                required: '닉네임은 필수 항목입니다.',
                maxLength: {
                  value: 10,
                  message: '열 자 이하로 작성해 주세요.',
                },
                onBlur: () => {},
              }}
            />
          )}

          <InputField
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            autoComplete="email"
            register={register}
            errors={errors.email}
            validation={{
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성해 주세요.',
              },
              onBlur: () => {},
            }}
          />

          <InputField
            id="password"
            type="password"
            placeholder={
              mode === 'login'
                ? '8자 이상 입력해 주세요'
                : '비밀번호를 입력해 주세요'
            }
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            register={register}
            errors={errors.password}
            validation={{
              required: '비밀번호는 필수 항목입니다.',
              minLength: { value: 8, message: '8자 이상 입력해 주세요.' },
              onBlur: () => {},
            }}
          />

          {mode === 'signup' && (
            <>
              <InputField
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                register={register}
                errors={errors.passwordConfirm}
                validation={{
                  validate: (value: string) =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다.',
                  onBlur: () => {},
                }}
              />

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(prev => !prev)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-gray-700"
                >
                  이용약관에 동의합니다.
                </label>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full rounded-lg px-4 py-2 font-semibold text-white ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'cursor-not-allowed bg-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {mode === 'login' ? '로그인' : '가입하기'}
          </button>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <p className="mr-2 text-gray-700">
              {mode === 'login' ? '회원이 아니신가요?' : '이미 회원이신가요?'}
            </p>
            <button
              type="button"
              onClick={() =>
                router.push(mode === 'login' ? '/signup' : '/login')
              }
              className="font-semibold text-indigo-600 underline hover:text-indigo-800"
            >
              {mode === 'login' ? '회원가입하기' : '로그인하기'}
            </button>
          </div>
          <button onClick={handleKakaoSign}>kakao Sign In</button>
        </form>
      </div>
    </div>
  );
}
