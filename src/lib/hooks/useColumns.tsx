import { getColumns } from '@core/api/dashboardApi';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { ColumnServiceResponseDto } from '@core/dtos/DashboardDto';

export default function useColumns() {
  const [columnList, setColumnList] = useState<
    ColumnServiceResponseDto[] | null
  >(null);
  const { dashboardid } = useParams();

  const LoadColumns = useCallback(async () => {
    const { data } = await getColumns(Number(dashboardid));
    setColumnList(data);
  }, [dashboardid]);

  useEffect(() => {
    if (Number.isNaN(Number(dashboardid))) {
      return;
    }
    LoadColumns();
  }, [dashboardid, LoadColumns]);

  return { columnList };
}
