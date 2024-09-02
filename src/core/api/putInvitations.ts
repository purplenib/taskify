import axios from 'axios';
import { apiCall } from './apiCall';

// 초대 수락 함수
const acceptInvitations = async (teamId: string, invitationId: number) => {
  const url = `/${teamId}/invitations/${invitationId}`;

  const requestBody = {
    inviteAccepted: true,
  };

  try {
    const response = await axios.put(url, requestBody);
    console.log('초대 수락 성공:', response.data);
    return response.data; // 필요한 경우 이 데이터를 반환
  } catch (error) {
    console.error('초대 수락 실패:', error.response?.data || error.message);
    throw error; // 오류를 호출자에게 전달
  }
};

// 사용 예시
const handleAcceptInvitation = async () => {
  const teamId = 'your_team_id'; // 실제 teamId로 교체
  const invitationId = 123; // 실제 invitationId로 교체

  try {
    const result = await acceptInvitation(teamId, invitationId);
    // 초대 수락 후 추가 처리 (예: UI 업데이트 등)
  } catch (error) {
    // 오류 처리
  }
};
