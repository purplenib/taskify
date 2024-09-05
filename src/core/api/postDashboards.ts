import { apiCall } from './apiCall';

const postDashboard = async (title, color) => {
  const endpoint = `dashboards`;

  const requestBody = {
    title: title,
    color: color,
  };

  try {
    const response = await apiCall('POST', endpoint, requestBody);
    console.log('postDashboard succeed:', response);
    return response;
  } catch (error) {
    console.error('postDashboard failed:', error);
    throw error;
  }
};

export default postDashboard;
