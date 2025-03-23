import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('AccessToken')?.value;

  const PublicPage = ['/', '/pre', '/register', '/account'];
  const isPublicPage = PublicPage.some((page) => pathname.includes(page));

  if (token && pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/welcome', req.url));
  }

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
