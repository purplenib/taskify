'use client';

import React, { useState } from 'react';
import searchIcon from '@/app/favicon.ico';
import Image from 'next/image';

interface SearchFormProps {
  divClassName?: string;
  inputClassName?: string;
  onSearch: (searchTerm: string) => void;
}

function SearchForm({
  divClassName,
  inputClassName,
  onSearch,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={`${divClassName} relative`}>
      <Image
        src={searchIcon}
        alt="돋보기 아이콘"
        className="absolute left-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={handleSearch}
        width={16}
        height={16}
      />
      <input
        className={`${inputClassName} flex h-full rounded-xl bg-gray-100 py-[9px] pl-14 pr-5 text-gray-400 outline-none`}
        placeholder="검색"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}

export default SearchForm;
