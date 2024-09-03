export default function InvitedDashBoard() {
  return (
    <ul className="flex flex-col gap-[20px]">
      <li className="flex w-full justify-between border-b border-gray-100 pb-[20px] text-center text-black-600">
        <p className="w-64">대시보드 이름</p>
        <p className="w-36">대시보드 초대자</p>
        <p className="mr-6 w-64">수락 및 거절 버튼</p>
      </li>
    </ul>
  );
}
