import { NextResponse, type NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';
import { SOURCE_ID_KEY } from '@/config/constants';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
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
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
