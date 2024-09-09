import { useEffect, useState } from 'react';

import { getDashboardDetail } from '@core/api/columnApis';

export default function useDashboardDetail(dashboardId: number) {
  const [dashboardName, setDashboardName] = useState<string>('');
  const [dashboardColor, setDashboardColor] = useState<string>('');

  const fetchDashboardDetails = async () => {
    const details = await getDashboardDetail(dashboardId);
    if (details) {
      setDashboardName(details.title);
      setDashboardColor(details.color);
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId]);

  return {
    dashboardName,
    setDashboardName,
    dashboardColor,
    setDashboardColor,
    refetch: fetchDashboardDetails,
  };
}
