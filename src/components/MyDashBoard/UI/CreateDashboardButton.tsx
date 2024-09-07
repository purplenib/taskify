import Image from 'next/image';
import addPurple from '@icons/add_purple.png';

const CreateDashboardButton = ({ onClick }) => (
  <button
    button
    type="button"
    onClick={onClick}
    className="flex justify-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-[22px] font-lg-16px-semibold"
  >
    <p>새로운 대시보드</p>
    <div className="rounded-[4px] bg-violet-white p-1">
      <Image src={addPurple} alt="플러스 아이콘" width={16} height={16} />
    </div>
  </button>
);

export default CreateDashboardButton;
