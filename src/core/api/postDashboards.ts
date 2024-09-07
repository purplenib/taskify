import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';
import instance from '@lib/api/instance';
import COLORS from '@lib/constants/themeConst';

type Body = {
  title: string;
  color: keyof typeof COLORS;
};

async function postCreateDashboards(body: Body) {
  return instance.post<DashboardApplicationServiceResponseDto>(
    '/dashboards',
    body
  );
}

export default postCreateDashboards;
