import Image from 'next/image';

export default function LandingBottom() {
  return (
    <div className="flex flex-col items-center text-gray-300">
      <div className="mb-[12px]">
        <p>©codeit - 2023</p>
      </div>
      <div className="mb-[68px] flex gap-[20px] text-gray-300">
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className="mb-[90px] flex gap-[20px]">
        <Image src="/icons/email.png" alt="" width={18} height={18} />
        <Image src="/icons/facebook.png" alt="" width={18} height={18} />
        <Image src="/icons/instagram.png" alt="" width={18} height={18} />
      </div>
    </div>
  );
}
