import Image from 'next/image';
import mockImg from '@/public/images/codeit_logo.png';

export default function Card() {
  return (
    <div className="mt-4 flex flex-col gap-1 rounded-md border border-gray-200 bg-white px-3 pb-[5px] pt-3 md:flex-row md:gap-5 xl:flex-col xl:gap-4">
      <div className="relative w-full pb-[60%] md:w-[90px] md:pb-[54px] xl:w-full xl:pb-[60%]">
        <Image src={mockImg} fill alt="카드 이미지" />
      </div>
      <div className="w-full flex-col">
        <p className="pb-2.5 font-lg-16px-medium">할 일 내용</p>
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row xl:flex-col">
          <span>태그들</span>
          <div className="flex items-center justify-between md:grow">
            <span className="font-xs-12px-medium">날짜</span>
            <span>작성자프로필</span>
          </div>
        </div>
      </div>
    </div>
  );
}
