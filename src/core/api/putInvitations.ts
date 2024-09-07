import instance from './instance';

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
    // eslint-disable-next-line no-console
    console.log('putInvitations succeed:', response.data);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('putInvitations failed:', error);
    throw error;
  }
};

export default putInvitations;
