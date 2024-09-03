export interface DashboardDto {
  id: number;
  title: string;
  color?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  createdByMe?: boolean;
}

export interface DashboardsResponseDto {
  dashboards: DashboardDto[];
  totalCount: number;
  cursorId: number | null;
}

export interface MyDashboardContextDto {
  joinedDashboards: DashboardDto[];
  loading: boolean;
  error: string | null;
  addDashboard: (newDashboard: DashboardDto) => void;
}