import instance from './instance';

async function putMyProfile<T>(body: T) {
  const { data } = await instance.put('/users/me', body);
  return data;
}

export default putMyProfile;
