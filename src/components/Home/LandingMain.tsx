import DescriptonCard from '@components/Home/DescriptonCard';
import PointCard from '@components/Home/PointCard';

export default function LandingMain() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <PointCard
          point="01"
          title="일의 우선순위를 관리하세요"
          image="/images/landing1.png"
          alt=""
        />
        <PointCard
          point="02"
          title="해야 할 일을 등록하세요"
          image="/images/landing2.png"
          alt=""
        />
      </div>
      <div className="mb-[120px] flex w-full flex-col items-center justify-center">
        <p className="mb-[42px] mt-[31px] font-2xl-22px-regular">
          생산성을 높이는 다양한 설정⚡
        </p>
        <DescriptonCard
          title="대시보드 설정"
          des="대시보드 사진과 이름을 변경할 수 있어요."
          image="/images/landing3.png"
        />
        <DescriptonCard
          title="초대"
          des="새로운 팀원을 초대할 수 있어요."
          image="/images/landing4.png"
        />
        <DescriptonCard
          title="구성원"
          des="구성원을 초대하고 내보낼 수 있어요."
          image="/images/landing4.png"
        />
      </div>
    </>
  );
}
