import Image from 'next/image';
import arrowLeft from '@/public/icons/arrow_left.png';
import arrowRight from '@/public/icons/arrow_right.png';

export default function Pagination() {
  return (
    <div className="flex items-center justify-end gap-4">
      <p className="text-black-600 font-md-14px-regular">
        {} 페이지 중 {}
      </p>
      <div className="flex gap-1">
        <button
          type="button"
          className="h-10 w-10 rounded-[4px] border-gray-200 bg-white text-gray-200 outline-1"
        >
          <Image
            src={arrowLeft}
            alt="이전 목록 버튼"
            width={16}
            height={16}
            className="m-auto"
          />
        </button>
        <button
          type="button"
          className="h-10 w-10 rounded-[4px] border-gray-200 bg-white text-gray-200 outline-1"
        >
          <Image
            src={arrowRight}
            alt="다음 목록 버튼"
            width={16}
            height={16}
            className="m-auto"
          />
        </button>
      </div>
    </div>
  );
}
