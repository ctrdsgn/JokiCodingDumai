import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname === '/login';
  const isAuthApi = nextUrl.pathname.startsWith('/api/auth');

  // Allow public access to these routes
  if (isAuthApi || nextUrl.pathname === '/' || !isAdminRoute) {
    return NextResponse.next();
  }

  // Redirect to login if trying to access admin without authentication
  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', nextUrl);
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to admin if already logged in and trying to access login page
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', nextUrl));
  }

  return NextResponse.next();
});

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
