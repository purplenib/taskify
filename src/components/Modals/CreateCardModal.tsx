import '@mantine/dates/styles.css';
import {
  ChangeEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  Button,
  Combobox,
  Input,
  InputBase,
  Modal,
  Textarea,
  useCombobox,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import Image from 'next/image';

import ImageCropperModal from '@components/Modals/ImageCropperModal';
import { CreateCardRequestDto } from '@core/dtos/CardsDto';
import { MemberApplicationServiceResponseDto } from '@core/dtos/MembersDto';
import addPurple from '@icons/add_purple.png';

interface CreateCardModalProps {
  members: MemberApplicationServiceResponseDto[];
  columnId: number;
  register: UseFormRegister<CreateCardRequestDto>;
  handleSubmit: UseFormHandleSubmit<CreateCardRequestDto, undefined>;
  errors: FieldErrors<CreateCardRequestDto>;
  control: Control<CreateCardRequestDto>;
  setValue: UseFormSetValue<CreateCardRequestDto>;
  getValues: UseFormGetValues<CreateCardRequestDto>;
  watch: UseFormWatch<CreateCardRequestDto>;
  onSubmitCreateCard: (fieldData: CreateCardRequestDto) => Promise<void>;
  closeCreateCard: () => void;
  isAllInputFilled: boolean;
}
export default function CreateCardModal({
  members,
  columnId,
  register,
  handleSubmit,
  control,
  setValue,
  getValues,
  watch,
  onSubmitCreateCard,
  closeCreateCard,
}: CreateCardModalProps) {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedAssigneeImg, setSelectedAssigneeImg] = useState('');

  // ---------태그인풋 로직
  const tags = watch('tags');
  const handleKeyDownTag: KeyboardEventHandler<HTMLInputElement> = e => {
    if (!(e.key === 'Enter' && tagInputRef.current)) {
      return;
    }
    e.preventDefault();
    const currentTags = getValues('tags') || [];
    const newTags = tagInputRef.current.value;
    setValue('tags', [...currentTags, newTags]);
    tagInputRef.current.value = '';
  };
  // ---------이미지 인풋 로직(+이미지크롭 모달)
  const [cropperModal, { open: openCropper, close: closeCropper }] =
    useDisclosure(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];
    const encodedImage = URL.createObjectURL(image);
    setImageSrc(encodedImage);
    openCropper();
  };
  const handleImageUrlData = (imageUrl: string) => {
    setValue('imageUrl', imageUrl);
  };
  const image = watch('imageUrl');

  const handleAssigneeUserIdValue = useCallback(
    (nickname: string) => {
      const selectedUser = members.find(member => member.nickname === nickname);
      setValue('assigneeUserId', selectedUser?.userId);
    },
    [members, setValue]
  );

  // assignee가 변경되면 field value를 바꾸고 이미지 불러옴
  useEffect(() => {
    setSelectedAssigneeImg(() => {
      const selectedUser = members.find(
        member => member.nickname === selectedAssignee
      );
      if (!selectedUser?.profileImageUrl) {
        return '';
      }
      return selectedUser.profileImageUrl;
    });
    handleAssigneeUserIdValue(selectedAssignee);
  }, [selectedAssignee, handleAssigneeUserIdValue, members]);
  return (
    <>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(data => {
          onSubmitCreateCard(data);
          closeCreateCard();
        })}
      >
        <div>
          <span className="font-2lg-18px-medium">담당자</span>
          <Combobox
            store={combobox}
            onOptionSubmit={value => {
              setSelectedAssignee(value);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                className="pt-2.5"
                component="button"
                type="button"
                rightSection={<Combobox.Chevron />}
                onClick={() => combobox.toggleDropdown()}
                pointer
              >
                {selectedAssignee ? (
                  <div className="flex items-center gap-2">
                    {selectedAssigneeImg ? (
                      <Image
                        className="rounded-full"
                        src={selectedAssigneeImg}
                        width={25}
                        height={25}
                        alt="멤버 프로필"
                      />
                    ) : (
                      <span className="h-[25px] w-[25px]" />
                    )}
                    <span className="font-lg-16px-regular">
                      {selectedAssignee}
                    </span>
                  </div>
                ) : (
                  <Input.Placeholder>담당자를 선택하세요.</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
              {members.map(member => (
                <Combobox.Option value={member.nickname} key={member.id}>
                  <button className="flex items-center gap-2">
                    {member.profileImageUrl ? (
                      <Image
                        className="rounded-full"
                        src={member.profileImageUrl}
                        width={25}
                        height={25}
                        alt="멤버 프로필"
                      />
                    ) : (
                      <span className="h-[25px] w-[25px]" />
                    )}
                    <span>{member.nickname}</span>
                  </button>
                </Combobox.Option>
              ))}
            </Combobox.Dropdown>
          </Combobox>
        </div>

        <Input.Wrapper
          withAsterisk
          label={<span className="font-2lg-18px-medium">제목</span>}
        >
          <Input
            {...register('title')}
            className="pt-2.5"
            placeholder="제목을 입력해 주세요."
          />
        </Input.Wrapper>
        <Input.Wrapper
          withAsterisk
          label={<span className="font-2lg-18px-medium">설명</span>}
        >
          <Textarea
            placeholder="설명을 입력해 주세요."
            className="pt-2.5"
            {...register('description')}
            rows={5}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label={<span className="font-2lg-18px-medium">마감일</span>}
        >
          <Controller
            name="dueDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DateInput
                value={
                  value
                    ? dayjs(value, 'YYYY. MM. DD HH:mm').toDate()
                    : new Date()
                }
                onChange={onChange}
                name="dueDate"
                minDate={new Date()}
                valueFormat="YYYY. MM. DD HH:mm"
                className="pt-2.5"
                clearable
              />
            )}
          />
        </Input.Wrapper>

        <div>
          <span className="font-2lg-18px-medium">태그</span>

          <div className="mt-2 flex h-12 w-full items-center gap-2 whitespace-nowrap border border-[#ced4da] px-2.5">
            <div className="max-w-[50%] overflow-hidden">
              {tags &&
                tags.map((tag, index) => {
                  const keyValue = `${tag}${index}`;
                  return (
                    <span
                      key={keyValue}
                      className="mr-2 border px-0.5 py-1 font-md-14px-regular"
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
            <input
              ref={tagInputRef}
              onKeyDown={handleKeyDownTag}
              placeholder="입력 후 Enter"
              className="placeholder:text-gray-300 placeholder:font-md-14px-regular"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-2lg-18px-medium">이미지</span>
          {image ? (
            <button
              className="max-w-[127px]"
              type="button"
              onClick={() => {
                imgInputRef.current?.click();
              }}
            >
              <Image
                src={image}
                width={127}
                height={76}
                alt="업로드한 이미지"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                imgInputRef.current?.click();
              }}
              className="flex h-[76px] w-[76px] items-center justify-center rounded-md bg-gray-50"
            >
              <Image
                src={addPurple}
                alt="이미지 추가하기"
                width={28}
                height={28}
              />
            </button>
          )}
          <input
            onChange={onChangeFileInput}
            ref={imgInputRef}
            type="file"
            className="hidden"
          />
        </div>
        <div className="flex h-[54px] w-full">
          <Button
            type="button"
            className="h-full grow border-gray-200 bg-white text-gray-400"
            onClick={closeCreateCard}
          >
            취소
          </Button>
          <Button type="submit" className="h-full grow bg-violet">
            생성
          </Button>
        </div>
      </form>
      <Modal opened={cropperModal} onClose={closeCropper}>
        <ImageCropperModal
          closeCropper={closeCropper}
          imageSrc={imageSrc!}
          columnId={columnId}
          handleImageUrlData={handleImageUrlData}
        />
      </Modal>
    </>
  );
}
