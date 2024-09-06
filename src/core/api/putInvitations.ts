import instance from '@lib/api/instance';

const putInvitations = async (
  invitationId: number,
  inviteAccepted: boolean
) => {
  const endpoint = `invitations/${invitationId}`;

  const requestBody = {
    inviteAccepted,
  };

  try {
    const response = await instance.put(endpoint, requestBody);
    console.log('putInvitations succeed:', response.data);
    return response.data;
  } catch (error) {
    console.error('putInvitations failed:', error);
    throw error;
  }
};

export default putInvitations;
