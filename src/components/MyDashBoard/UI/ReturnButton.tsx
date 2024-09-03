import Image from 'next/image';
import backIc from '@icons/back.png';

interface ReturnButtonProps {
  buttonText: string;
  onClick?: () => void;
}

function ReturnButton({ buttonText, onClick }: ReturnButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(); // onClick이 있을 경우 호출
    } else {
      window.history.back();
    }
  };

  return (
    <button
      type="button"
      className="mx-auto -mt-16 flex content-center justify-center gap-3 rounded-3xl bg-violet px-6 py-3 text-gray-100 font-md-14px-regular"
      onClick={handleClick}
    >
      {buttonText}
      <Image
        src={backIc}
        alt="돌아가기 아이콘"
        width={24}
        height={24}
        className="my-auto"
      />
    </button>
  );
}

export default ReturnButton;
