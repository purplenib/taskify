import axios from 'axios';

export const BASE_URL = 'https://sp-taskify-api.vercel.app/8-3';

// test용 엑세스 토큰
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU1NCwidGVhbUlkIjoiOC0zIiwiaWF0IjoxNzI1MDI2MzEyLCJpc3MiOiJzcC10YXNraWZ5In0.YRXMb2Sj-FYeE74Q3_8R1DKUlEpLZ4AfreRly95iFug';

// test용 엑세스 토큰2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU1NSwidGVhbUlkIjoiOC0zIiwiaWF0IjoxNzI1MDI4NjE4LCJpc3MiOiJzcC10YXNraWZ5In0.9e_o9phyoX7lk7xtDa4qFUmJTN6yCmUdtQ9sa9JKr2Y

// GET, 공통 apiCall 함수
export const getFromApi = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const config = {
      params,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error('apiCall failed:', error);
    throw error;
  }
};
