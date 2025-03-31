import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get('access_token')?.value;

  const PublicPage = ['/login', '/pre', '/onsite', '/account'];
  const isPublicPage = PublicPage.some((page) => pathname.includes(page));

  if (token && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
