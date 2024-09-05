import { useState } from 'react';

interface UsePaginationProps {
  // 전체 아이템 수
  totalItems: number;
  // 한 페이지에 표시할 아이템 수
  itemsPerPage: number;
}

export default function usePagination({
  totalItems,
  itemsPerPage,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // pageNumber : 변경될 페이지 번호
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return {
    currentPage,
    totalPages,
    handlePageChange,
  };
}
