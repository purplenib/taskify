import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/8-3',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDU0NiwidGVhbUlkIjoiOC0zIiwiaWF0IjoxNzI0OTg1MjYxLCJpc3MiOiJzcC10YXNraWZ5In0.hZqXUgcSzrT0_0g8cmu6G5cYGYsWiV-6zK2TRju1ibE';

  // eslint-disable-next-line no-param-reassign
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
