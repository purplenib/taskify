import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { getColumns, getDashboardDetail, postColumn } from '@core/api/dashboardApi';
import type { ColumnServiceResponseDto } from '@core/dtos/DashboardDto';

interface FieldData {
  title: string;
}

export default function useColumns() {
  const [columnList, setColumnList] = useState<ColumnServiceResponseDto[] | null>(null);
  const [dashboardColor, setDashboardColor] = useState('#000000');
  const { dashboardid } = useParams();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldData>({ mode: 'onSubmit' });

  const LoadColumns = useCallback(async () => {
    const { data } = await getColumns(Number(dashboardid));
    setColumnList(data);

    const { color } = await getDashboardDetail(Number(dashboardid));
    setDashboardColor(color);
    // 컬럼 제목 옆에 표시되는 대시보드 색상 받아오기
  }, [dashboardid]);

  // 컬럼 갯수 10개 제한 (백엔드에서 10개 이상 생성안됨)
  const validateColumnCount = () => {
    if (columnList && columnList.length >= 10) {
      setError('title', { message: '컬럼은 최대 10개까지만 생성 가능합니다.' });
      return false;
    }
  };
  // 컬럼 생성 로직
  const onSubmitCreateColumn = async (title: string) => {
    if (!(typeof dashboardid === 'string')) {
      return;
    }

    const validateResult = validateColumnCount();
    if (!validateResult) {
      return;
    }

    const formData = {
      title,
      dashboardId: Number(dashboardid),
    };
    const createdColumn = await postColumn(formData);
    if (!createdColumn) {
      return;
    }

    // 생성한 컬럼은 로컬에서 바로 추가된다 (새로 패치해오는게 나을까)
    setColumnList(prev => {
      if (prev === null) {
        return [createdColumn];
      }
      return [...prev, createdColumn];
    });
  };

  useEffect(() => {
    if (Number.isNaN(Number(dashboardid))) {
      return;
    }
    LoadColumns();
  }, [dashboardid, LoadColumns]);

  return { columnList, dashboardColor, onSubmitCreateColumn, register, errors, handleSubmit };
}
