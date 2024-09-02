import type { InvitationsResponseDto } from '@core/dtos/invitationsDto';
import { getFromApi } from './apiService';

export interface GetInvitationsParams {
  size?: number;
  cursorId?: number;
  title?: string;
}

const getInvitations = async (
  params: GetInvitationsParams
): Promise<InvitationsResponseDto> => {
  return getFromApi<InvitationsResponseDto>('invitations', {
    ...params,
  });
};

export default getInvitations;
