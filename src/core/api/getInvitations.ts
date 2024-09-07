import instance from '@lib/api/instance';

import type { InvitationsResponseDto } from '@core/dtos/InvitationsDto';

export interface GetInvitationsParams {
  size?: number;
  cursorId?: number;
  title?: string;
}

const getInvitations = async (
  params: GetInvitationsParams = {}
): Promise<InvitationsResponseDto> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  const response = await instance.get(`/invitations?${queryString}`);

  // eslint-disable-next-line no-console
  console.log(response.data);

  return response.data;
};

export default getInvitations;
