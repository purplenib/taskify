import instance from './instance';

const getDashboards = async () => {
  const response = await instance.get('/dashboards');
  return response.data;
};

export default getDashboards;
