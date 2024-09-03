'use client';

import React, { useState } from 'react';
<<<<<<< HEAD
import Image from 'next/image';
import searchIcon from '@/public/icons/search.png';
=======
import searchIcon from '@/public/icons/search.png';
import Image from 'next/image';
>>>>>>> decc019688b55116340a2e1a34ca20ebfd0f5c7a

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
<<<<<<< HEAD
    <div className="relative mx-auto mt-8 w-full">
=======
    <div className="relative mx-auto mt-8 w-[966px]">
>>>>>>> decc019688b55116340a2e1a34ca20ebfd0f5c7a
      <Image
        src={searchIcon}
        alt="돋보기 아이콘"
        className="absolute left-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={handleSearch}
        width={16}
        height={16}
      />
      <input
<<<<<<< HEAD
        className="flex h-full w-full rounded-md bg-white px-4 py-[6px] pl-9 text-gray-300 outline-none outline-1 outline-gray-200"
        placeholder="대시보드 이름을 검색해보세요."
=======
        className="flex h-full w-full rounded-md bg-white px-4 py-[6px] pl-8 text-gray-300 outline-none outline-1 outline-gray-200"
        placeholder="검색"
>>>>>>> decc019688b55116340a2e1a34ca20ebfd0f5c7a
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}

export default SearchForm;
