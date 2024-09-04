import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardDto';
import instance from '@lib/api/instance';
import COLORS from '@lib/constants/themeConst';

type Body = {
  title: string;
  color: keyof typeof COLORS;
};

export default async function postCreateDashboard(body: Body) {
  return instance.post<DashboardApplicationServiceResponseDto>(
    '/dashboards',
    body
  );
}
