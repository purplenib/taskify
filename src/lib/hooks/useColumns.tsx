import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import {
  deleteColumn,
  getColumns,
  getDashboardDetail,
  postColumn,
  putColumn,
} from '@core/api/dashboardApi';

import type { ColumnServiceResponseDto } from '@core/dtos/ColumnsDto';

export default function useColumns() {
  const [columnList, setColumnList] = useState<
    ColumnServiceResponseDto[] | null
  >(null);
  const [dashboardColor, setDashboardColor] = useState('#000000');
  const [targetColumnId, setTargetColumnId] = useState(0);
  const { dashboardid } = useParams();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onTouched' });
  const LoadColumns = useCallback(async () => {
    const { data } = await getColumns(Number(dashboardid));
    setColumnList(data);

    // 컬럼 제목 옆에 표시되는 대시보드 색상 받아오기
    const { color } = await getDashboardDetail(Number(dashboardid));
    if (!color) {
      return;
    }
    setDashboardColor(color);
  }, [dashboardid]);

  // 컬럼 갯수 10개 제한 (백엔드에서 10개 이상 생성안됨)
  const validateColumnCount = () => {
    if (columnList && columnList.length >= 10) {
      setError('title', { message: '컬럼은 최대 10개까지만 생성 가능합니다.' });
      return false;
    }
    return true;
  };
  // 컬럼 생성 로직
  const onSubmitCreateColumnForm = async (title: string) => {
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
  // 컬럼 수정 로직
  const onSubmitEditColumnForm = async (editedTitle: string) => {
    const formData = {
      title: editedTitle,
    };

    const editedColumn = await putColumn({
      columnId: targetColumnId,
      formData,
    });
    const editedColumnIndex = columnList?.findIndex(
      column => column.id === editedColumn?.id
    );
    if (editedColumnIndex !== undefined && editedColumnIndex !== -1) {
      setColumnList(prev => {
        if (prev === null || editedColumn === null) {
          return [];
        }
        const updatedColumnList = [...prev];
        updatedColumnList[editedColumnIndex] = editedColumn;
        return updatedColumnList;
      });
    }
  };
  // 컬럼 삭제 로직
  const onClickDeleteAtEditModal: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const deletedColumnIndex = columnList?.findIndex(
      column => column.id === targetColumnId
    );
    if (columnList === null) {
      return;
    }
    const copyList = JSON.parse(JSON.stringify(columnList));
    const backUpList = JSON.parse(JSON.stringify(columnList));
    copyList.splice(deletedColumnIndex, 1);
    setColumnList(copyList);
    try {
      await deleteColumn(targetColumnId);
    } catch (err) {
      // 로컬에서 삭제했다가 delete요청 실패시 다시 복원
      setColumnList(backUpList);
    }
  };

  // 초기 Columns 랜더링
  useEffect(() => {
    if (Number.isNaN(Number(dashboardid))) {
      return;
    }
    LoadColumns();
  }, [dashboardid, LoadColumns]);

  return {
    columnList,
    dashboardColor,
    onSubmitCreateColumnForm,
    register,
    errors,
    handleSubmit,
    setValue,
    setTargetColumnId,
    onSubmitEditColumnForm,
    onClickDeleteAtEditModal,
  };
}
