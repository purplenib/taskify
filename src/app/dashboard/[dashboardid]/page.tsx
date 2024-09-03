import AddColumnButton from '@components/dashboard/AddColumnButton';
import ColumnList from '@components/dashboard/ColumnList';

export default function DashBoardPage() {
  return (
    <div className="ml-[67px] mt-[60px] flex flex-col pb-[49px] md:ml-[160px] md:mt-[70px] xl:ml-[300px] xl:flex-row">
      <ColumnList />
      <AddColumnButton />
    </div>
  );
}
