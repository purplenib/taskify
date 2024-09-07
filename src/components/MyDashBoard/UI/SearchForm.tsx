'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import searchIcon from '@/public/icons/search.png';

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative mx-auto mt-8 w-full">
      <Image
        src={searchIcon}
        alt="돋보기 아이콘"
        className="absolute left-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={handleSearch}
        width={16}
        height={16}
      />
      <input
        className="flex h-full w-full rounded-md bg-white px-4 py-[6px] pl-9 text-gray-300 outline-none outline-1 outline-gray-200"
        placeholder="대시보드 이름을 검색해보세요."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}

export default SearchForm;
