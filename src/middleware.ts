import { Role } from '@prisma/client';
import { NextResponse, type NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';

import { SOURCE_ID_KEY } from '@/config/constants';

import { routes } from './config/routes';
import { getUserFromSession } from './features/auth';
const adminRoutes = ['/admin'];
const privateRoutes = ['/private'];
export const middleware = async (request: NextRequest) => {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  const sourceId = request.cookies.get(SOURCE_ID_KEY)?.value;
  if (!sourceId) {
    const newSourceId = uuid();
    response.cookies.set(SOURCE_ID_KEY, newSourceId, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
    });
  }

  return response;
};

const middlewareAuth = async (request: NextRequest) => {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL(routes.signIn, request.url));
    }
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL(routes.signIn, request.url));
    }
    if (user.role !== Role.admin) {
      return NextResponse.redirect(new URL(routes.home, request.url));
    }
  }
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
