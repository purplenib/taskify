import useDevice from '@lib/hooks/useDevice';
import cn from '@lib/utils/cn';

interface InviteHeaderProps {
  className?: string;
}

const InviteHeader = ({ className }: InviteHeaderProps) => {
  const deviceType = useDevice();

  return (
    <div
      className={cn(
        'relative flex flex-col items-start gap-[3px] text-gray-300 md:flex-row md:items-center md:justify-between xl:px-10',
        className
      )}
    >
      <h2 className="md:w-1/3 md:text-left">이름</h2>
      <h2 className="md:w-1/3 md:text-left">초대자</h2>
      {(deviceType === 'tablet' || deviceType === 'desktop') && (
        <h2 className="md:w-1/3 md:text-center">수락 여부</h2>
      )}
    </div>
  );
};

export default InviteHeader;
