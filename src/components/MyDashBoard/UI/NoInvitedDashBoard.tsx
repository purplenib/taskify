import Image from 'next/image';
import dashboardEmpty from '@/public/images/dashboard_empty.png';

export default function NoInvitedDashBoard() {
  return (
    <div className="flex flex-col items-center gap-6 pb-[120px] pt-10">
      <Image
        src={dashboardEmpty}
        alt="빈 대시보드 이미지"
        width={100}
        height={100}
      />
      <p className="text-gray-300 font-2lg-18px-regular">
        아직 초대받은 대시보드가 없어요
      </p>
    </div>
  );
}
