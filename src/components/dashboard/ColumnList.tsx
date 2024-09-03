'use client';

import useColumns from '@lib/hooks/useColumns';
import Column from './Column';

export default function ColumnList() {
  const { columnList } = useColumns();

  if (columnList === null) {
    return;
  }

  return (
    <div className="no-scrollbar flex min-h-[100vh] flex-col md:mx-0 md:max-w-full xl:max-w-[1062px] xl:flex-row xl:overflow-scroll">
      {columnList?.length > 0 &&
        columnList.map(column => <Column key={column.id} column={column} />)}
    </div>
  );
}
