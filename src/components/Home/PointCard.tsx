import Image from 'next/image';

interface PointCardProps {
  point: string;
  title: string;
  image: string;
  alt: string;
}
export default function PointCard({
  point,
  title,
  image,
  alt,
}: PointCardProps) {
  return (
    <div className="mb-[59px] flex w-[343px] flex-col items-center rounded-lg bg-[rgba(23,23,23,1)]">
      <div className="flex flex-col items-center">
        <h2 className="mt-[60px] text-gray-300 font-2lg-18px-medium">
          Point{point}
        </h2>
        <p className="mt-[61px] text-white font-4xl-36px-bold">{title}</p>
      </div>
      <div className="mt-[194px] w-full">
        <Image src={image} alt={alt} width={260} height={248} />
      </div>
    </div>
  );
}
