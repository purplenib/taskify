import Image from 'next/image';
import dayjs from 'dayjs';

import { CardServiceResponseDto } from '@core/dtos/DashboardDto';
import convertStringToColorHex from '@lib/utils/convertStringToColorHex';
import convertStringToRGBA from '@lib/utils/convertStringToRGBA';

interface CardProps {
  card: CardServiceResponseDto;
}

export default function Card({ card }: CardProps) {
  const formattedDueDate = dayjs(card.dueDate).format('YYYY.MM.DD');
  return (
    <div className="mt-4 flex flex-col gap-1 rounded-md border border-gray-200 bg-white px-3 pb-[5px] pt-3 md:flex-row md:gap-5 xl:flex-col xl:gap-4">
      <div className="relative w-full pb-[60%] md:w-[90px] md:pb-[54px] xl:w-full xl:pb-[60%]">
        {card.imageUrl && <Image src={card.imageUrl} fill alt="카드 이미지" />}
      </div>
      <div className="w-full flex-col">
        <p className="pb-2.5 font-lg-16px-semibold">{card.title}</p>
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row xl:flex-col">
          <div className="flex gap-1.5">
            {card.tags.length > 0 &&
              card.tags.map((tag, index) => (
                <span
                  key={`${tag},${index * card.id}`}
                  className="flex h-[26px] items-center rounded px-1.5 font-md-14px-regular md:h-[28px]"
                  style={{
                    color: `#${convertStringToColorHex(tag)}`,
                    backgroundColor: `${convertStringToRGBA(tag, 0.1)}`,
                  }}
                >
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex items-center justify-between md:grow">
            <span className="text-gray-400 font-xs-12px-medium">
              {formattedDueDate}
            </span>
            <span>작성자프로필</span>
          </div>
        </div>
      </div>
    </div>
  );
}
