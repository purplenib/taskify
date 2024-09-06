export interface DashboardApplicationServiceResponseDto {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardsResponseDto {
  cursorId: number | null;
  totalCount: number;
  dashboards: DashboardApplicationServiceResponseDto[];
}
