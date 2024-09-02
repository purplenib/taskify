import Image from 'next/image';
import arrowLeft from '@icons/arrow_left.png';
import arrowRight from '@icons/arrow_right.png';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  totalCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const size = 10; // 한 페이지에 표시할 아이템 수
  const totalPages = Math.ceil(totalCount / size);

  // 페이지 이동 함수
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <p className="text-black-600 font-md-14px-regular">
        {currentPage} 페이지 중 {totalPages}
      </p>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={handlePrevious}
          className="h-10 w-10 rounded-[4px] border-gray-200 bg-white text-gray-600 outline-1"
          disabled={currentPage === 1}
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
          onClick={handleNext}
          className="h-10 w-10 rounded-[4px] border-gray-200 bg-white text-gray-600 outline-1"
          disabled={currentPage === totalPages}
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
