import {
  DashboardApplicationServiceResponseDto,
  DashboardsResponseDto,
} from '@core/dtos/DashboardsDto';
import { MembersResponseDto } from '@core/dtos/MembersDto';

export const initialMembers: MembersResponseDto = {
  members: [],
  totalCount: 0,
};

export const initialDetail: Partial<DashboardApplicationServiceResponseDto> = {
  id: undefined,
  title: undefined,
  color: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  createdByMe: undefined,
  userId: undefined,
};

export const initialDashboard: Partial<DashboardsResponseDto> = {
  cursorId: undefined,
  totalCount: undefined,
  dashboards: [],
};
