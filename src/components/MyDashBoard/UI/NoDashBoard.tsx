import Image from 'next/image';

import DashboardEmpty from '@images/Dashboard_empty.png';

interface NoDashboardProps {
  text: string;
}

export default function NoDashboard({ text }: NoDashboardProps) {
  return (
    <div className="flex flex-col items-center gap-6 pb-[120px] pt-10">
      <Image
        src={DashboardEmpty}
        alt="빈 대시보드 이미지"
        width={100}
        height={100}
      />
      <p className="text-gray-300 font-2lg-18px-regular">{text}</p>
    </div>
  );
}
