export const INIT_MYDASHBOARDS_CONTEXT = {
  myDashboards: [],
  localDashboards: [],
  loading: true,
  error: null,
  addDashboard: () => {},
  fetchDashboards: async () => {},
};

// 초대받은 대시보드 목록
export const INIT_INVITATIONS_REQUEST = {
  size: 10,
};

export const INIT_INVITATIONS_RESPONSE = {
  cursorId: 0,
  invitations: [
    {
      id: 0,
      inviter: {
        nickname: '',
        email: '',
        id: 0,
      },
      teamId: '8-3',
      dashboard: {
        title: '',
        id: 0,
      },
      invitee: {
        nickname: '',
        email: '',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

// 나의 대시보드 목록
export const INIT_DASHBOARDS_REQUEST = {
  navigationMethod: 'pagination',
  page: 1,
  size: 10,
};

export const INIT_DASHBOARDS_RESPONSE = {
  dashboards: [],
  totalCount: 0,
  cursorId: null,
};
