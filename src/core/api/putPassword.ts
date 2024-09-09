import { ChangePasswordRequestDto } from '@core/dtos/AuthDto';
import { ErrorResponsePayload } from '@core/dtos/CommonDto';

import instance from './instance';

export default async function putPassword(body: ChangePasswordRequestDto) {
  try {
    const res = await instance.put<never, ErrorResponsePayload>(
      '/auth/password',
      body
    );
    return res;
  } catch (err) {
    return err;
  }
}
