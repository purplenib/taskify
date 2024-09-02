/**
 * middleware 사용목적으로 만들었지만 현재는 사용하고 있지 않음
 * 추후에 사용할 여지가 있으므로 그냥 놔둡니다. (김강우 올림)
 */

// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from 'path-to-regexp';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  const dashboardidMatch = match('/dashboard/:dashboardid(\\d+){/:path}?');
  const hasDashboardId = dashboardidMatch(pathname);

  if (hasDashboardId !== false) {
    const { params } = hasDashboardId;
    const { dashboardid } = params;
    requestHeaders.set('x-dashboardid', dashboardid as string);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ['/dashboard/:dashboardid/:path*'],
};
