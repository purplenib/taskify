import type { InvitationsResponseDto } from '@core/dtos/InvitationsDto';
import { apiCall } from './apiCall';

export interface GetInvitationsParams {
  size?: number;
  cursorId?: number;
  title?: string;
}

const getInvitations = async (
  params: GetInvitationsParams
): Promise<InvitationsResponseDto> => {
  return apiCall<InvitationsResponseDto>('GET', 'invitations', undefined, {
    ...params,
  });
};

export default getInvitations;
