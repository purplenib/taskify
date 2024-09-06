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
  dashboards: DashboardApplicationServiceResponseDto[];
  totalCount: number;
  cursorId: number | null;
}

export interface MyDashboardContextDto {
  myDashboards: DashboardApplicationServiceResponseDto[];
  localDashboards: DashboardApplicationServiceResponseDto[];
  loading: boolean;
  error: string | null;
  addDashboard: (newDashboard: DashboardApplicationServiceResponseDto) => void;
  fetchDashboards: () => Promise<void>;
}
