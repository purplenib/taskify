import Image from 'next/image';

import LinkButton from '@components/@shared/UI/Button/LinkButton';
import arrowRight from '@icons/arrow_right.png';
import crown from '@icons/crown.png';

interface DashboardCardProps {
  value: {
    id: string;
    title: string;
    color: string;
    createdByMe: boolean;
  };
}

const DashboardCard = ({ value }: DashboardCardProps) => {
  const { id: dashboardId } = value;

  return (
    <LinkButton
      href={`/dashboards/${dashboardId}`}
      className="flex justify-between rounded-lg border border-gray-200 bg-white px-5 py-[22px] font-lg-16px-semibold"
    >
      <div className="my-auto flex flex-1 gap-3">
        <div
          className="my-auto h-2 w-2 rounded-full"
          style={{ backgroundColor: value.color }}
          aria-label="link button"
        />
        <p className="text-black-600">{value.title}</p>
        {value.createdByMe && (
          <Image
            src={crown}
            alt="왕관 아이콘"
            width={18}
            height={14}
            className="my-auto"
          />
        )}
      </div>
      <Image
        src={arrowRight}
        alt="오른쪽 화살표 아이콘"
        width={18}
        height={18}
        className="my-auto"
      />
    </LinkButton>
  );
};

export default DashboardCard;
