import { useEffect, useState } from 'react';

import { getDashboardDetail } from '@core/api/dashboardApi';

export default function useDashboardDetails(dashboardId: number) {
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
  }, [dashboardId]);

  return {
    dashboardName,
    setDashboardName,
    dashboardColor,
    setDashboardColor,
    refetch: fetchDashboardDetails,
  };
}