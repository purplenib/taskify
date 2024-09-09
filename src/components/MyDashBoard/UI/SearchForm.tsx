'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import searchIcon from '@/public/icons/search.png';
import useDevice from '@lib/hooks/useDevice';

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const deviceType = useDevice();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative mt-0 w-full md:mt-[1px] xl:mx-auto xl:mt-8">
      <Image
        src={searchIcon}
        alt="돋보기 아이콘"
        className="absolute left-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={handleSearch}
        width={16}
        height={16}
      />
      <input
        className="flex h-full w-full rounded-md bg-white px-4 py-[6px] pl-9 text-gray-300 outline-none outline-1 outline-gray-200 font-md-14px-regular md:font-lg-16px-regular"
        placeholder={
          deviceType === 'mobile' ? '검색' : '대시보드 이름을 검색해보세요'
        }
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}

export default SearchForm;
