import axios from 'axios';
import { apiCall } from './apiCall';

// 초대 수락 함수
export const acceptInvitations = async (
  teamId: string,
  invitationId: number
) => {
  const url = `/${teamId}/invitations/${invitationId}`;

  const requestBody = {
    inviteAccepted: true,
  };

  try {
    const response = await axios.put(url, requestBody);
    console.log('초대 수락 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('초대 수락 실패:', error.response?.data || error.message);
    throw error;
  }
};
