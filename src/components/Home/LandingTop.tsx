import Image from 'next/image';
import Link from 'next/link';

export default function LandingTop() {
  return (
    <div className="mb-[76px] mt-[102px] flex w-full flex-col items-center justify-center">
      <div>
        <Image
          src="/images/landing_top.png"
          alt="description"
          width={287}
          height={168}
          priority
        />
        <div className="mt-[26px] flex flex-col flex-wrap items-center justify-center">
          <h1 className="font-4xl-40px-bold">새로운 일정 관리</h1>
          <h1 className="mt-[6px] text-violet font-4xl-42px-bold">Taskify</h1>
        </div>
      </div>
      <Link
        href="/login"
        className="mb-[] mt-[101px] flex h-[46px] w-[235px] items-center justify-center rounded-lg bg-violet text-white font-md-14px-medium"
      >
        로그인하기
      </Link>
    </div>
  );
}
