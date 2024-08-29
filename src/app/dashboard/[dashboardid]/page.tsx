'use client';

import AddColumnButton from '@/src/components/dashboard/AddColumnButton';
import ColumnList from '@/src/components/dashboard/ColumnList';

export default function DashBoardPage() {
  return (
    <div className="flex flex-col xl:flex-row">
      <ColumnList />
      <AddColumnButton />
    </div>
  );
}
