import { useCallback, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import instance from '@core/api/instance';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function useApi<T>(url: string, method: Method) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const callApi = useCallback(
    async <R,>(body: R, config?: AxiosRequestConfig) => {
      setIsLoading(true);
      let res;
      try {
        res = await instance(url, {
          method,
          data: body,
          ...config,
        });
      } catch (err) {
        setError(err);
      } finally {
        setData(res?.data);
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return { data, isLoading, error, callApi };
}
