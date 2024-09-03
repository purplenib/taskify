export interface AssigneeDto {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface CardServiceResponseDto {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date | null;
  assignee: AssigneeDto | null;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCardsResponseDto {
  cursorId: number;
  totalCount: number;
  cards: CardServiceResponseDto[];
}

export interface CreateCardRequestDto {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: Date;
  tags?: string[];
  imageUrl?: string;
}

export interface FindCardsRequestDto {
  size?: number;
  cursorId?: number;
  columnId: number;
}

export interface UpdateCardRequestDto {
  columnId?: number;
  assigneeUserId?: number | null;
  title?: string;
  description?: string;
  dueDate?: Date | null;
  tags?: string[];
  imageUrl?: string | null;
}

export interface ColumnServiceResponseDto {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateColumnRequestDto {
  title: string;
  dashboardId: number;
}

// get columns response DTO
export interface GetColumnsResponseDto {
  result: 'SUCCESS';
  data: ColumnServiceResponseDto[] | null;
}

export interface FindColumnsRequestDto {
  dashboardId: number;
}

export interface UpdateColumnRequestDto {
  title: string;
}

export interface DashboardApplicationServiceResponseDto {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
}
// Get dashboard response
export interface GetDashboardsResponseDto {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardApplicationServiceResponseDto;
}

export interface CreateDashboardRequestDto {
  title: string;
  color: string;
}

export type NavigationMethod = 'infiniteScroll' | 'pagination';

export interface FindDashboardsRequestDto {
  navigationMethod: NavigationMethod;
  cursorId?: number;
  page?: number;
  size?: number;
}

export interface UpdateDashboardRequestDto {
  title?: string;
  color?: string;
}
