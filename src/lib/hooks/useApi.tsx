import { AxiosHeaders } from 'axios';
import { useCallback, useState } from 'react';
import instance from '../api/instance';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function useApi<T>(url: string, method: Method) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const callApi = useCallback(
    async <R,>(body: R, headers?: AxiosHeaders) => {
      setIsLoading(true);
      try {
        const res = await instance(url, {
          method,
          data: body,
          headers,
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return { data, isLoading, error, callApi };
}
