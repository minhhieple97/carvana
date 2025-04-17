import { NextResponse, type NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';

import { COOKIE_SESSION_KEY, SOURCE_ID_KEY } from '@/config/constants';

import { routes } from './config';

const ADMIN_ROUTE_PREFIX = '/admin';

const PRIVATE_ROUTES = ['/settings'];
const AUTH_ROUTES = ['/signin'];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(COOKIE_SESSION_KEY)?.value;

  const isAdminRoute = pathname.startsWith(ADMIN_ROUTE_PREFIX);
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL(routes.admin.dashboard, request.url));
  }

  if ((isAdminRoute || isPrivateRoute) && !sessionToken) {
    return NextResponse.redirect(new URL(routes.signIn, request.url));
  }

  const response = NextResponse.next();
  const sourceId = request.cookies.get(SOURCE_ID_KEY)?.value;

  if (!sourceId) {
    response.cookies.set(SOURCE_ID_KEY, uuid(), {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
    });
  }

  return response;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
