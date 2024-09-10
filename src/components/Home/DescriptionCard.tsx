import Image from 'next/image';

interface DescriptionCardProps {
  title: string;
  des: string;
  image: string;
}

export default function DescriptonCard({
  title,
  des,
  image,
}: DescriptionCardProps) {
  return (
    <div className="mb-[45px] flex h-[349px] w-[343px] flex-col items-center justify-between rounded-lg bg-black-500">
      <div className="m-[auto]">
        <Image src={image} alt="" width={296} height={248} priority />
      </div>
      <div className="flex h-[113px] w-full flex-col items-start rounded-b-lg rounded-t-none bg-black-700 p-[27px_32px_28px]">
        <h3 className="text-white font-2lg-18px-bold">{title}</h3>
        <p className="mt-[16px] text-white font-lg-16px-medium">{des}</p>
      </div>
    </div>
  );
}
