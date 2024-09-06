import { UserServiceResponseDto } from '@core/dtos/AuthDto';

import instance from './instance';

async function putMyProfile<T>(body: T) {
  const { data } = await instance.put<UserServiceResponseDto>(
    '/users/me',
    body
  );
  return data;
}

export default putMyProfile;
