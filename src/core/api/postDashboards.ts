import { DashboardApplicationServiceResponseDto } from '@core/dtos/DashboardsDto';
import COLORS from '@lib/constants/themeConst';

import instance from './instance';

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
