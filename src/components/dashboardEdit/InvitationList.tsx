import Image from 'next/image';

export default function InvitationList() {
  return (
    <div className="max-w-md rounded-md border bg-white p-6 shadow-sm md:mx-0 md:max-w-[544px] xl:max-w-[620px]">
      {/* 모바일 > 초대 내역 + 페이지네이션 / 초대 버튼 X */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-xl-20px-bold">초대 내역</h2>
        <div className="flex items-center gap-2 md:hidden">
          <span>페이지네이션</span>
        </div>

        {/* md 이상 > 페이지네이션 + 초대 버튼 */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2">
            <span>페이지네이션</span>
          </div>
          <button
            type="button"
            className="flex h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white font-md-14px-medium"
          >
            <Image
              src="/icons/add_box.png"
              alt="초대하기"
              width={16}
              height={16}
            />
            초대하기
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>이메일</div>

        {/* 모바일 > 초대 버튼 */}
        <button
          type="button"
          className="flex h-8 w-[105px] items-center justify-center gap-2 rounded border border-solid bg-violet text-white font-md-14px-medium md:hidden"
        >
          <Image
            src="/icons/add_box.png"
            alt="초대하기"
            width={16}
            height={16}
          />
          초대하기
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>go5rae@naver.com</div>
        <button
          type="button"
          className="flex h-8 w-20 items-center justify-center rounded border border-solid border-gray-200 text-violet font-md-14px-medium"
        >
          취소
        </button>
      </div>
    </div>
  );
}
