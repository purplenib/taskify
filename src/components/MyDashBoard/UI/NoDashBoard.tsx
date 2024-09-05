import Image from 'next/image';
import dashboardEmpty from '@images/dashboard_empty.png';

interface NoDashBoardProps {
  text: string;
}

export default function NoDashboard({ text }: NoDashBoardProps) {
  return (
    <div className="flex flex-col items-center gap-6 pb-[120px] pt-10">
      <Image
        src={dashboardEmpty}
        alt="빈 대시보드 이미지"
        width={100}
        height={100}
      />
      <p className="text-gray-300 font-2lg-18px-regular">{text}</p>
    </div>
  );
}
