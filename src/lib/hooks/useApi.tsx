'use client';

import { useEffect, useState } from 'react';

function useApi<T, U>(
  apiCall: (params: U, data?: any) => Promise<T>,
  requestParams: U,
  initialValue: T,
  requestData?: any // POST 요청 시 사용
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const paramsString = JSON.stringify(requestParams);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall(requestParams, requestData);
        setData(response);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setFetchError('데이터를 가져오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiCall, paramsString, requestData]);

  return { data, loading, error: fetchError };
}

export default useApi;
