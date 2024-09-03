import addPurple from '@icons/add_purple.png';
import Image from 'next/image';
import setting from '@icons/settings.png';
import { ColumnServiceResponseDto } from '@core/dtos/dashboardDto';
import useCards from '@lib/hooks/useCards';
import Card from './UI/Card';

interface ColumnProps {
  column: ColumnServiceResponseDto;
}

export default function Column({ column }: ColumnProps) {
  const { cardList } = useCards(column.id);

  if (cardList === null) {
    return;
  }

  return (
    <div className="no-scrollbar mb-4 w-full min-w-[354px] border-b border-gray-100 px-3 pb-6 md:px-5 xl:mb-0 xl:h-full xl:max-h-[100vh] xl:overflow-scroll xl:border-b-0 xl:border-r">
      <div className="mb-6 mt-4 flex h-[22px] justify-between">
        <div className="flex items-center gap-2 rounded-md">
          <span>대시보드칼라</span>
          <span className="pr-1 font-2lg-18px-bold">{column.title}</span>
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-gray-400 font-xs-12px-medium">
            2
          </div>
        </div>
        <Image src={setting} width={22} height={22} alt="컬럼 수정 버튼" />
      </div>
      <div className="flex h-8 w-full items-center justify-center border border-gray-200 bg-white md:h-10">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-violet-white md:h-[22px] md:w-[22px]">
          <Image
            className="h-4 md:w-4"
            src={addPurple}
            alt="카드 추가 버튼"
            width={14.55}
            height={14.55}
          />
        </div>
      </div>
      {/* 배열랜더링 */}
      {cardList.length > 0 &&
        cardList.map(card => <Card key={card.id} card={card} />)}
    </div>
  );
}
