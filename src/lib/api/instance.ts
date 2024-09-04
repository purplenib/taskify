import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/8-3',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');

  // eslint-disable-next-line no-param-reassign
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;