import { apiCall } from './apiCall';

const putInvitations = async (
  invitationId: number,
  inviteAccepted: boolean
) => {
  const endpoint = `invitations/${invitationId}`;

  const requestBody = {
    inviteAccepted: inviteAccepted,
  };

  try {
    const response = await apiCall('PUT', endpoint, requestBody);
    console.log('putInvitations succeed:', response);
    return response;
  } catch (error) {
    console.error('putInvitations failed:', error);
    throw error;
  }
};

export default putInvitations;
