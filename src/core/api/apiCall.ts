import axios from 'axios';

export const BASE_URL = 'https://sp-taskify-api.vercel.app/8-3';

// test용 엑세스 토큰
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU1NCwidGVhbUlkIjoiOC0zIiwiaWF0IjoxNzI1MDI2MzEyLCJpc3MiOiJzcC10YXNraWZ5In0.YRXMb2Sj-FYeE74Q3_8R1DKUlEpLZ4AfreRly95iFug';

// test용 엑세스 토큰2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU1NSwidGVhbUlkIjoiOC0zIiwiaWF0IjoxNzI1MDI4NjE4LCJpc3MiOiJzcC10YXNraWZ5In0.9e_o9phyoX7lk7xtDa4qFUmJTN6yCmUdtQ9sa9JKr2Y

export const apiCall = async <ResponseType, RequestBodyType = undefined>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: RequestBodyType,
  params?: Record<string, string | number | boolean>
): Promise<ResponseType> => {
  const url = `${BASE_URL}/${endpoint}`;

  const config = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    params,
  };

  try {
    const response = await axios({
      method,
      url,
      data,
      ...config,
    });

    if (!response.data) {
      throw new Error('response failed');
    }

    return response.data;
  } catch (error) {
    console.error('apiCall failed:', error);
    throw error;
  }
};
