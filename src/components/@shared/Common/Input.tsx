import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  useForm,
} from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';

import cn from '@lib/utils/cn';

type Props<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type: string;
  onVisible?: (name: 'password' | 'passwordCheck') => void;
  onTrigger?: () => void;
  placeholder: string;
  register: ReturnType<typeof useForm<T>>['register'];
  validation: RegisterOptions<T, Path<T>>;
  errors: FieldErrors;
  className?: string;
};

function Input<T extends FieldValues>({
  id,
  label,
  type,
  onVisible,
  placeholder,
  register,
  onTrigger,
  validation,
  errors,
  className = '',
}: Props<T>) {
  const { ref, ...rest } = register(id, validation);
  const name = id as string;
  const visibleIcon =
    type !== 'password' ? '/icon/visibility.png' : '/icon/invisibility.png';

  const handleVisible = () => {
    if (onVisible) {
      onVisible(name as 'password' | 'passwordCheck');
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onTrigger) onTrigger();
    if (rest.onBlur) rest.onBlur(event);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label className="font-lg-14px-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className={cn(
          'bg-secondary-100 hover:border-primary-100 rounded-xl px-4 py-[13px] placeholder:font-lg-16px-regular',
          errors[name] ? 'border-[1px] border-[#F74747]' : '',
          className
        )}
        type={type}
        id={id}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        onBlur={handleBlur}
      />
      {onVisible && (
        <button
          type="button"
          className="absolute right-4 top-12"
          onClick={handleVisible}
        >
          <Image
            width={24}
            height={24}
            src={visibleIcon}
            alt="visibility btn"
          />
        </button>
      )}
      {errors && (
        <ErrorMessage
          className="text-error pl-6 font-lg-14px-semibold"
          name={name}
          errors={errors}
          as="span"
        />
      )}
    </div>
  );
}

export default Input;
